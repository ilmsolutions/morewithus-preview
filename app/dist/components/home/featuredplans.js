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
var basecomponent_1 = require("../commons/basecomponent");
var transforms_1 = require("../../helpers/transforms");
var currency_1 = require("../main/currency");
require("../../helpers/date");
var FeaturedPlans = /** @class */ (function (_super) {
    __extends(FeaturedPlans, _super);
    function FeaturedPlans(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, { subscriptions: [] });
        _this._bind('renderPrice');
        return _this;
    }
    FeaturedPlans.prototype.componentDidMount = function () {
        var _this = this;
        this.getResource('settings.subscriptions').then(function (res) {
            //console.log(res);
            var subscriptions = JSON.parse(res.data.toString());
            _this.setState({
                subscriptions: subscriptions.map(transforms_1.transformSubscriptionDTO)
            });
        });
    };
    FeaturedPlans.prototype.render = function () {
        var _this = this;
        var subscriptions = this.state.subscriptions;
        var sortfn = function (a, b) {
            return a.price - b.price;
        };
        var renderSubscriptionSection = function (subscription, c, view) {
            var pdisplay = _this.renderPrice(subscription.ispromoted, subscription.price, subscription.promotionprice);
            /*             if(subscription.price > 0)
                          pdisplay = [...pdisplay
                                      , '/ ',  functions.toDisplayDuration(subscription.duration)];
             */
            return (view == 'image') ?
                React.createElement("img", { src: c.imageurl, className: 'img-fluid img-border', alt: subscription.usercontext + ' Image' }) :
                React.createElement("div", null,
                    React.createElement("h4", { className: 'mb-0' },
                        subscription.price > 0 ?
                            'As Low As ' : 'For ',
                        React.createElement("span", { className: 'h3 highlight' }, pdisplay)),
                    subscription.price > 0 && subscription.ispromoted ?
                        React.createElement("span", { className: 'text-muted' },
                            'Offer ends ' + new Date(subscription.promotionexpireson).toDisplay(),
                            " ") : '',
                    React.createElement("ul", { className: 'list-group mt-1 ' + c.type }, c.steps.map(function (step, i) {
                        //return <li key={i}><img className="img-fluid" src={step} alt={'step ' + (i+1)} /></li>;
                        return React.createElement("li", { key: i, className: "input-group" },
                            React.createElement("div", { className: "input-group-prepend" },
                                React.createElement("span", { className: "input-group-text" }, step.head)),
                            React.createElement("div", { className: "form-control" },
                                React.createElement("span", null,
                                    React.createElement("i", { className: step.icon }),
                                    step.label)));
                    })));
        };
        var renderSubscription = function (subscription, direction) {
            var c = featuredPlanConfig(subscription.usercontext);
            return (React.createElement("div", { className: 'card' },
                React.createElement("div", { className: 'card-body' },
                    React.createElement("div", { className: 'row mx-lg-0' },
                        React.createElement("div", { className: 'col-12 h3 d-md-flex justify-content-' +
                                (c.imageposition == 'left' ? 'start' : 'end') }, c.title),
                        React.createElement("div", { className: 'col-md-6 mr-lg-2em' }, renderSubscriptionSection(subscription, c, c.imageposition == 'left' ? 'image' : 'steps')),
                        React.createElement("div", { className: 'col-md-6 ml-lg-2em ' }, renderSubscriptionSection(subscription, c, c.imageposition == 'left' ? 'steps' : 'image'))))));
        };
        var renderFeature = function (feature, i) {
            return React.createElement("li", { key: i }, feature);
        };
        var featuredEmployeeSubscription = subscriptions ? subscriptions.filter(function (subscription) {
            return subscription.isfeatured == true && subscription.usercontext == 'Employer';
        }).sort(sortfn) : null;
        var featuredEmployerSubscription = subscriptions ? subscriptions.filter(function (subscription) {
            return subscription.isfeatured == true && subscription.usercontext == 'Employee';
        }).sort(sortfn) : null;
        return React.createElement("div", { className: 'row mx-lg-0 featured' },
            featuredEmployerSubscription && featuredEmployerSubscription.length > 0 ?
                renderSubscription(featuredEmployerSubscription[0]) : '',
            featuredEmployeeSubscription && featuredEmployeeSubscription.length > 0 ?
                renderSubscription(featuredEmployeeSubscription[0]) : '');
    };
    FeaturedPlans.prototype.renderPrice = function (ispromoted, price, promotionprice) {
        var prices = [];
        var formprice = (price > 0 ? React.createElement(currency_1.Currency, { value: price }) : 'Free');
        if (ispromoted == true && promotionprice < price) {
            var formpprice = (promotionprice > 0 ?
                React.createElement(currency_1.Currency, { value: promotionprice }) : 'Free');
            prices = [React.createElement("span", { className: 'strikethrough small mr-2 text-muted', key: 0 }, formprice),
                React.createElement("span", { key: 1 }, formpprice)];
        }
        else
            prices.push(React.createElement("span", { key: 0 }, formprice));
        return prices;
    };
    return FeaturedPlans;
}(basecomponent_1.BaseComponent));
exports.FeaturedPlans = FeaturedPlans;
function featuredPlanConfig(type) {
    switch (type) {
        case 'Employer':
            return {
                imageurl: '/assets/img/employer.jpg',
                imageposition: 'right',
                title: 'Employers'
                //, pricetitletemplate: 'As Low as {price}'
                //    , isteps: [
                //        '/assets/img/icons/1.png'
                //      , '/assets/img/icons/2.png'
                //      , '/assets/img/icons/3.png'
                //      , '/assets/img/icons/4.png'
                //    ]
                ,
                steps: [
                    { icon: 'icon-search', head: '1', label: 'Search Job Seekers Profile' },
                    { icon: 'icon-finder', head: '2', label: 'Review Profiles' },
                    { icon: 'icon-paypal', head: '3', label: 'Pay & View Contact Information' },
                    { icon: 'icon-user-check', head: '4', label: 'Hire Job Seeker' }
                ],
                type: 'employer'
            };
        case 'Employee':
            return {
                imageurl: '/assets/img/jobseeker.jpg',
                imageposition: 'left',
                title: 'Jobseekers and Contractors'
                //, pricetitletemplate: 'As Low as {price}'
                // , isteps: [
                //     '/assets/img/icons/5.png'
                //    , '/assets/img/icons/6.png'
                //    , '/assets/img/icons/7.png'
                //    , '/assets/img/icons/8.png'
                // ]
                ,
                steps: [
                    { icon: 'icon-user-plus', head: '1', label: 'Signup As Job Seeker' },
                    { icon: 'icon-profile', head: '2', label: 'Complete Your Profile' },
                    { icon: 'icon-bullhorn', head: '3', label: 'Get Found' },
                    { icon: 'icon-user-check', head: '4', label: 'Get Hired' }
                ],
                type: 'employee'
            };
    }
    ;
    return null;
}
//# sourceMappingURL=featuredplans.js.map