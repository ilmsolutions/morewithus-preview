import * as express from 'express';
import * as passport from 'passport';
import * as local from 'passport-local';
import * as oauth2clientpwd from 'passport-oauth2-client-password';
import * as oauth2bearer from 'passport-http-bearer';
import * as tokenutils from '../utils/tokenutils';
import {Library} from '../utils/library';
import {Client, IClientModel} from '../models/client';
import {Token, ITokenModel} from '../models/token';
import {User, IUserModel} from '../models/user';

//===============PASSPORT=================
// Passport session setup.
passport.serializeUser(function(user, done) {
  //console.log("serializing " + user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
 // console.log("deserializing " + obj);
  done(null, obj);
});


passport.use(new local.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
      //console.log('am in local authenticate strategy....');      
      //console.log(username + ' ' + password);
      User.login('local', username, password, (err, user, options) =>{
          if(err || !user)
            return done(err, user, options);
          if(!user.isverified){
              //add diversion 
              req.session.orgReturnTo = req.session.returnTo;
              req.session.returnTo = '/verify'; 
              req.session.message = Library.MSG_UNVERIFIED_STATUS + ' ' + 
                                      Library.MSG_UNVERIFIED_EMAIL;
          }
          return done(err, user, options);
      });
  }));

/**
 * These strategies are used to authenticate registered OAuth clients.
 * The authentication data may be delivered using the basic authentication scheme (recommended)
 * or the client strategy, which means that the authentication data is in the body of the request.
 */
passport.use(new oauth2clientpwd.Strategy(
    function (clientId, clientSecret, done) {
       //console.log('client verification....' + clientId);
       Client.findOne({id: clientId}, function (err, client) {
            if (err) return done(err)
            if (!client) return done(null, false)
            return done(null, client)           
        });
    }
));


passport.use(new oauth2bearer.Strategy(function(accesstoken, done){
    //console.log('getting into bearer strategy');
   Token.findOne({token: accesstoken}, function(err, token){
        //TODO: check for date expiration
        if (err) return done(err);
        if (!token) return done(null, false);
        try{
            let _token = tokenutils.verifyToken(accesstoken);
            //TODO: get the user object 
            User.findOne({email: _token['sub']}, 'email firstname lastname isregisteredemployee isregisteredemployer usertype lastlogin subscriptions', function(err, user){
              if(err)
                 throw err;
              if(user == null)
                 return done(null, false);
            
               done(null, user);
            });          
        }
        catch(err){
            console.log('in catch err');   
            return done(null, false, Library.MSG_INVALID_TOKEN);

        }
        //done(null, {firstname: 'firstname', lastname: 'lastname', userid: _token.sub});
   });
}
));
export = passport;