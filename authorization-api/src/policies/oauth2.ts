import * as express from 'express';
import * as oauth2orize from 'oauth2orize';
import * as passport from './local-signin';
import * as login from 'connect-ensure-login';
import * as PATH from 'path';
import * as nconf from 'nconf';
import * as tokenutils from '../utils/tokenutils';
import {uid} from '../utils/cutils';
import {Library} from '../utils/library';
import {Client, IClientModel} from '../models/client';
import {AuthorizationCode, IAuthorizationCodeModel} from '../models/authorizationcode';
import {Token, ITokenModel} from '../models/token';

const server = oauth2orize.createServer();

server.serializeClient(function(client, done) {
  //console.log('serialize client...' + client.id);
  return done(null, client.id);
});

server.deserializeClient(function(id, done) {  
  //console.log('deserialize client...' + id);
  Client.findOne({id: id}, function(err, client) {
    if (err) { return done(err); }
    return done(null, client);
  });
});

// Register supported grant types.
//
// OAuth 2.0 specifies a framework that allows users to grant client
// applications limited access to their protected resources.  It does this
// through a process of the user granting access, and the client exchanging
// the grant for an access token.

// Grant authorization codes.  The callback takes the `client` requesting
// authorization, the `redirectUri` (which is used as a verifier in the
// subsequent exchange), the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application.  The application issues a code, which is bound to these
// values, and will be exchanged for an access token.
/**
 * Grant authorization codes
 *
 * The callback takes the `client` requesting authorization, the `redirectURI`
 * (which is used as a verifier in the subsequent exchange), the authenticated
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a code,
 * which is bound to these values, and will be exchanged for an access token.
 */
 server.grant(oauth2orize.grant.code((client, redirectURI, user, ares, done) => {
  const code = uid(256);  
  //console.log('am in grant.....' + code);
  AuthorizationCode.collection.save({code: code, clientid: client._id, 
                                     redirecturi: redirectURI, userid: user.email, 
                                     scope: client.scope})
            .then(() => {
              //console.log('am getting in here after save....' + code);
              done(null, code);
            })
            .catch(err => done(err));
  //{ sub : user.id, exp : nconf.get('session').codetoken.expiresin }
}));

// Exchange authorization codes for access tokens.  The callback accepts the
// `client`, which is exchanging `code` and any `redirectUri` from the
// authorization request for verification.  If these values are validated, the
// application issues an access token on behalf of the user who authorized the
// code.

server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, done) {
  //console.log('exchange code.....');
  
  AuthorizationCode.findOne({code: code}, function(err, authorizationcode){
     if(err) { return done(err); }
     if(authorizationcode === undefined){  return done(null, false); }
     if(client._id.toString() !== authorizationcode.clientid) {return done(null, false); }
     if(redirectUri !== authorizationcode.redirecturi) { return done(null, false); }

    //console.log('authorization code....' + authorizationcode);
    // Delete auth code now that it has been used
    AuthorizationCode.remove(authorizationcode, function(err){
      if(err) { return done(err); }
      //console.log('remove.....');
      // Create a new access token
      const expirationDate = new Date(new Date().getTime() + nconf.get('token').expiresin);

      const token = tokenutils.createToken({
                                           sub: authorizationcode.userid
                                           ,exp: nconf.get('token').expiresin
                                          });

      // Save the access token and check for errors
      Token.collection.save({token: token})
        .then(() => {    
              //console.log('am after save token....')          
              done(null, token, token, {expiresin: expirationDate});
            })
            .catch(err => done(err));

      }); //authorization code remove 
  });

}));


// user authorization endpoint
//
// `authorization` middleware accepts a `validate` callback which is
// responsible for validating the client making the authorization request.  In
// doing so, is recommended that the `redirectUri` be checked against a
// registered value, although security requirements may vary accross
// implementations.  Once validated, the `callback` callback must be invoked with
// a `client` instance, as well as the `redirectUri` to which the user will be
// redirected after an authorization decision is obtained.
//
// This middleware simply initializes a new authorization transaction.  It is
// the application's responsibility to authenticate the user and render a dialog
// to obtain their approval (displaying details about the client requesting
// authorization).  We accomplish that here by routing through `ensureLoggedIn()`
// first, and rendering the `dialog` view. 

export const authorization = [
 login.ensureLoggedIn('../login'),
 server.authorization(function(clientId, redirectURI, done) {

    Client.findOne({id: clientId}, function(err, client) {
      if (err) { return done(err); }
      if (!client) { return done(null, false); }
      if (client.redirecturi != redirectURI) { return done(null, false); }
      return done(null, client, <string>client.redirecturi);
    });    

  })
, (req, res, next) => {
  //middleware to check user verification
    let {user, oauth2} = req;
    if(!user.isverified){
      req.session.orgReturnTo = req.url; //once verified redirect to login page
      req.session.message = Library.MSG_UNVERIFIED_STATUS + ' ' + 
                             Library.MSG_UNVERIFIED_EMAIL;
      req.logout();
      return res.redirect('/verify');                                                  
    }      
    next();
}  
];

// user decision endpoint
//
// `decision` middleware processes a user's decision to allow or deny access
// requested by a client application.  Based on the grant type requested by the
// client, the above grant middleware configured above will be invoked to send
// a response.

export const decision = [
   login.ensureLoggedIn('../login')
  ,server.decision(null)
];

// Application client token exchange endpoint
export const token = [
  passport.authenticate(['oauth2-client-password'], {session: false}),
  server.token(),
  server.errorHandler()
];


export const auth = [
    passport.authenticate('bearer', { session: false })    
];

export const adminAuth = [...auth, 
  (req, res, next) => {
    if(req.isAuthenticated()){
      let {user} = req;
      let {admins} = nconf.get('accounts');
      if(admins && 
             admins.filter(admin => {return admin.indexOf(user.email) >= 0}).length > 0){
        return next();
      }      
     }

     return  res.status(403).json("Sorry! You can't see this...");
  }
]; 