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
var prop_types_1 = require("prop-types");
var authbasecomponent_1 = require("./commons/authbasecomponent");
var main_1 = require("./search/main");
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, props, { isAuthenticated: false, user: null });
        _this._bind('getContext', 'getResource');
        return _this;
    }
    Search.prototype.componentDidMount = function () {
        var _this = this;
        //console.log('component did mount');
        var data = this.getContext().data;
        var iprops = (data && data.session) ? { isAuthenticated: data.session.isAuthenticated,
            user: data.session.user } :
            { isAuthenticated: false, user: null };
        if (iprops.isAuthenticated) {
            this.getResource('user').then(function (res) {
                var user = JSON.parse(res.data.toString());
                _this.setState({
                    isAuthenticated: iprops.isAuthenticated,
                    user: Object.assign({}, user)
                });
            });
        }
    };
    Search.prototype.render = function () {
        var _a = this.state, isAuthenticated = _a.isAuthenticated, user = _a.user;
        var hidePrivate = (isAuthenticated &&
            user && user.isactiveemployer ?
            false : true);
        //console.log(user);
        return React.createElement(main_1.Main, __assign({}, this.props, { hidePrivate: hidePrivate, isAuthenticated: isAuthenticated }));
    };
    Search.prototype.getContext = function () {
        if (!this.context.data) {
            if (typeof (window) !== 'undefined') {
                // console.log(window['_INITIAL_STATE']);            
                this.context.data = window['_INITIAL_STATE'] || { session: {} };
                //console.log(this.context.data);
            }
        }
        return this.context;
    };
    Search.contextTypes = {
        data: prop_types_1.PropTypes.oneOfType([prop_types_1.PropTypes.object, prop_types_1.PropTypes.array])
    };
    return Search;
}(authbasecomponent_1.AuthBaseComponent));
exports.Search = Search;
//# sourceMappingURL=search.js.map