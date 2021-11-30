"use strict";
var express = require("express");
var fs = require("fs");
var path_1 = require("path");
var authservice_1 = require("./commons/authservice");
var oauth2 = require("../policies/oauth2");
var url = require('url');
var URL = require('url').Url;
var authApiRouter = express.Router();
authApiRouter.get('/locals/:resource', oauth2.ensureAuthenticatedAPI, function (req, res) {
    var resource = req.params.resource, resp = null;
    switch (true) {
        case /paypal/.test(resource):
            resp = {
                env: process.env.NODE_ENV == 'development' ? 'sandbox' : process.env.NODE_ENV,
                apikey: req.app.locals.paypal
            };
            break;
    }
    console.log(resp);
    res.json(resp);
});
authApiRouter.get('/external/:api/:resource/:id?', oauth2.ensureAuthenticatedAPI, function (req, res, next) {
    //console.log('am i getting in here - get api');
    authservice_1.getApiRequest(req, res, req.params.api, req.params.resource, req.params.id, url.parse(req.url).query);
});
authApiRouter.post('/external/:api/:resource', oauth2.ensureAuthenticatedAPI, function (req, res) {
    authservice_1.postApiRequest(req, res, req.params.api, req.params.resource, req.body);
});
authApiRouter.delete('/external/:api/:resource', oauth2.ensureAuthenticatedAPI, function (req, res) {
    authservice_1.deleteApiRequest(req, res, req.params.api, req.params.resource, { params: req.query });
});
authApiRouter.post('/upload/:type', oauth2.ensureAuthenticatedAPI, function (req, res, done) {
    var data = req.body;
    var type = req.params.type;
    if (!data[type] || !data.file)
        return done(new Error('Invalid request body'));
    var path = '/assets/images/' + data.file;
    var content = data[type].split(',')[1];
    fs.writeFile(path_1.resolve(__dirname, '..' + path), content, 'base64', function (err) {
        var _a;
        if (err)
            return done(err);
        return res.json((_a = {}, _a[type] = path, _a.file = data.file, _a));
    });
});
authApiRouter.use(function (err, req, res, next) {
    if (err) {
        delete err.stack;
        //console.log('am i getting in this error handler');
        //console.log(err.message);
        res.status(err.statusCode || 500).json(err.message);
    }
});
module.exports = authApiRouter;
//# sourceMappingURL=authapi-router.js.map