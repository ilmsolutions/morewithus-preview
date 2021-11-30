"use strict";
var express = require("express");
var client_1 = require("../models/client");
var library_1 = require("../utils/library");
var App_1 = require("../components/App");
var login_1 = require("../components/login");
var signup_1 = require("../components/signup");
var verify_1 = require("../components/verify");
var forgot_1 = require("../components/forgot");
var React = require("react");
var server_1 = require("react-dom/server");
var appRouter = express.Router();
appRouter.get('/login', function (req, res) {
    getClient(getClientId(req), function (props) {
        var status = req.app.locals.getFlashStatus(req);
        var params = Object.assign({}, { status: status }, props);
        var elem = React.createElement(App_1.App, params, React.createElement(login_1.Login));
        res.locals.metaTags = {
            title: library_1.Library.META_DEFAULT_TITLE
        };
        res.render('index', {
            content: server_1.renderToString(elem),
            context: {}
        });
    });
});
appRouter.get('/signup', function (req, res) {
    getClient(getClientId(req), function (props) {
        var params = Object.assign({}, { status: req.app.locals.getFlashStatus(req) }, props);
        var elem = React.createElement(App_1.App, params, React.createElement(signup_1.Signup));
        res.locals.metaTags = {
            title: library_1.Library.META_SIGNUP_TITLE,
            description: library_1.Library.META_SIGNUP_DESCRIPTION,
            keywords: library_1.Library.META_SIGNUP_KEYWORDS
        };
        res.render('index', {
            content: server_1.renderToString(elem),
            context: {}
        });
    });
});
appRouter.get('/forgot', function (req, res) {
    getClient(getClientId(req), function (props) {
        var params = Object.assign({}, { status: req.app.locals.getFlashStatus(req) }, { context: req.query }, props);
        var elem = React.createElement(App_1.App, params, React.createElement(forgot_1.Forgot));
        res.locals.metaTags = {
            title: library_1.Library.META_DEFAULT_TITLE
        };
        res.render('index', {
            content: server_1.renderToString(elem),
            context: {}
        });
    });
});
appRouter.get('/verify', function (req, res) {
    if (req.session.orgReturnTo) {
        req.session.returnTo = req.session.orgReturnTo;
        req.flash('redirect', req.session.message);
        delete req.session.message;
        delete req.session.orgReturnTo;
    }
    getClient(getClientId(req), function (props) {
        var params = Object.assign({}, { status: req.app.locals.getFlashStatus(req),
            context: req.query }, props);
        var elem = React.createElement(App_1.App, params, React.createElement(verify_1.Verify));
        res.locals.metaTags = {
            title: library_1.Library.META_DEFAULT_TITLE
        };
        res.render('index', {
            content: server_1.renderToString(elem),
            context: {}
        });
    });
});
/* function getClient(returnTo, next){

    if(!returnTo) return next({});
    var query = require('url').parse(returnTo, true).query;
    if(!query || !query.client_id)
       return next({});

    return Client.findOne({id: query.client_id}, {userid: 0, secret: 0}, function(err, client) {
        if (err || !client) { return null; }
        return next({client: client.toJSON()});
    });
} */
function getClientId(req) {
    if (req.session.returnTo) {
        var query = require('url').parse(req.session.returnTo, true).query;
        if (query && query.client_id)
            return query.client_id;
    }
    else if (req.query && req.query.client_id)
        return req.query.client_id;
    return null;
}
function getClient(clientid, next) {
    if (!clientid || clientid.length <= 0)
        return next({});
    return client_1.Client.findOne({ id: clientid }, { userid: 0, secret: 0 }, function (err, client) {
        if (err || !client) {
            return null;
        }
        return next({ client: client.toJSON() });
    });
}
module.exports = appRouter;
//# sourceMappingURL=AppRouter.js.map