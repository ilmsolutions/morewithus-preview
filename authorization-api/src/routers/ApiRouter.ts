import * as express from 'express';
import * as async from 'async';
import {isEmpty, unique} from '../utils/cutils';
import {User, IUserModel} from '../models/user';
import {getConfigs} from './handlers/config';
import {CacheUtils} from '../utils/cacheutils';
import {helpers} from '../utils/helpers';
import {handleSearch} from './handlers/search';
import * as utils from '../utils/emailutils';
import {Library} from '../utils/library';
import {encrypt, decrypt} from '../utils/encryptutils';
import * as nconf from 'nconf';

let apiRouter = express.Router();

apiRouter.post('/signup', (req, res, done) => {
    const user = {
        firstname: req.body['firstname'],
        lastname: req.body['lastname'],
        email: req.body['email'],
        accounts:[{
            kind: 'local',
            username: req.body['email'],
            password: User.generateHash(req.body['password'])
        }]
    };
   //console.log(req.session);
   var goto = {
       start: function(){
           if(goto.isUserComplete()){
              goto.onExistingUserCheck(goto.onInsertUser);               
           }
           else
            goto.finish(new Error(Library.MSG_MISSING_FIELDS), false);

           return;
       },
       isUserComplete: function(){
          //console.log('isUserComplete ' +   !(isEmpty(req.body['checktermsandconditions'])));
          return !(
                   isEmpty(user.firstname) || isEmpty(user.lastname) || 
                   isEmpty(user.email) || isEmpty(req.body['password']) || 
                   isEmpty(req.body['checktermsandconditions'])
                   );
       },
       onExistingUserCheck: function(cb){
            User.findOne({email: user.email, 'accounts.kind': 'local', 
            'accounts.username': user.email}, function(err, existinguser){
                  if(err) goto.finish(err, false);
                  if(existinguser != null)
                     goto.finish(new Error(Library.MSG_USER_EXISTS), false);
                  else 
                     cb();
            });
       },
       onInsertUser: function(cb){
          User.findOneAndUpdate({email: user.email}, user, 
                                {new: true, upsert: true, setDefaultsOnInsert:true}, function(err, newUser){
                
                if(err) goto.finish(err, false);
                else {
                    //send email and goto finish
                    sendEmail(Library.EMAIL_VERIFY, user, {
                        returnTo: req.session.returnTo 
                    }, goto.finish);
                }
                
          });
       },
       finish:function(err:Error, result){
            if(err != null){
                req.flash('error', err.message);
                res.redirect(req.url);
            }
            else{
                req.flash('redirect', Library.MSG_SUCCESS_SIGNUP);                
                req.flash('info', result);
                req.flash('warn', Library.MSG_EMAIL_IN_SPAM);
                res.redirect('/verify');
            }
       }
   };

   process.nextTick(function(){
        goto.start();
   }); 
   return;   
});

apiRouter.post('/verify', (req, res, done) => {
  const {email, token} = req.body;
  //verify if email matches with the token provided
  //if match update the isverified field  
  // and send an email notification indicating email verified
  //else if it fails then provide a button to resend the email notification
  var goto = {
      start: () =>{
          
          if(!email || !token)
            return goto.finish(new Error(Library.MSG_MISSING_PARAMETERS), false);

          var dtoken = JSON.parse(decrypt(token));
          if(!dtoken)
            return goto.finish(new Error(Library.MSG_INVALID_TOKEN), false);


          if(new Date(dtoken.expiresin) < new Date() || dtoken.email != email)
            return goto.finish(new Error(Library.MSG_INVALID_TOKEN), false);
          //console.log('token.returnTo: ' + dtoken.returnTo);
          req.session.returnTo = dtoken.returnTo;

          //Update User field isverified to true 
          User.findOneAndUpdate({email: email, 'accounts.kind': 'local'}, 
                                  {$set: {'accounts.$.isverified': true}},
                                 (err, user) => {
                if(err || !user)
                   goto.finish(new Error(Library.MSG_FAILED_VERIFY_EMAIL), false);
                //send email
                utils.getEmailTemplate(Library.EMAIL_VERIFIED).then(template => {
                    var email = utils.transformEmailTemplate(template, {
                            to: user.email
                            , firstname: user.firstname
                            , lastname: user.lastname                           
                    });
                    utils.sendEmail(email, (err, info) => {
                        if(err)
                           goto.finish(err, Library.MSG_FAILED_EMAIL);
                        goto.finish(null, Library.MSG_CONFIRM_VERIFY_EMAIL);
                    });
                });
        });//findoneandupdate
      },
      finish: (err:Error, result) => {
        //console.log(err);
        //console.log('finish.returnTo: ' + req.session.returnTo);
        if(err != null){
            req.flash('error', err.message);
            res.redirect('/verify');
         }
        else{
            req.flash('info', result);
            res.redirect(req.session.returnTo);
    }
      }
  };

  
  process.nextTick(function(){
    goto.start();
  }); 
 return;
});

apiRouter.post('/resendverification', (req, res, done) => {
    const {email} = req.body;
    //verify if email matches with the token provided
    //if match update the isverified field  
    // and send an email notification indicating email verified
    //else if it fails then provide a button to resend the email notification
    var goto = {
        start: () =>{
            
            if(!email)
              return goto.finish(new Error(Library.MSG_MISSING_PARAMETERS), false);
            
            //console.log(req.session.returnTo);

            User.findOne({email: email}, (err, user) => {
                if(err || !user)
                  goto.finish(new Error(Library.MSG_USER_NOT_EXISTS), false); 
                sendEmail(Library.EMAIL_VERIFY, user, {
                    returnTo: req.session.returnTo
                }, goto.finish);               
            });
        },
        finish: (err:Error, result) => {
          if(err != null){
              req.flash('error', err.message);
              res.redirect('/verify');
           }
          else{
              req.flash('info', result);
              req.flash('warn', Library.MSG_EMAIL_IN_SPAM);
              res.redirect('/verify');
            }
        }
    };
  
    
    process.nextTick(function(){
      goto.start();
    }); 
   return;
  });
  
apiRouter.post('/forgot', (req,res, done) =>{
    let {email, token, npassword} = req.body;
    //console.log('in forgot')
    //console.log(email);
    //console.log(token);
    var path = '';
    var goto = {
        start: () => {
            if(email &&  token && npassword){
               goto.reset(email, token, npassword);
               path = 'reset';
            }
            else if(email){
                goto.sendreset(email);
                path = 'sendreset';
            }
            else
            return goto.finish(new Error(Library.MSG_MISSING_PARAMETERS), false);
        }
        ,sendreset: (email) => {

            User.findOne({email: email}, (err, user) => {
                if(err || !user)
                  goto.finish(new Error(Library.MSG_USER_NOT_EXISTS), false);     
                sendEmail(Library.EMAIL_PASSWORD_RESET, user, {
                    returnTo: req.session.returnTo 
                }, goto.finish);
            });

        }
        ,reset:(email, token, npwd) =>{
            var dtoken = JSON.parse(decrypt(token));
            if(!dtoken)
              return goto.finish(new Error(Library.MSG_INVALID_TOKEN), false);
  
  
            if(new Date(dtoken.expiresin) < new Date() || dtoken.email != email)
              return goto.finish(new Error(Library.MSG_INVALID_TOKEN), false);
  
            req.session.returnTo = dtoken.returnTo;

            User.resetPassword(email, npassword, (err, status) =>{
                if(err || !status)
                return goto.finish(err || new Error('Password failed to update.'), false);
              return goto.finish(null, Library.MSG_PASSWORD_RESET_SUCCESS);
            });

        }
        ,finish: (err:Error, result) => {
            //console.log('in finish');
            if(err != null){
                req.flash('error', err.message);
                res.redirect('/forgot');
             }
            else{
                //console.log(result);
                req.flash('info', result);
                if(path == 'sendreset')
                   req.flash('warn', Library.MSG_EMAIL_IN_SPAM);
                res.redirect(path == 'sendreset' ? '/forgot?success=true' : req.session.returnTo);
              }
        }
    }

    process.nextTick(function(){
        goto.start();
    });
    return;
});

apiRouter.get('/typeaheads/:keys', (req, res, next) =>{
    var filter = req.query.filter,
        keys = req.params.keys.split('_'),
        queries = [],
        mdata = [];

    for(var i=0; i< keys.length; i++ ){
        let key = translateToDBField(keys[i]);    
        if(!key)
           return next(new Error('invalid input parameters'));
    
        let data = CacheUtils.get(key);
        if(data == null || data.length <= 0){
           var cb = (err, values) => {return err ? next(err) : mdata = mdata.concat.apply([], values);};
           queries.push(function(cb){
               getDistinct(key, function(err, values){
                  return cb(err, values);
               });
           });
        }
        else
           mdata = mdata.concat(data);
    }
   
    if(queries.length > 0){
        async.parallel(queries, function(err, results){
             //console.log(results);
              if(err)
                return next(err);
              mdata = mdata.concat.apply([], results);
              res.send({result: unique(mdata)});
         });
    }
    else 
      res.send({result: unique(mdata)});
});


apiRouter.get('/users', function(req, res, next){
    //console.log('am getting in here');
    //console.log(req.query);
    var query = req.query.query;
    var near = req.query.near;    
    var search =  handleSearch(query, near, 
        { $project: {accounts: 0, email: 0, 
                     mailingAddress: {address1 : 0, address2: 0}, 
                     website: 0, location: 0, contact: 0}}, 
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


apiRouter.post('/notifications/:key', function(req, res, done){
   var body = req.body;
   const path = new RegExp('^,EmailNotifications,', 'i');
   const kval = new RegExp(req.params.key, 'i');
   const admins = nconf.get('accounts').admins;

   getConfigs(path, {value: kval, active: true}).then(configs => {
            configs.forEach(config => {     
                //            console.log('expiring subscription');
                let type = 'Event.' + config.value;
                let emailtemplate = utils.getEmailTemplate(config.value);  
                emailtemplate.then(etemplate => {
                    var email = utils.transformEmailTemplate(etemplate, {
                        to: admins, ...body});
                    utils.sendEmail(email, (err, info) => {
                          return;
                    });//send email
                     
            });//email template promise
        });//config loop
   });

   return res.json('completed!');
});

export = apiRouter;

function getDistinct(key: string, cb){
    User.distinct(key, function(err, values){
          if(err)
            return cb(err);
          if(values.length > 0)
            CacheUtils.put(key, values);
          cb(null, values);
        });   
}

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

function geocodeAsync(near, cb){
   helpers.geoCode(near, function(err, result){
        if(err || result == null || result.length <= 0){
            return cb(err || new Error('invalid address') );
        }
       return cb(null, result);
   });   
}

/* function sendVerificationEmail(user, opts, done){
    //send email and goto finish
    utils.getEmailTemplate('Verify Email').then(template => {
        var token = Object.assign({}, {
                email: user.email
              , expiresin: new Date().addDuration('1d')
        }, opts);
        var email = utils.transformEmailTemplate(template, {
                token: encrypt(JSON.stringify(token))
                , to: user.email
                , firstname: user.firstname
                , lastname: user.lastname                           
        });
        utils.sendEmail(email, (err, info) => {
                if(err)
                done(err, Library.MSG_FAILED_EMAIL);
                done(null, Library.MSG_SENT_VERIFY_EMAIL);
        });
    });

};
 */
function sendEmail(type, user, opts, done){
    //send email and goto finish
    utils.getEmailTemplate(type).then(template => {
        var token = Object.assign({}, {
                email: user.email
              , expiresin: new Date().addDuration('1d')
        }, opts);
        var email = utils.transformEmailTemplate(template, {
                token: encrypt(JSON.stringify(token))
                , to: user.email
                , firstname: user.firstname
                , lastname: user.lastname                           
        });
        utils.sendEmail(email, (err, info) => {
                if(err)
                done(err, Library.MSG_FAILED_EMAIL);         
                var m = '';
                switch(type){
                    case Library.EMAIL_VERIFY:
                       m = Library.MSG_SENT_VERIFY_EMAIL;
                       break;
                    case Library.EMAIL_PASSWORD_RESET:
                       m = Library.MSG_SENT_PASSWORD_RESET_EMAIL;
                       break;
                }       
                done(null, m);
        });
    });

}