import * as express from 'express';
import * as oauth2 from  '../policies/oauth2';
import {CacheUtils} from '../utils/cacheutils';
import {Library} from '../utils/library';
import {helpers} from '../utils/helpers';
import * as utils from '../utils/emailutils';
import {encrypt, decrypt} from '../utils/encryptutils';
import {User, IUserModel, AddressSchema} from '../models/user';
import {normalize, denormalize, schema} from 'normalizr';
import {handleSearch} from './handlers/search';
import {showUserProtectedData} from './handlers/user';


let apiRouter = express.Router();

/*apiRouter.get('/', (req, res) => {
     res.send('Work with me Authorization API!');
});*/
apiRouter.get('/profile', oauth2.auth, function(req, res){
    //console.log('in profile handler. before rendering...');
     return res.json(req.user);
});


apiRouter.get('/users/:id', oauth2.auth, function(req, res, next){
   var include = ['contact', 'email', 'website', 'mailingAddress.city', 'mailingAddress.state'];
   showUserProtectedData({_id: req.params.id}, include, (err, usr) =>{
        if(err)
        return next(err);
        return res.json(usr);
   });
});

apiRouter.get('/users', oauth2.auth, function(req, res, next){
    var query = req.query.query;
    var near = req.query.near;
    var user = req.user;
    var projection = Object.assign({}, {accounts: 0, location: 0
                                        ,email: 0, contact: 0, website: 0
                                        , mailingAddress:{address1: 0, address2: 0}});
    var search =  handleSearch(query, near, 
                              { $project: {...projection}}, 
         function(err, data){
            if(err != null)
            return next(err);
            let _u = data.users.filter(user => {
                //hack to ensure search results include only active employees
                //issue with filtering in the search handler
                return user['isactiveemployee'] == true;
            }); 
            return res.json({
                result: {...data.result, count: _u.length},
                users: _u
            });
    });
    process.nextTick(function(){
        search.start();
    })
    return;   
});

apiRouter.get('/user', oauth2.auth, function(req, res, next){
    var include = req.query.include;
    var user = req.user;
    showUserProtectedData({email: user.email}, include, (err, usr) =>{
         if(err)
           return next(err);
         return res.json(usr);
    });
});

apiRouter.post('/user', oauth2.auth, (req, res, done) => {
    //console.log(req.body);
    var cb = (email, body) => {
        return User.findOneAndUpdate({email: email}, body, {runValidators: true}, function(err, user){
            if(err || !user){
                console.log(err);
            return done(err);
            }
            res.send(user);
        });

    };

    if(req.body && req.body.mailingAddress){
      var ma = req.body.mailingAddress;
      var addr = ma.address1 + ' ' + (ma.address2 ? ma.address2 : '') + ' ' + ma.zipcode;
      helpers.geoCode(addr, function(err, res){
           if(err)
              return done(err);

           if(res != null && res[0] && res[0].zipcode == ma.zipcode){
              req.body = Object.assign({}, req.body, 
                         {location: {coordinates: [res[0].longitude, res[0].latitude]}});
           }
           else
             return done(new Error('Address or Zip Code is not valid'));
    
           return cb(req.user.email, req.body);
      });       
    }
    else
        return cb(req.user.email, req.body);   
    
});

apiRouter.get('/typeaheads/:key', oauth2.auth, (req, res, next) =>{
    var filter = req.query.filter;
    var key = translateToDBField(req.params.key);
    
    if(!key)
       return next(new Error('invalid input parameters'));

    let data = CacheUtils.get(key);

    if(data == null){
        User.distinct(key, function(err, values){
          if(err)
            return next(err);
          //console.log(values);
          if(values.length > 0)
            CacheUtils.put(key, values);
          res.send({result: values});
        });
    }
    else
    res.send({result: data});
});


apiRouter.post('/subscription', oauth2.auth, (req, res, done) => {
      var user = req.user;
      if(req.body && req.body['usercontext']){
         var subscription = req.body;
         User.findOne({email: user.email}, function(err, founduser){
                if(err)
                   return done(err);
                
                founduser.subscriptions.forEach(s => {
                    if(s.usercontext == subscription.usercontext)
                           s.isexpired = true;
                });

                founduser.subscriptions.push(subscription);
                founduser.save((err, saveduser) => {
                    if(err)
                       return done(err);
                    utils.getEmailTemplate(Library.EMAIL_PAYMENT_RECEIPT)
                         .then(etemplate => {
                            var email = utils.transformEmailTemplate(etemplate, {
                                to: user.email 
                              , firstname: user.firstname
                              , lastname: user.lastname
                              , orderid: (subscription.orderid ? subscription.orderid : '-')
                              , orderamount: helpers.toCurrency(subscription.orderamount)
                              , paymentdate: new Date(subscription.paymentdate).toDisplay()
                              , expirationdate: new Date(subscription.expirationdate).toDisplay()
                            });

                        utils.sendEmail(email, (err, info) => {
                                    return;
                            });//send email
                    });
                    return res.json(founduser);                    
                });
         });
      }
      else
        return done(new Error('Invalid Request Body.')); 
});

apiRouter.post('/changepassword', oauth2.auth, (req, res, done) =>{
    var _user = req.user,
        _payload = req.body;
    if(_payload && _payload.current && _payload.password){
        User.findOne({email: _user.email}, function(err, user){
            if(err)
                done(err);
            User.updatePassword(user, decrypt(_payload.current), decrypt(_payload.password), 
                (err, response) =>{
                if(err || !response)
                  return done(err || new Error('Password failed to update.'));
                return res.send('Password changed!');
            });
        });
    }
    else
      return done(new Error('Request body missing required parameters'));
});

apiRouter.use(function(err, req, res, next){
         if(err){
          delete err.stack;
          //console.log('am i getting in this error handler');
          //console.log(err.message);
          res.status(err.statusCode || 500).json(err.message);
         }
});



export = apiRouter;


function translateToDBField(key: string){
     switch(key.toLowerCase()){
         case 'workareas':
             return 'workAreas';
         case 'certifications':
         case 'awards':
         case 'keywords':
         case 'skills':
             return key.toLowerCase();
         default:
             return '';
     }
}