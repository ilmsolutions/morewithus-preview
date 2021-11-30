import * as express from 'express';
import {Config, IConfigModel} from '../models/admin/config';
import {User, IUserModel} from '../models/user';
import * as oauth2 from  '../policies/oauth2';
import {handleSearch} from './handlers/search';
import {getConfig} from './handlers/settings';
import {showUserProtectedData} from './handlers/user';

let apiRouter = express.Router();

apiRouter.post('/configuration/:id', oauth2.adminAuth,  (req, res, done) => {

    var id = req.params.id;
    var _config = req.body;
    var patt = new RegExp('^,' + id + ',', 'i');
    var filters = {'path': patt};
    var opts = {new: true, upsert: true, 
                setDefaultsOnInsert:true, 
                returnNewDocument: true};

    if(_config._id)
      filters = Object.assign({}, filters, {'_id': _config._id});
    else {
      //_config.path = ',' + id + ',';
      filters = Object.assign({}, filters, {'label': ''});
    }
    
    Config.findOneAndUpdate(filters, {$set: _config}, opts, (err, config) =>{
      if(err || !config){
        //console.log(err);
        return done(err);
      }
       //console.log(config);
       res.send(config);
    });

});

apiRouter.delete('/configuration/:id', oauth2.adminAuth, (req, res, done) => {
    var id = req.params.id;
    var _id = req.query.item;
    var patt = new RegExp('^,' + id + ',', 'i');
    Config.remove({'_id': _id, 'path': patt}, (err) => {
          if(err)
            return done(err);
          res.send('delete successful');
    });

});

apiRouter.get('/configuration/:id', oauth2.adminAuth, (req, res, next) => {
   var id = req.params.id;
   getConfig(id, false, (err, result) => {
        if(err)
          return next(err);
        return res.json({result: result});
   });
/*    var patt = new RegExp('^,' + id + ',', 'i');
   Config.find({path: patt}).sort({order: 1}).exec((err, result) =>{
     if(err)
        return next(err);
     return res.json({result: result});
   });        
 */});

apiRouter.get('/report/users/:id', oauth2.adminAuth, (req, res, next) => {
   var id = req.params.id;
   var include=['subscriptions', 'mailingAddress.address1'
                , 'mailingAddress.address2', 'mailingAddress.city'
                , 'mailingAddress.state', 'email'];
   showUserProtectedData({_id: id}, include, (err, user) => {
      if(err)
        return next(err);
      return res.json(user);
   });
});

apiRouter.delete('/report/users', oauth2.adminAuth, (req, res, next) =>{
   var _user = req.query;
   //console.log(_user);
   User.remove({_id: _user.id}, (err) =>{
       if(err)
         return next(err);
       res.send('delete successful');
   })
});

apiRouter.get('/report/users', oauth2.adminAuth, (req, res, next) =>{
  var projection = Object.assign({}, {accounts: 0, location: 0, 
                        mailingAddress:{address1: 0, address2: 0}});
  var search =  handleSearch('all', null, 
                              { $project: {...projection}}, 
              function(err, data){
                if(err != null)
                return next(err);
                data.result = {...data.result, count: data.users.length};
                return res.json(data);
  });
  process.nextTick(function(){
  search.start();
  })
  return;
});

apiRouter.post('/report/users', oauth2.adminAuth, (req, res, done) =>{
   var _user = req.body;
   User.findOneAndUpdate({_id: _user._id}, {$set: {isblocked: _user.isblocked}}, {new: true},  (err, user) => {
    if(err || !user){
      return done(err);
    }
     res.send(user);
   });
});

apiRouter.use(function(err, req, res, next){
  if(err){
   delete err.stack;
   console.log('am i getting in this error handler');
   console.log(err.message);
   res.status(err.statusCode || 500).json(err.message);
  }
});

export = apiRouter;
