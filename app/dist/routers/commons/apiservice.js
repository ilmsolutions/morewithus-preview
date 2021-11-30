"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nconf = require("nconf");
var request = require("request");
exports.getApiRequest = function (req, res, api, resource, query) {
    exports.getApiResource(api, resource, query, function (err, response) {
        if (err) {
            res.status(err.statusCode).json(response);
        }
        else
            res.json(response);
    });
};
exports.postApiRequest = function (req, res, api, resource, body, cb) {
    var resourceurl = resolveResourceUrl(api, resource), defcb = cb ? cb : function (err, response) {
        if (err) {
            res.status(err.statusCode).json(response);
        }
        else
            res.json(response);
    };
    apiRequest(resourceurl, { method: 'POST', body: body }, defcb);
};
exports.getApiResource = function (api, resource, query, done) {
    var resourceurl = resolveResourceUrl(api, resource) + ((query && query.length > 0) ? '?' + query : '');
    apiRequest(resourceurl, { method: 'GET' }, done);
};
var apiRequest = function (resourceurl, params, done) {
    var headers = {
        "Content-Type": "application/json"
    };
    var options = {
        headers: headers,
        uri: resourceurl,
        method: (params.method) ? params.method : 'GET'
    };
    if (options.method == 'POST') {
        options = Object.assign({}, options, {
            body: JSON.stringify(params.body)
        });
    }
    request(options, function (err, res, body) {
        //console.log('in call back after getting user profile');        
        if (err)
            return done(err);
        if (res.statusCode != 200) {
            //console.log(body);         
            return done({ statusCode: 400 }, body);
        }
        return done(null, body);
    });
};
var resolveResourceUrl = function (api, resource) {
    var resourceurl;
    switch (api) {
        case 'authorization':
            resourceurl = nconf.get('passport.oauth2').endpoint;
            break;
    }
    //console.log(resource);
    switch (true) {
        case /logout/.test(resource):
            resourceurl += '/api/logout';
            break;
        case /typeaheads\.\w+$/.test(resource):
            resourceurl += '/api/typeaheads/' + resource.substring(resource.indexOf('.') + 1);
            break;
        case /users/.test(resource):
            resourceurl += '/api/' + resource;
            break;
        case /^settings\.[\w\s,]+$/.test(resource):
            resourceurl += '/api/settings/configuration/' + resource.substring(resource.indexOf('.') + 1);
            break;
        case /^notifications\.[\w\s,]+$/.test(resource):
            resourceurl += '/api/notifications/' + resource.substring(resource.indexOf('.') + 1);
            break;
    }
    return resourceurl;
};
//# sourceMappingURL=apiservice.js.map