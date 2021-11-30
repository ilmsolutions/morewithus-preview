"use strict";
var passport = require("passport");
var local = require("passport-local");
var oauth2clientpwd = require("passport-oauth2-client-password");
var oauth2bearer = require("passport-http-bearer");
var tokenutils = require("../utils/tokenutils");
var library_1 = require("../utils/library");
var client_1 = require("../models/client");
var token_1 = require("../models/token");
var user_1 = require("../models/user");
//===============PASSPORT=================
// Passport session setup.
passport.serializeUser(function (user, done) {
    //console.log("serializing " + user);
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    // console.log("deserializing " + obj);
    done(null, obj);
});
passport.use(new local.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    //console.log('am in local authenticate strategy....');      
    //console.log(username + ' ' + password);
    user_1.User.login('local', username, password, function (err, user, options) {
        if (err || !user)
            return done(err, user, options);
        if (!user.isverified) {
            //add diversion 
            req.session.orgReturnTo = req.session.returnTo;
            req.session.returnTo = '/verify';
            req.session.message = library_1.Library.MSG_UNVERIFIED_STATUS + ' ' +
                library_1.Library.MSG_UNVERIFIED_EMAIL;
        }
        return done(err, user, options);
    });
}));
/**
 * These strategies are used to authenticate registered OAuth clients.
 * The authentication data may be delivered using the basic authentication scheme (recommended)
 * or the client strategy, which means that the authentication data is in the body of the request.
 */
passport.use(new oauth2clientpwd.Strategy(function (clientId, clientSecret, done) {
    //console.log('client verification....' + clientId);
    client_1.Client.findOne({ id: clientId }, function (err, client) {
        if (err)
            return done(err);
        if (!client)
            return done(null, false);
        return done(null, client);
    });
}));
passport.use(new oauth2bearer.Strategy(function (accesstoken, done) {
    //console.log('getting into bearer strategy');
    token_1.Token.findOne({ token: accesstoken }, function (err, token) {
        //TODO: check for date expiration
        if (err)
            return done(err);
        if (!token)
            return done(null, false);
        try {
            var _token = tokenutils.verifyToken(accesstoken);
            //TODO: get the user object 
            user_1.User.findOne({ email: _token['sub'] }, 'email firstname lastname isregisteredemployee isregisteredemployer usertype lastlogin subscriptions', function (err, user) {
                if (err)
                    throw err;
                if (user == null)
                    return done(null, false);
                done(null, user);
            });
        }
        catch (err) {
            console.log('in catch err');
            return done(null, false, library_1.Library.MSG_INVALID_TOKEN);
        }
        //done(null, {firstname: 'firstname', lastname: 'lastname', userid: _token.sub});
    });
}));
module.exports = passport;
//# sourceMappingURL=local-signin.js.map