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
var basecomponent_1 = require("./commons/basecomponent");
var main_1 = require("./registration/main");
var main_2 = require("./subscriptions/main");
var changepassword_1 = require("./commons/changepassword");
var paymenthistory_1 = require("./commons/paymenthistory");
var common_1 = require("../helpers/common");
var Profile = /** @class */ (function (_super) {
    __extends(Profile, _super);
    function Profile(props) {
        var _this = _super.call(this, props) || this;
        _this.tabs = [
            { tag: 'profile', label: 'Profile', icon: 'fa-user' },
            { tag: 'changepassword', label: 'Change Password', icon: 'fa-key' },
            { tag: 'paymenthistory', label: 'Payment History', icon: 'fa-history' },
            { tag: 'subscriptions', label: 'Subscriptions', icon: 'fa-superpowers' }
        ];
        _this.renderContent = function (tab, props) {
            switch (tab.tag) {
                case 'profile':
                    return React.createElement(main_1.Main, __assign({}, props));
                case 'subscriptions':
                    return React.createElement(main_2.Main, __assign({}, props));
                case 'changepassword':
                    return React.createElement(changepassword_1.ChangePassword, __assign({}, props));
                case 'paymenthistory':
                    return React.createElement(paymenthistory_1.PaymentHistory, __assign({}, props));
            }
        };
        _this.renderTabs = function (tab) {
            var clickHandler = this.clickTab;
            //console.log('in render tabs');
            //console.log(this.steps);
            //console.log(step);
            return this.tabs.map(function (d, itab) {
                return React.createElement("li", { key: 'tab-' + itab, className: 'parent' + ((d.tag == tab.tag) ? ' selected' : '') },
                    React.createElement("a", { href: '/auth/profile/' + d.tag, "data-tag": d.tag, onClick: clickHandler }, [React.createElement("i", { key: 0, className: 'fa ' + d.icon }), ' ', d.label]));
            });
        };
        _this.clickTab = function (e) {
            var tag = e.target.getAttribute('data-tag');
            var tab = this.tabs.filter(function (tab) {
                return tab.tag == tag;
            });
            tab = tab ? tab[0] : this.tabs[0];
            this.toggleContent(e);
            this.setState({
                tab: tab
            });
        };
        _this.toggleContent = function (e) {
            var content = common_1.functions.findAncestor(e.target, 'row-offcanvas');
            if (content)
                content.classList.toggle('active');
        };
        // set initial state
        //this.state = props.session || {isAuthenticated: false, user: null};
        var _tabs = props.params.tab ? _this.tabs.filter(function (tab) {
            return tab.tag.toLowerCase() == props.params.tab.toLowerCase();
        }) : null, tab = _tabs ? _tabs[0] : _this.tabs[0];
        _this.state = Object.assign({}, _this.getInitialState(), props, { tab: tab });
        _this._bind('renderTabs', 'renderContent', 'clickTab', 'toggleContent');
        return _this;
    }
    Profile.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            tab: this.tabs[0],
            user: {}
        };
    };
    Profile.prototype.componentWillReceiveProps = function (nextProps) {
        //console.log('am in component will receive props');
    };
    Profile.prototype.componentWillMount = function () {
        //initialize context
        //console.log('profile will mount');
        if (!this.context.data) {
            if (typeof (window) !== 'undefined') {
                // console.log(window['_INITIAL_STATE']);            
                this.context.data = window['_INITIAL_STATE'] || { session: {} };
                //console.log(this.context.data);
            }
            else
                this.context.data = { session: {} };
        }
    };
    Profile.prototype.componentDidMount = function () {
        //console.log('am in component did mount');
    };
    Profile.prototype.render = function () {
        //const {session} = this.context.data;
        var _a = this.state, status = _a.status, message = _a.message, tab = _a.tab, user = _a.user, location = _a.location;
        var alert;
        var cprops = Object.assign({}, { location: location });
        //if(!session.user.isverified){
        //   opts['disabled'] = 'disabled';
        //    alert = <div className="alert alert-warning">Please verify your email address before continuing</div>
        //}
        return (React.createElement("div", { className: "wide-main-page row no-gutters row-offcanvas row-offcanvas-left" },
            React.createElement("nav", { className: "col-6 col-md-3 sidebar-offcanvas" },
                React.createElement("ul", { className: "list-group", id: "left-nav-tabs" }, this.renderTabs(tab))),
            React.createElement("main", { className: "col-12 col-md-9 exhibit" },
                this.renderContent(tab, cprops),
                React.createElement("span", { className: "nav-pane-toggle", title: "Show Exhibit Navigation", onClick: this.toggleContent },
                    React.createElement("i", { className: "fa fa-angle-left" })))));
    };
    ; /*render*/
    Profile.contextTypes = {
        data: prop_types_1.PropTypes.oneOfType([prop_types_1.PropTypes.object, prop_types_1.PropTypes.array])
    };
    return Profile;
}(basecomponent_1.BaseComponent));
exports.default = Profile;
//# sourceMappingURL=Profile.js.map