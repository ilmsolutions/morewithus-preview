"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//load global css
require("./assets/css/offcanvas.css");
require("./assets/css/styles.css");
var React = require("react");
var react_router_1 = require("react-router");
var app_1 = require("./components/app");
var home_1 = require("./components/home");
//import {Profile} from './components/profile';
var search_1 = require("./components/search");
//import {Admin} from './components/admin';
var infopage_1 = require("./components/infopage");
var contactus_1 = require("./components/home/contactus");
function forceServerLoad(nextState, replaceState) {
    //console.log('what does this do');    
    if (typeof (window) !== 'undefined')
        window.location.reload();
    return;
}
var prevpath = null;
function onUpdate() {
    var _a = this.state, params = _a.params, location = _a.location;
    if (prevpath == null || prevpath != location.pathname) {
        if (typeof window['gtag'] === 'function') {
            //console.log('getting in here');
            window['gtag']('config', 'UA-115293608-1');
        }
    }
    prevpath = location.pathname;
}
/*
if(typeof(window) !== 'undefined')
browserHistory.listen((location) => {
    console.log('in browser history');
});
*/
if (typeof require.ensure !== 'function')
    require.ensure = function (d, c) { return c(require); };
exports.default = (React.createElement(react_router_1.Router, { onUpdate: onUpdate, history: react_router_1.browserHistory },
    React.createElement(react_router_1.Route, { path: "/", component: app_1.App },
        React.createElement(react_router_1.IndexRoute, { component: home_1.Home }),
        React.createElement(react_router_1.Route, { path: "/search/:query", component: search_1.Search }),
        React.createElement(react_router_1.Route, { path: "/info/:type", component: infopage_1.InfoPage }),
        React.createElement(react_router_1.Route, { path: "/contactus", component: contactus_1.ContactUs }),
        React.createElement(react_router_1.Route, { path: "auth" },
            React.createElement(react_router_1.Route, { path: "/auth/login", onEnter: forceServerLoad }),
            React.createElement(react_router_1.Route, { path: "/auth/profile(/:tab)", getComponent: function (location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require('./components/profile').default);
                    });
                } }),
            React.createElement(react_router_1.Route, { path: "/auth/logout", onEnter: forceServerLoad }),
            React.createElement(react_router_1.Route, { path: "/auth/search/:query", component: search_1.Search }),
            React.createElement(react_router_1.Route, { path: "/auth/admin(/:tab)", getComponent: function (location, callback) {
                    require.ensure([], function (require) {
                        callback(null, require('./components/admin').default);
                    });
                } })))));
//# sourceMappingURL=routes.js.map