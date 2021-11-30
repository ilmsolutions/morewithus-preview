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
var axios_1 = require("axios");
var react_router_1 = require("react-router");
var customasynctypeahead_1 = require("./main/customasynctypeahead");
var featuredplans_1 = require("./home/featuredplans");
var advertisement_1 = require("./home/advertisement");
var seo_1 = require("./main/seo");
var library_1 = require("../helpers/library");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.dropDownOnChange = function (change) {
            //console.log(change);
            if (change && change.newValue) {
                var path = '/search/' + change.newValue;
                react_router_1.browserHistory.push(path);
            }
        };
        _this.dropDownOnChange = _this.dropDownOnChange.bind(_this);
        _this.getResource = _this.getResource.bind(_this);
        _this.state = Object.assign({}, _this.getInitialProps(), props);
        return _this;
    }
    Home.prototype.getInitialProps = function () {
        return {
            banner: {
                body: '',
                title: ''
            }
        };
    };
    Home.prototype.componentDidMount = function () {
        var data = this.getContext().data;
        if (data) {
            if (data.banner || data.metatags) {
                this.setState(data);
            }
        }
    };
    Home.prototype.render = function () {
        var _this = this;
        var _a = this.state, banner = _a.banner, metatags = _a.metatags;
        var DropDownChange = this.dropDownOnChange;
        var cards = [
            {
                title: 'Looking for a job or a contract?',
                icon: '/assets/img/icons/looking-job.png',
                description: library_1.Library.MSG_LOOKING_FOR_A_JOB + ' Register in three easy steps. And it is free!',
                action: React.createElement("a", { href: "/auth/profile?usercontext=employee", className: "btn btn-sm btn-primary", role: "button" }, "Jobseekers: Sign Up (Free!)")
            },
            {
                title: 'Looking to hire?',
                icon: '/assets/img/icons/hire.png',
                description: library_1.Library.MSG_LOOKING_TO_HIRE,
                action: React.createElement("a", { href: "/search/all", className: "btn btn-sm btn-secondary", role: "button" }, "Employers: Browse Jobseeker Profiles")
            }
            /*            , {
                         title: 'Another title',
                         description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
                         action: ''
                       } */
        ];
        return (React.createElement("div", { className: "container main-page" },
            React.createElement(seo_1.SEO, { metatags: metatags }),
            React.createElement("div", { className: "card front-banner" },
                React.createElement("img", { className: "card-img img-fluid", src: "/assets/img/bg-images/banner.jpg", alt: "Overlay image" }),
                React.createElement("div", { className: "card-img-overlay no-gutters" },
                    React.createElement("div", { className: "card-text" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-6 pr-md-5" },
                                React.createElement("span", { className: "h3 h3-custom" }, library_1.Library.MSG_HOME_SEARCH_TITLE),
                                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadMainSearch", name: "mainSearch", classes: "text-w-icon", selected: [], inputRef: "mainSearch", allowNew: true, multiple: false, minLength: 2, defaultOption: "\uF002 Search for the type of work you need.", getResource: function () { return _this.getResource('typeaheads.workareas_certifications_awards_keywords_skills'); }, onChange: DropDownChange }),
                                React.createElement("a", { href: "/search/all", className: "clearfix h6 highlight" }, "OR Browse all active job seeker profiles"))),
                        React.createElement("div", { className: "row d-none d-md-block" },
                            React.createElement("div", { className: "offset-md-6 col-md-6 pl-md-5" },
                                React.createElement("div", { className: "overlay-bg" },
                                    React.createElement("span", { className: "h3" }, library_1.Library.MSG_APP_TITLE),
                                    React.createElement("div", { className: "highlight", dangerouslySetInnerHTML: { __html: banner.body } }))))))),
            React.createElement("div", { className: "card-group" }, cards.map(function (card, i) {
                return React.createElement("div", { className: "card text-center", key: i },
                    React.createElement("div", { className: "card-body" },
                        React.createElement("img", { src: card.icon, className: "img-fluid" }),
                        React.createElement("p", { className: "h3 card-title" }, card.title),
                        React.createElement("p", { className: "card-text" }, card.description)),
                    React.createElement("div", { className: "card-footer" },
                        React.createElement("p", { className: "card-text" }, card.action)));
            })),
            React.createElement(featuredplans_1.FeaturedPlans, null),
            React.createElement(advertisement_1.Advertisement, null)));
    };
    ;
    Home.prototype.getResource = function (resource) {
        switch (true) {
            case /typeaheads\.\w+$/.test(resource):
                return axios_1.default.get('/api/external/authorization/' + resource);
            case /settings\.[\w\s,]+$/.test(resource):
                return axios_1.default.get('/api/external/authorization/' + resource, { params: { __cache: true } });
        }
    };
    Home.prototype.getContext = function () {
        if (!this.context.data) {
            if (typeof (window) !== 'undefined') {
                // console.log(window['_INITIAL_STATE']);            
                this.context.data = window['_INITIAL_STATE'] || { session: {} };
                //console.log(this.context.data);
            }
        }
        return this.context;
    };
    Home.contextTypes = {
        data: prop_types_1.PropTypes.oneOfType([prop_types_1.PropTypes.object, prop_types_1.PropTypes.array])
    };
    return Home;
}(React.Component));
exports.Home = Home;
//# sourceMappingURL=home.js.map