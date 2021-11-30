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
var config_1 = require("../models/admin/config");
var user_1 = require("../models/user");
var oauth2 = require("../policies/oauth2");
var search_1 = require("./handlers/search");
var settings_1 = require("./handlers/settings");
var user_2 = require("./handlers/user");
var apiRouter = express.Router();
apiRouter.post('/configuration/:id', oauth2.adminAuth, function (req, res, done) {
    var id = req.params.id;
    var _config = req.body;
    var patt = new RegExp('^,' + id + ',', 'i');
    var filters = { 'path': patt };
    var opts = { new: true, upsert: true,
        setDefaultsOnInsert: true,
        returnNewDocument: true };
    if (_config._id)
        filters = Object.assign({}, filters, { '_id': _config._id });
    else {
        //_config.path = ',' + id + ',';
        filters = Object.assign({}, filters, { 'label': '' });
    }
    config_1.Config.findOneAndUpdate(filters, { $set: _config }, opts, function (err, config) {
        if (err || !config) {
            //console.log(err);
            return done(err);
        }
        //console.log(config);
        res.send(config);
    });
});
apiRouter.delete('/configuration/:id', oauth2.adminAuth, function (req, res, done) {
    var id = req.params.id;
    var _id = req.query.item;
    var patt = new RegExp('^,' + id + ',', 'i');
    config_1.Config.remove({ '_id': _id, 'path': patt }, function (err) {
        if (err)
            return done(err);
        res.send('delete successful');
    });
});
apiRouter.get('/configuration/:id', oauth2.adminAuth, function (req, res, next) {
    var id = req.params.id;
    settings_1.getConfig(id, false, function (err, result) {
        if (err)
            return next(err);
        return res.json({ result: result });
    });
    /*    var patt = new RegExp('^,' + id + ',', 'i');
       Config.find({path: patt}).sort({order: 1}).exec((err, result) =>{
         if(err)
            return next(err);
         return res.json({result: result});
       });
     */ 
});
apiRouter.get('/report/users/:id', oauth2.adminAuth, function (req, res, next) {
    var id = req.params.id;
    var include = ['subscriptions', 'mailingAddress.address1',
        'mailingAddress.address2', 'mailingAddress.city',
        'mailingAddress.state', 'email'];
    user_2.showUserProtectedData({ _id: id }, include, function (err, user) {
        if (err)
            return next(err);
        return res.json(user);
    });
});
apiRouter.delete('/report/users', oauth2.adminAuth, function (req, res, next) {
    var _user = req.query;
    //console.log(_user);
    user_1.User.remove({ _id: _user.id }, function (err) {
        if (err)
            return next(err);
        res.send('delete successful');
    });
});
apiRouter.get('/report/users', oauth2.adminAuth, function (req, res, next) {
    var projection = Object.assign({}, { accounts: 0, location: 0,
        mailingAddress: { address1: 0, address2: 0 } });
    var search = search_1.handleSearch('all', null, { $project: __assign({}, projection) }, function (err, data) {
        if (err != null)
            return next(err);
        data.result = __assign({}, data.result, { count: data.users.length });
        return res.json(data);
    });
    process.nextTick(function () {
        search.start();
    });
    return;
});
apiRouter.post('/report/users', oauth2.adminAuth, function (req, res, done) {
    var _user = req.body;
    user_1.User.findOneAndUpdate({ _id: _user._id }, { $set: { isblocked: _user.isblocked } }, { new: true }, function (err, user) {
        if (err || !user) {
            return done(err);
        }
        res.send(user);
    });
});
apiRouter.use(function (err, req, res, next) {
    if (err) {
        delete err.stack;
        console.log('am i getting in this error handler');
        console.log(err.message);
        res.status(err.statusCode || 500).json(err.message);
    }
});
module.exports = apiRouter;
//# sourceMappingURL=AdminApiRouter.js.map