"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        // set initial state
        _this.state = Object.assign({}, { isAuthenticated: false, user: null, collapseshow: false }, props.session, props.collapseshow);
        return _this;
    }
    Header.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return true;
    };
    Header.prototype.componentWillUpdate = function (nextProps, nextState) {
        // perform any preparations for an upcoming update
        //console.log('component will update');
    };
    Header.prototype.componentDidMount = function () {
        // console.log('header component did mount');
    };
    Header.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState(__assign({ collapseshow: nextProps.collapseshow }, nextProps.session));
    };
    Header.prototype.render = function () {
        var _this = this;
        var collapseshow = this.state.collapseshow;
        var navlinks = [
            { title: 'Home', url: this.props.root, icon: 'home' },
            { title: 'About Us', url: '/info/about us', icon: 'info-circle' },
            { title: 'How it Works?', url: '/info/how it works', icon: 'cogs' },
            { title: 'Other Services', url: '/info/other services', icon: 'ellipsis-h' }
        ];
        var renderlink = function (link, i) {
            return (React.createElement(react_router_1.Link, { key: i, to: link.url, className: "nav-link", activeClassName: "active" }, link.title));
        };
        if (this.state.isAuthenticated && this.state.user != null) {
            navlinks = navlinks.concat([{ title: this.state.user.email, url: '/auth/profile',
                    icon: 'circle' },
                { title: 'Logout', url: '/auth/logout', icon: 'sign-out' }]);
        }
        else {
            navlinks = navlinks.concat([{ title: 'Login', url: '/auth/login', icon: 'sign-in' }]);
        }
        return (React.createElement("nav", { className: "navbar navbar-expand-md bg-light fixed-top" },
            React.createElement(react_router_1.IndexLink, { to: this.props.root, className: "navbar-brand" },
                React.createElement("img", { src: "/assets/img/logo.png", className: "img-fluid" })),
            React.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarCollapse", "aria-controls": "navbarCollapse", "aria-expanded": "false", onClick: function (e) { _this.setState({ collapseshow: !collapseshow }); }, "aria-label": "Toggle navigation" },
                React.createElement("span", { className: "navbar-toggler-icon" })),
            React.createElement("div", { className: 'collapse navbar-collapse ' + (collapseshow ? 'show' : ''), id: "navbarCollapse" },
                React.createElement("nav", { className: "ml-auto navbar-nav" }, navlinks.map(renderlink)))));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=header.js.map