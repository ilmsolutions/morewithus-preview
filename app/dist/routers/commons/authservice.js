"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nconf = require("nconf");
var request = require("request");
exports.authorizedApiRequest = function (req, resourceurl, params, done) {
    var headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + req.session.passport.user.accesstoken
    };
    var options = {
        headers: headers,
        uri: resourceurl,
        method: (params.method) ? params.method : 'GET',
        qs: params.qs
    };
    if (options.method == 'POST') {
        options = Object.assign({}, options, {
            body: JSON.stringify(params.body)
        });
    }
    request(options, function (err, res, body) {
        //console.log('in call back after getting user profile'); 
        //console.log(res.statusCode);       
        if (err)
            return done(err);
        if (res.statusCode != 200) {
            //console.log(body);         
            return done({ statusCode: res.statusCode }, body);
        }
        return done(null, body);
    });
};
exports.getApiRequest = function (req, res, api, resource, id, query) {
    var resourceurl = resolveResourceUrl(api, resource) + ((query && query.length > 0) ? '?' + query : '');
    exports.authorizedApiRequest(req, resourceurl + (id ? '/' + id : ''), {}, function (err, response) {
        //console.log(response);
        //console.log(err);
        //console.log(response.body);
        if (err) {
            res.status(err.statusCode).json(err);
        }
        else
            res.json(response);
    });
};
exports.postApiRequest = function (req, res, api, resource, body, cb) {
    var resourceurl = resolveResourceUrl(api, resource), defcb = function (err, response) {
        if (err) {
            res.status(err.statusCode).json(response);
        }
        else
            res.json(response);
    };
    //console.log('body....');
    //console.log(req.body);
    exports.authorizedApiRequest(req, resourceurl, { method: 'POST', body: body }, cb ? cb : defcb);
};
exports.deleteApiRequest = function (req, res, api, resource, body, cb) {
    var resourceurl = resolveResourceUrl(api, resource), defcb = function (err, response) {
        if (err) {
            res.status(err.statusCode).json(response);
        }
        else
            res.json(response);
    };
    //console.log('body....');
    //console.log(body.params);
    exports.authorizedApiRequest(req, resourceurl, { method: 'DELETE', qs: body.params }, cb ? cb : defcb);
};
function resolveResourceUrl(api, resource) {
    var resourceurl;
    switch (api) {
        case 'authorization':
        case 'admin':
            resourceurl = nconf.get('passport.oauth2').endpoint;
            break;
    }
    switch (true) {
        case /^users/.test(resource):
        case /^subscription/.test(resource):
            resourceurl += '/api/auth/' + resource;
            break;
        case /^changepassword/.test(resource):
            resourceurl += '/api/auth/' + resource;
            break;
        case /^user/.test(resource):
            resourceurl += '/api/auth/user';
            break;
        case /^typeaheads\.\w+$/.test(resource):
            resourceurl += '/api/auth/typeaheads/' + resource.substring(resource.indexOf('.') + 1);
            break;
        case /^configuration\.\w+$/.test(resource):
            resourceurl += '/api/admin/configuration/' + resource.substring(resource.indexOf('.') + 1);
            break;
        case /^report\.\w+$/.test(resource):
            resourceurl += '/api/admin/report/' + resource.substring(resource.indexOf('.') + 1);
            break;
        case /^settings\.\w+$/.test(resource):
            resourceurl += '/api/settings/configuration/' + resource.substring(resource.indexOf('.') + 1);
    }
    console.log(resourceurl);
    return resourceurl;
}
//# sourceMappingURL=authservice.js.map