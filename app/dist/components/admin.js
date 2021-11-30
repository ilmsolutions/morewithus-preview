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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prop_types_1 = require("prop-types");
var authbasecomponent_1 = require("./commons/authbasecomponent");
var common_1 = require("../helpers/common");
var panel_1 = require("./administration/panel");
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(props) {
        var _this = _super.call(this, props) || this;
        _this.tabs = [
            { tag: 'jobtypes', label: 'Job Types' },
            { tag: 'subscriptions', label: 'Subscriptions' },
            { tag: 'emailnotifications', label: 'Email Notifications' },
            { tag: 'adverts', label: 'Ads' },
            { tag: 'rules', label: 'Rules' },
            { tag: 'users', label: 'User Report' },
            { tag: 'pages', label: 'Pages' },
            { tag: 'sociallogins', label: 'Social Logins' }
        ];
        _this.renderContent = function (tab, props) {
            return React.createElement(panel_1.Panel, { type: tab.tag });
            /*         switch(tab.tag){
                      case 'jobtypes':
                        return <Panel type={tab.tag} />;
                      case 'subscriptions':
                        return <div>Subscriptions</div>;
                    }
             */
        };
        _this.renderTabs = function (tab) {
            var clickHandler = this.clickTab;
            //console.log('in render tabs');
            //console.log(this.steps);
            //console.log(step);
            return this.tabs.map(function (d, itab) {
                return React.createElement("li", { key: 'tab-' + itab, className: 'parent' + ((d.tag == tab.tag) ? ' selected' : '') },
                    React.createElement("a", { href: '/auth/admin/' + d.tag, "data-tag": d.tag, onClick: clickHandler }, d.label));
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
        var _tabs = props.params.tab ? _this.tabs.filter(function (tab) {
            return tab.tag.toLowerCase() == props.params.tab.toLowerCase();
        }) : null, tab = _tabs ? _tabs[0] : _this.tabs[0];
        _this.state = Object.assign({}, props, { tab: tab,
            isAuthenticated: false,
            user: null });
        _this._bind('renderTabs', 'renderContent', 'clickTab', 'toggleContent', 'getResource');
        return _this;
    }
    Admin.prototype.render = function () {
        var _a = this.state, tab = _a.tab, user = _a.user, location = _a.location;
        var cprops = Object.assign({}, { location: location });
        return (React.createElement("div", { className: "wide-main-page row no-gutters row-offcanvas row-offcanvas-left" },
            React.createElement("nav", { className: "col-6 col-md-3 sidebar-offcanvas" },
                React.createElement("ul", { className: "list-group", id: "left-nav-tabs" }, this.renderTabs(tab))),
            React.createElement("main", { className: "col-12 col-md-9 exhibit" },
                this.renderContent(tab, cprops),
                React.createElement("span", { className: "nav-pane-toggle", title: "Show Exhibit Navigation", onClick: this.toggleContent },
                    React.createElement("i", { className: "fa fa-angle-left" })))));
    };
    Admin.contextTypes = {
        data: prop_types_1.PropTypes.oneOfType([prop_types_1.PropTypes.object, prop_types_1.PropTypes.array])
    };
    return Admin;
}(authbasecomponent_1.AuthBaseComponent));
exports.default = Admin;
//# sourceMappingURL=Admin.js.map