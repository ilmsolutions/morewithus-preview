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
var React = require("react");
var server_1 = require("react-dom/server");
var react_router_1 = require("react-router");
var routes_1 = require("../routes");
var datawrapper_1 = require("../components/datawrapper");
var statics_1 = require("./commons/statics");
var appRouter = express.Router();
appRouter.get('/*', function (req, res) {
    var ispopup = req.query.ispopup;
    var props = Object.assign({}, { banner: statics_1.Statics.get('banner'),
        socials: statics_1.Statics.get('socials'),
        metatags: statics_1.Statics.get('metatags'),
        hidenavigation: ispopup });
    react_router_1.match({ routes: routes_1.default, location: req.originalUrl }, function (err, redirectLocation, renderProps) {
        var type = (renderProps ? renderProps.params : { type: null }).type;
        var data = __assign({ session: {
                isAuthenticated: req.isAuthenticated(),
                user: req.user && req.user.profile ? req.user.profile : null
            } }, props);
        var html = render(renderProps, data);
        if (props.metatags && props.metatags.length > 0)
            res.locals.metaTags = type && props.metatags.filter(function (mt) {
                return type.toLowerCase() == mt.type.toLowerCase();
            })[0] || props.metatags[0];
        res.render('index', {
            content: html,
            context: data
        });
        /*this.retrieveLatestBills((err, data) => {
            if(!err) {
                const html = this.render(renderProps, data);

                res.render('index', {
                    content: html,
                    context: data
                });
            } else {
                res.status(500).send();
            }
        });*/
    });
});
function render(renderProps, data) {
    var additionalProps = { context: data };
    var elem = React.createElement(react_router_1.RouterContext, __assign({}, renderProps));
    var wrapper = React.createElement(datawrapper_1.default, __assign({}, additionalProps), elem);
    var html = server_1.renderToStaticMarkup(wrapper);
    return html;
}
module.exports = appRouter;
//# sourceMappingURL=app-router.js.map