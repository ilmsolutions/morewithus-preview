"use strict";
var express = require("express");
var PATH = require("path");
var fs = require("fs");
var apiservice_1 = require("./commons/apiservice");
var url = require('url');
var apiRouter = express.Router();
var ROOT = '../';
apiRouter.get('/data/json/:resource', function (req, res, next) {
    var resource = req.params.resource;
    var file;
    switch (resource) {
        case 'states.us':
            file = 'data/states_us.json';
            break;
        default:
            file = 'data/' + resource + '.json';
            break;
    }
    res.json(JSON.parse(fs.readFileSync(PATH.resolve(__dirname, ROOT, file), 'utf8')));
});
apiRouter.get('/external/:api/:resource', function (req, res, next) {
    var api = req.params.api;
    var resource = req.params.resource;
    var query = url.parse(req.url).query;
    apiservice_1.getApiRequest(req, res, api, resource, query);
});
apiRouter.post('/external/:api/:resource', function (req, res, done) {
    var body = req.body;
    var resource = req.params.resource;
    var api = req.params.api;
    if (!api || !resource || !body || !body.recaptcha)
        return res.status(500).json('invalid response');
    apiservice_1.postApiRequest(req, res, api, resource, body);
});
module.exports = apiRouter;
//# sourceMappingURL=api-router.js.map