"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var express = require("express");
var async = require("async");
var cutils_1 = require("../utils/cutils");
var user_1 = require("../models/user");
var config_1 = require("./handlers/config");
var cacheutils_1 = require("../utils/cacheutils");
var helpers_1 = require("../utils/helpers");
var search_1 = require("./handlers/search");
var utils = require("../utils/emailutils");
var library_1 = require("../utils/library");
var encryptutils_1 = require("../utils/encryptutils");
var nconf = require("nconf");
var apiRouter = express.Router();
apiRouter.post('/signup', function (req, res, done) {
    var user = {
        firstname: req.body['firstname'],
        lastname: req.body['lastname'],
        email: req.body['email'],
        accounts: [{
                kind: 'local',
                username: req.body['email'],
                password: user_1.User.generateHash(req.body['password'])
            }]
    };
    //console.log(req.session);
    var goto = {
        start: function () {
            if (goto.isUserComplete()) {
                goto.onExistingUserCheck(goto.onInsertUser);
            }
            else
                goto.finish(new Error(library_1.Library.MSG_MISSING_FIELDS), false);
            return;
        },
        isUserComplete: function () {
            //console.log('isUserComplete ' +   !(isEmpty(req.body['checktermsandconditions'])));
            return !(cutils_1.isEmpty(user.firstname) || cutils_1.isEmpty(user.lastname) ||
                cutils_1.isEmpty(user.email) || cutils_1.isEmpty(req.body['password']) ||
                cutils_1.isEmpty(req.body['checktermsandconditions']));
        },
        onExistingUserCheck: function (cb) {
            user_1.User.findOne({ email: user.email, 'accounts.kind': 'local',
                'accounts.username': user.email }, function (err, existinguser) {
                if (err)
                    goto.finish(err, false);
                if (existinguser != null)
                    goto.finish(new Error(library_1.Library.MSG_USER_EXISTS), false);
                else
                    cb();
            });
        },
        onInsertUser: function (cb) {
            user_1.User.findOneAndUpdate({ email: user.email }, user, { new: true, upsert: true, setDefaultsOnInsert: true }, function (err, newUser) {
                if (err)
                    goto.finish(err, false);
                else {
                    //send email and goto finish
                    sendEmail(library_1.Library.EMAIL_VERIFY, user, {
                        returnTo: req.session.returnTo
                    }, goto.finish);
                }
            });
        },
        finish: function (err, result) {
            if (err != null) {
                req.flash('error', err.message);
                res.redirect(req.url);
            }
            else {
                req.flash('redirect', library_1.Library.MSG_SUCCESS_SIGNUP);
                req.flash('info', result);
                req.flash('warn', library_1.Library.MSG_EMAIL_IN_SPAM);
                res.redirect('/verify');
            }
        }
    };
    process.nextTick(function () {
        goto.start();
    });
    return;
});
apiRouter.post('/verify', function (req, res, done) {
    var _a = req.body, email = _a.email, token = _a.token;
    //verify if email matches with the token provided
    //if match update the isverified field  
    // and send an email notification indicating email verified
    //else if it fails then provide a button to resend the email notification
    var goto = {
        start: function () {
            if (!email || !token)
                return goto.finish(new Error(library_1.Library.MSG_MISSING_PARAMETERS), false);
            var dtoken = JSON.parse(encryptutils_1.decrypt(token));
            if (!dtoken)
                return goto.finish(new Error(library_1.Library.MSG_INVALID_TOKEN), false);
            if (new Date(dtoken.expiresin) < new Date() || dtoken.email != email)
                return goto.finish(new Error(library_1.Library.MSG_INVALID_TOKEN), false);
            //console.log('token.returnTo: ' + dtoken.returnTo);
            req.session.returnTo = dtoken.returnTo;
            //Update User field isverified to true 
            user_1.User.findOneAndUpdate({ email: email, 'accounts.kind': 'local' }, { $set: { 'accounts.$.isverified': true } }, function (err, user) {
                if (err || !user)
                    goto.finish(new Error(library_1.Library.MSG_FAILED_VERIFY_EMAIL), false);
                //send email
                utils.getEmailTemplate(library_1.Library.EMAIL_VERIFIED).then(function (template) {
                    var email = utils.transformEmailTemplate(template, {
                        to: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname
                    });
                    utils.sendEmail(email, function (err, info) {
                        if (err)
                            goto.finish(err, library_1.Library.MSG_FAILED_EMAIL);
                        goto.finish(null, library_1.Library.MSG_CONFIRM_VERIFY_EMAIL);
                    });
                });
            }); //findoneandupdate
        },
        finish: function (err, result) {
            //console.log(err);
            //console.log('finish.returnTo: ' + req.session.returnTo);
            if (err != null) {
                req.flash('error', err.message);
                res.redirect('/verify');
            }
            else {
                req.flash('info', result);
                res.redirect(req.session.returnTo);
            }
        }
    };
    process.nextTick(function () {
        goto.start();
    });
    return;
});
apiRouter.post('/resendverification', function (req, res, done) {
    var email = req.body.email;
    //verify if email matches with the token provided
    //if match update the isverified field  
    // and send an email notification indicating email verified
    //else if it fails then provide a button to resend the email notification
    var goto = {
        start: function () {
            if (!email)
                return goto.finish(new Error(library_1.Library.MSG_MISSING_PARAMETERS), false);
            //console.log(req.session.returnTo);
            user_1.User.findOne({ email: email }, function (err, user) {
                if (err || !user)
                    goto.finish(new Error(library_1.Library.MSG_USER_NOT_EXISTS), false);
                sendEmail(library_1.Library.EMAIL_VERIFY, user, {
                    returnTo: req.session.returnTo
                }, goto.finish);
            });
        },
        finish: function (err, result) {
            if (err != null) {
                req.flash('error', err.message);
                res.redirect('/verify');
            }
            else {
                req.flash('info', result);
                req.flash('warn', library_1.Library.MSG_EMAIL_IN_SPAM);
                res.redirect('/verify');
            }
        }
    };
    process.nextTick(function () {
        goto.start();
    });
    return;
});
apiRouter.post('/forgot', function (req, res, done) {
    var _a = req.body, email = _a.email, token = _a.token, npassword = _a.npassword;
    //console.log('in forgot')
    //console.log(email);
    //console.log(token);
    var path = '';
    var goto = {
        start: function () {
            if (email && token && npassword) {
                goto.reset(email, token, npassword);
                path = 'reset';
            }
            else if (email) {
                goto.sendreset(email);
                path = 'sendreset';
            }
            else
                return goto.finish(new Error(library_1.Library.MSG_MISSING_PARAMETERS), false);
        },
        sendreset: function (email) {
            user_1.User.findOne({ email: email }, function (err, user) {
                if (err || !user)
                    goto.finish(new Error(library_1.Library.MSG_USER_NOT_EXISTS), false);
                sendEmail(library_1.Library.EMAIL_PASSWORD_RESET, user, {
                    returnTo: req.session.returnTo
                }, goto.finish);
            });
        },
        reset: function (email, token, npwd) {
            var dtoken = JSON.parse(encryptutils_1.decrypt(token));
            if (!dtoken)
                return goto.finish(new Error(library_1.Library.MSG_INVALID_TOKEN), false);
            if (new Date(dtoken.expiresin) < new Date() || dtoken.email != email)
                return goto.finish(new Error(library_1.Library.MSG_INVALID_TOKEN), false);
            req.session.returnTo = dtoken.returnTo;
            user_1.User.resetPassword(email, npassword, function (err, status) {
                if (err || !status)
                    return goto.finish(err || new Error('Password failed to update.'), false);
                return goto.finish(null, library_1.Library.MSG_PASSWORD_RESET_SUCCESS);
            });
        },
        finish: function (err, result) {
            //console.log('in finish');
            if (err != null) {
                req.flash('error', err.message);
                res.redirect('/forgot');
            }
            else {
                //console.log(result);
                req.flash('info', result);
                if (path == 'sendreset')
                    req.flash('warn', library_1.Library.MSG_EMAIL_IN_SPAM);
                res.redirect(path == 'sendreset' ? '/forgot?success=true' : req.session.returnTo);
            }
        }
    };
    process.nextTick(function () {
        goto.start();
    });
    return;
});
apiRouter.get('/typeaheads/:keys', function (req, res, next) {
    var filter = req.query.filter, keys = req.params.keys.split('_'), queries = [], mdata = [];
    var _loop_1 = function () {
        var key = translateToDBField(keys[i]);
        if (!key)
            return { value: next(new Error('invalid input parameters')) };
        var data = cacheutils_1.CacheUtils.get(key);
        if (data == null || data.length <= 0) {
            cb = function (err, values) { return err ? next(err) : mdata = mdata.concat.apply([], values); };
            queries.push(function (cb) {
                getDistinct(key, function (err, values) {
                    return cb(err, values);
                });
            });
        }
        else
            mdata = mdata.concat(data);
    };
    var cb;
    for (var i = 0; i < keys.length; i++) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    if (queries.length > 0) {
        async.parallel(queries, function (err, results) {
            //console.log(results);
            if (err)
                return next(err);
            mdata = mdata.concat.apply([], results);
            res.send({ result: cutils_1.unique(mdata) });
        });
    }
    else
        res.send({ result: cutils_1.unique(mdata) });
});
apiRouter.get('/users', function (req, res, next) {
    //console.log('am getting in here');
    //console.log(req.query);
    var query = req.query.query;
    var near = req.query.near;
    var search = search_1.handleSearch(query, near, { $project: { accounts: 0, email: 0,
            mailingAddress: { address1: 0, address2: 0 },
            website: 0, location: 0, contact: 0 } }, function (err, data) {
        if (err != null)
            return next(err);
        var _u = data.users.filter(function (user) {
            //hack to ensure search results include only active employees
            //issue with filtering in the search handler
            return user['isactiveemployee'] == true;
        });
        return res.json({
            result: __assign({}, data.result, { count: _u.length }),
            users: _u
        });
    });
    process.nextTick(function () {
        search.start();
    });
    return;
});
apiRouter.post('/notifications/:key', function (req, res, done) {
    var body = req.body;
    var path = new RegExp('^,EmailNotifications,', 'i');
    var kval = new RegExp(req.params.key, 'i');
    var admins = nconf.get('accounts').admins;
    config_1.getConfigs(path, { value: kval, active: true }).then(function (configs) {
        configs.forEach(function (config) {
            //            console.log('expiring subscription');
            var type = 'Event.' + config.value;
            var emailtemplate = utils.getEmailTemplate(config.value);
            emailtemplate.then(function (etemplate) {
                var email = utils.transformEmailTemplate(etemplate, __assign({ to: admins }, body));
                utils.sendEmail(email, function (err, info) {
                    return;
                }); //send email
            }); //email template promise
        }); //config loop
    });
    return res.json('completed!');
});
function getDistinct(key, cb) {
    user_1.User.distinct(key, function (err, values) {
        if (err)
            return cb(err);
        if (values.length > 0)
            cacheutils_1.CacheUtils.put(key, values);
        cb(null, values);
    });
}
function translateToDBField(key) {
    switch (key.toLowerCase()) {
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
function geocodeAsync(near, cb) {
    helpers_1.helpers.geoCode(near, function (err, result) {
        if (err || result == null || result.length <= 0) {
            return cb(err || new Error('invalid address'));
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
function sendEmail(type, user, opts, done) {
    //send email and goto finish
    utils.getEmailTemplate(type).then(function (template) {
        var token = Object.assign({}, {
            email: user.email,
            expiresin: new Date().addDuration('1d')
        }, opts);
        var email = utils.transformEmailTemplate(template, {
            token: encryptutils_1.encrypt(JSON.stringify(token)),
            to: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        });
        utils.sendEmail(email, function (err, info) {
            if (err)
                done(err, library_1.Library.MSG_FAILED_EMAIL);
            var m = '';
            switch (type) {
                case library_1.Library.EMAIL_VERIFY:
                    m = library_1.Library.MSG_SENT_VERIFY_EMAIL;
                    break;
                case library_1.Library.EMAIL_PASSWORD_RESET:
                    m = library_1.Library.MSG_SENT_PASSWORD_RESET_EMAIL;
                    break;
            }
            done(null, m);
        });
    });
}
module.exports = apiRouter;
//# sourceMappingURL=ApiRouter.js.map