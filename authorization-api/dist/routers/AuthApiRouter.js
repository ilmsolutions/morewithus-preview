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
var oauth2 = require("../policies/oauth2");
var cacheutils_1 = require("../utils/cacheutils");
var library_1 = require("../utils/library");
var helpers_1 = require("../utils/helpers");
var utils = require("../utils/emailutils");
var encryptutils_1 = require("../utils/encryptutils");
var user_1 = require("../models/user");
var search_1 = require("./handlers/search");
var user_2 = require("./handlers/user");
var apiRouter = express.Router();
/*apiRouter.get('/', (req, res) => {
     res.send('Work with me Authorization API!');
});*/
apiRouter.get('/profile', oauth2.auth, function (req, res) {
    //console.log('in profile handler. before rendering...');
    return res.json(req.user);
});
apiRouter.get('/users/:id', oauth2.auth, function (req, res, next) {
    var include = ['contact', 'email', 'website', 'mailingAddress.city', 'mailingAddress.state'];
    user_2.showUserProtectedData({ _id: req.params.id }, include, function (err, usr) {
        if (err)
            return next(err);
        return res.json(usr);
    });
});
apiRouter.get('/users', oauth2.auth, function (req, res, next) {
    var query = req.query.query;
    var near = req.query.near;
    var user = req.user;
    var projection = Object.assign({}, { accounts: 0, location: 0,
        email: 0, contact: 0, website: 0,
        mailingAddress: { address1: 0, address2: 0 } });
    var search = search_1.handleSearch(query, near, { $project: __assign({}, projection) }, function (err, data) {
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
apiRouter.get('/user', oauth2.auth, function (req, res, next) {
    var include = req.query.include;
    var user = req.user;
    user_2.showUserProtectedData({ email: user.email }, include, function (err, usr) {
        if (err)
            return next(err);
        return res.json(usr);
    });
});
apiRouter.post('/user', oauth2.auth, function (req, res, done) {
    //console.log(req.body);
    var cb = function (email, body) {
        return user_1.User.findOneAndUpdate({ email: email }, body, { runValidators: true }, function (err, user) {
            if (err || !user) {
                console.log(err);
                return done(err);
            }
            res.send(user);
        });
    };
    if (req.body && req.body.mailingAddress) {
        var ma = req.body.mailingAddress;
        var addr = ma.address1 + ' ' + (ma.address2 ? ma.address2 : '') + ' ' + ma.zipcode;
        helpers_1.helpers.geoCode(addr, function (err, res) {
            if (err)
                return done(err);
            if (res != null && res[0] && res[0].zipcode == ma.zipcode) {
                req.body = Object.assign({}, req.body, { location: { coordinates: [res[0].longitude, res[0].latitude] } });
            }
            else
                return done(new Error('Address or Zip Code is not valid'));
            return cb(req.user.email, req.body);
        });
    }
    else
        return cb(req.user.email, req.body);
});
apiRouter.get('/typeaheads/:key', oauth2.auth, function (req, res, next) {
    var filter = req.query.filter;
    var key = translateToDBField(req.params.key);
    if (!key)
        return next(new Error('invalid input parameters'));
    var data = cacheutils_1.CacheUtils.get(key);
    if (data == null) {
        user_1.User.distinct(key, function (err, values) {
            if (err)
                return next(err);
            //console.log(values);
            if (values.length > 0)
                cacheutils_1.CacheUtils.put(key, values);
            res.send({ result: values });
        });
    }
    else
        res.send({ result: data });
});
apiRouter.post('/subscription', oauth2.auth, function (req, res, done) {
    var user = req.user;
    if (req.body && req.body['usercontext']) {
        var subscription = req.body;
        user_1.User.findOne({ email: user.email }, function (err, founduser) {
            if (err)
                return done(err);
            founduser.subscriptions.forEach(function (s) {
                if (s.usercontext == subscription.usercontext)
                    s.isexpired = true;
            });
            founduser.subscriptions.push(subscription);
            founduser.save(function (err, saveduser) {
                if (err)
                    return done(err);
                utils.getEmailTemplate(library_1.Library.EMAIL_PAYMENT_RECEIPT)
                    .then(function (etemplate) {
                    var email = utils.transformEmailTemplate(etemplate, {
                        to: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        orderid: (subscription.orderid ? subscription.orderid : '-'),
                        orderamount: helpers_1.helpers.toCurrency(subscription.orderamount),
                        paymentdate: new Date(subscription.paymentdate).toDisplay(),
                        expirationdate: new Date(subscription.expirationdate).toDisplay()
                    });
                    utils.sendEmail(email, function (err, info) {
                        return;
                    }); //send email
                });
                return res.json(founduser);
            });
        });
    }
    else
        return done(new Error('Invalid Request Body.'));
});
apiRouter.post('/changepassword', oauth2.auth, function (req, res, done) {
    var _user = req.user, _payload = req.body;
    if (_payload && _payload.current && _payload.password) {
        user_1.User.findOne({ email: _user.email }, function (err, user) {
            if (err)
                done(err);
            user_1.User.updatePassword(user, encryptutils_1.decrypt(_payload.current), encryptutils_1.decrypt(_payload.password), function (err, response) {
                if (err || !response)
                    return done(err || new Error('Password failed to update.'));
                return res.send('Password changed!');
            });
        });
    }
    else
        return done(new Error('Request body missing required parameters'));
});
apiRouter.use(function (err, req, res, next) {
    if (err) {
        delete err.stack;
        //console.log('am i getting in this error handler');
        //console.log(err.message);
        res.status(err.statusCode || 500).json(err.message);
    }
});
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
module.exports = apiRouter;
//# sourceMappingURL=AuthApiRouter.js.map