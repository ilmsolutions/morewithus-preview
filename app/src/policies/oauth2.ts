import * as express from 'express';
import * as passport from 'passport';
import * as nconf from 'nconf';
import * as request from 'request';
import {OAuth2Strategy} from 'passport-oauth';

//===============PASSPORT=================
// Passport session setup.
passport.serializeUser(function(user, done) {
  //console.log("serializing " + user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  //console.log("deserializing " + JSON.stringify(obj));
  done(null, obj);
});

const oauth2opts = nconf.get('passport.oauth2');
const root = nconf.get('domain');
const cookie_returnTo = nconf.get('app.keys')['cookie.returnTo'];

OAuth2Strategy.prototype.userProfile = function(accesstoken, done) {
  let headers = {  
  "Content-Type": "application/json",
  "Authorization": "Bearer " + accesstoken
  }
  request({
    headers:headers,
    uri: (oauth2opts.endpoint + oauth2opts.profileURL),
    method: 'GET'
  }, function(err, res, body){
        //console.log('in call back after getting user profile');
        if(err) return done(err);
        if(res.statusCode != 200) return done(null, false);
        return done(null, body); 
  });
}
  

passport.use('provider', new OAuth2Strategy({
    authorizationURL: (oauth2opts.endpoint + oauth2opts.authorizationURL),
    tokenURL: (oauth2opts.endpoint + oauth2opts.tokenURL),
    clientID: oauth2opts.clientID,
    clientSecret: oauth2opts.clientSecret,
    callbackURL: (root + oauth2opts.callbackURL)
    ,passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //console.log('profile handler');
    //console.log(JSON.stringify(profile));
    var tokeninfo = {
      accesstoken: accessToken,
      refreshtoken: refreshToken,
      profile: JSON.parse(profile)
    };
    return done(null, tokeninfo);
  }
));

export const login = [
/*function(req, res, next){
     console.log('redirect from login');


     passport.authenticate('provider', 
                           {failureRedirect:'/auth/login', 
                            successRedirect: returnTo,
                            successReturnToOrRedirect: returnTo
                          })
                          (req,res,next);
}
,*/
passport.authenticate('provider')
];

export const authorizationCallback = [
/*function(req, res, next){
   console.log('this is the callback....am being touched');
   console.log(req.session);
   console.log(req.cookies.returnTo);

   next();
}, */
passport.authenticate('provider', {failureRedirect: '/auth/login'}),
 function(req, res){        
        //console.log('am callback after the oauth authentication completes'); 
        //console.log(JSON.stringify(req.session.passport.user.profile));
        var returnTo = null;
        if(req.session.passport && req.session.passport.user 
           && req.session.passport.user.profile){
             if(req.session.passport.user.profile.isregisteredemployee ||
                req.session.passport.user.profile.isregisteredemployer){
                  //authorized and registered
                 returnTo = req.signedCookies[cookie_returnTo];
              }
              else //authorized but not registered
                returnTo = '/auth/profile';
        } 
                    
        res.clearCookie(cookie_returnTo);

        returnTo = returnTo || '/';

        res.redirect(returnTo);
}];

export const logout = [
   function(req, res){
     //console.log('logout triggered');
     req.logout();
     req.session.destroy((err) => {
     //  console.log('callback after session destroy');
     //  console.log(err);
      res.redirect(oauth2opts.endpoint + oauth2opts.logoutURL + '?returnTo=' + root);
     });
   }
];

export const ensureAuthenticated = [
function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }

  req.session.error = 'Please sign in!';  
  res.cookie(cookie_returnTo, req.originalUrl || req.url, {signed: true});
  res.redirect('/auth/login');
}
];

export const ensureAuthenticatedAPI = [
  function(req, res, next){
    if(req.isAuthenticated()) { return next(); }
    //console.log('am getting in here for the API');
    res.status(401).json('Session Expired!');
    return res;
  }
]