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
//import {PropTypes} from 'react';
var react_router_1 = require("react-router");
var axios_1 = require("axios");
var react_transition_group_1 = require("react-transition-group");
var basecomponent_1 = require("../commons/basecomponent");
var customasynctypeahead_1 = require("../main/customasynctypeahead");
var filtermenu_1 = require("./filtermenu");
var results_1 = require("./results");
function contains(a1, a2) {
    //console.log(a1);
    //console.log(a2);
    if (a1 == null || a1.length <= 0)
        return [];
    if (a2 == null || a2.length <= 0)
        return a1;
    return [].concat(a1).filter(function (n) { return a2.includes(n); });
}
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, { query: props.params.query,
            showfilterMenu: false, filters: {},
            view: 'list', detailid: null,
            hidePrivate: props.hidePrivate,
            isAuthenticated: props.isAuthenticated
        });
        _this._bind('getResource', 'HandleKeyDown', 'DropDownChange', 'getSearchResults', 'switchView', 'applyFilters', 'toggleFilterMenu');
        return _this;
    }
    Main.prototype.componentDidMount = function () {
        var _a = this.state, query = _a.query, hidePrivate = _a.hidePrivate;
        this.getSearchResults(query, hidePrivate);
        // navigator.geolocation.getCurrentPosition((pos) =>{
        //        console.log(pos);
        // }, (err) => {
        //   console.log(err.message);
        // }, {
        //     enableHighAccuracy: true,
        //     timeout: 10000,
        //     maximumAge: 0
        // });
    };
    Main.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.state, hidePrivate = _a.hidePrivate, isAuthenticated = _a.isAuthenticated, query = _a.query;
        if (hidePrivate != nextProps.hidePrivate ||
            isAuthenticated != nextProps.isAuthenticated) {
            this.getSearchResults(query, nextProps.hidePrivate);
            this.setState({ hidePrivate: nextProps.hidePrivate,
                isAuthenticated: nextProps.isAuthenticated });
        }
    };
    Main.prototype.render = function () {
        var _this = this;
        var _a = this.state, query = _a.query, filters = _a.filters, view = _a.view, detailid = _a.detailid, showfilterMenu = _a.showfilterMenu, result = _a.result;
        var _b = this.state, hidePrivate = _b.hidePrivate, isAuthenticated = _b.isAuthenticated, users = _b.users;
        //filter users
        //console.log(users);
        users = this.filterUsers(users, filters);
        var message = (users && users.length > 0) ?
            ['Search returned', React.createElement("strong", { className: 'mx-1', key: 'search-count' }, users.length), 'results']
                .concat((result.location) ? [' near', React.createElement("strong", { className: 'mx-1', key: 'search-location' }, result.location), '.'] : ['.']) :
            'No results found.';
        var header = (view == 'detail') ?
            React.createElement("a", { href: "#search-results", className: "back-to-search-results", "data-view": "list", onClick: function () { return _this.switchView({ view: 'list', detailid: null }); } },
                React.createElement("i", { className: "pull-left fa  fa-chevron-left" }),
                " Back to Search Results") : message;
        return React.createElement("div", { className: "container" },
            React.createElement("div", { className: "pt-3 pb-2 container bg-primary text-white" },
                React.createElement("div", { className: "row justify-content-center" },
                    React.createElement("div", { className: "col-lg-3" },
                        React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadMainSearch", name: "mainSearch", selected: [query], ref: "mainSearchWrapper", inputRef: "mainSearch", allowNew: true, multiple: false, minLength: 2, defaultOption: "Search for the type of work you need.", getResource: function () { return _this.getResource('typeaheads.workareas_certifications_awards_keywords_skills'); }, onChange: this.DropDownChange })),
                    React.createElement("div", { className: "col-lg-1" }, "near"),
                    React.createElement("div", { className: "col-lg-3" },
                        React.createElement("input", { type: "text", className: "form-control", id: "inputAddress", placeholder: "Enter City, State or ZIP", ref: "address", name: "address", onKeyDown: this.HandleKeyDown })),
                    React.createElement("div", { className: "col-lg-2" },
                        React.createElement("a", { className: "link", onClick: this.toggleFilterMenu }, (showfilterMenu) ? ['Less Filters ', React.createElement("i", { className: 'fa fa-angle-up', key: 'icon' })] :
                            ['More Filters ', React.createElement("i", { className: 'fa fa-angle-down', key: 'icon' })]))),
                React.createElement(react_transition_group_1.CSSTransition, { classNames: "collapseslide", timeout: { enter: 500, exit: 300 } },
                    React.createElement(filtermenu_1.FilterMenu, { cardclass: "bg-primary border-0", show: showfilterMenu, filters: filters, applyFilters: this.applyFilters }))),
            React.createElement("div", { key: 'container-' + view, className: "container " + view, "data-name": "search-results" },
                React.createElement("div", { className: "col justify-content-start" }, header),
                React.createElement(react_transition_group_1.CSSTransition, { classNames: "slide", timeout: { enter: 500, exit: 300 } },
                    React.createElement(results_1.Results, { users: users, hidePrivate: hidePrivate, isAuthenticated: isAuthenticated, view: view, detailid: detailid, getProtectedResource: this.getProtectedResource, triggerSwitch: this.switchView }))));
    };
    Main.prototype.DropDownChange = function (e) {
        var hidePrivate = this.state.hidePrivate;
        var address = this.refs['address'];
        this.getSearchResults(e.newValue, hidePrivate, { near: address.value });
    };
    Main.prototype.HandleKeyDown = function (e) {
        if (e.keyCode !== 13)
            return;
        var hidePrivate = this.state.hidePrivate;
        var target = e.target, address = e.target.value, query = this.refs['mainSearchWrapper'].state.selected;
        this.getSearchResults(query, hidePrivate, { near: address });
    };
    Main.prototype.getSearchResults = function (query, hidePrivate, opts) {
        var _this = this;
        if (query == null || query.length <= 0)
            return;
        var near = opts && opts.near ? 'near=' + opts.near : '';
        react_router_1.browserHistory.push((!hidePrivate ? '/auth' : '') + '/search/' + query + '?' + near);
        this.getResource('users?query=' + query + '&' + near, hidePrivate)
            .then(function (res) {
            var data = JSON.parse(res.data.toString());
            _this.setState({
                status: true,
                message: '',
                users: data.users,
                view: 'list',
                detailid: null,
                result: data.result
            });
        });
    };
    Main.prototype.applyFilters = function (filters) {
        // console.log('in main apply filters');
        // console.log(filters);
        this.setState({
            filters: filters,
            showfilterMenu: false,
            view: 'list',
            detailid: null
        });
    };
    ;
    Main.prototype.filterUsers = function (users, filters) {
        var _users = users;
        var _keys = Object.keys(filters);
        for (var i = 0; i < _keys.length; i++) {
            if (_users == null || _users.length <= 0)
                break;
            var _filter = _keys[i];
            if (filters[_filter].length > 0) {
                _users = _users.filter(function (user) {
                    return contains(user[_filter], filters[_filter].split(',')).length > 0;
                });
            }
        }
        return _users;
    };
    Main.prototype.toggleFilterMenu = function (e) {
        var showfilterMenu = this.state.showfilterMenu;
        this.setState({ showfilterMenu: !showfilterMenu });
    };
    Main.prototype.switchView = function (change) {
        window.scrollTo(0, 0);
        this.setState(change);
    };
    Main.prototype.getResource = function (resource, hidePrivate) {
        if (hidePrivate === void 0) { hidePrivate = true; }
        var baseurl = !hidePrivate ? '/api/auth' : '/api';
        return axios_1.default.get(baseurl + '/external/authorization/' + resource);
    };
    Main.prototype.getProtectedResource = function (resource) {
        //console.log('getting here...' + resource);
        return axios_1.default.get('/api/auth/external/authorization/' + resource);
    };
    return Main;
}(basecomponent_1.BaseComponent));
exports.Main = Main;
//# sourceMappingURL=main.js.map