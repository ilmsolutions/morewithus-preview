"use strict";
var express = require("express");
var oauth2 = require("../policies/oauth2");
var local = require("../policies/local-signin");
var library_1 = require("../utils/library");
var App_1 = require("../components/App");
var Decision_1 = require("../components/Decision");
var React = require("react");
var server_1 = require("react-dom/server");
var appRouter = express.Router();
appRouter.post('/login', local.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '../login',
    failureFlash: true
}));
appRouter.get('/authorize', oauth2.authorization, function (req, res) {
    var data = {
        transactionId: req.oauth2.transactionID,
        user: req.user,
        client: req.oauth2.client
    };
    var elem = React.createElement(App_1.App, { context: data }, React.createElement(Decision_1.Decision));
    res.locals.metaTags = {
        title: library_1.Library.META_DEFAULT_TITLE
    };
    res.render('index', {
        content: server_1.renderToString(elem),
        context: {}
    });
});
appRouter.post('/decision', oauth2.decision);
appRouter.post('/token', oauth2.token);
appRouter.get('/logout', function (req, res) {
    var returnTo = req.query.returnTo;
    req.logout();
    req.session.destroy(function () {
        return res.redirect(returnTo);
    });
});
module.exports = appRouter;
//# sourceMappingURL=AuthAppRouter.js.map