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
var currency_1 = require("../../main/currency");
var common_1 = require("../../../helpers/common");
require("../../../helpers/string");
var types_1 = require("../../../helpers/types");
var usercontexts = Object.keys(types_1.UserContextTypeMap);
var Plans = /** @class */ (function (_super) {
    __extends(Plans, _super);
    function Plans(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.contextSwitch = _this.contextSwitch.bind(_this);
        _this.subscribeClick = _this.subscribeClick.bind(_this);
        _this.renderPrice = _this.renderPrice.bind(_this);
        return _this;
    }
    /*
          public componentWillReceiveProps(nextProps){
              let {selected} = this.props;
              if(selected == null || !selected.usercontext.equals(nextProps.selected.usercontext)){
                  this.setState({selected: {usercontext: nextProps.selected.usercontext}});
              }
          }
     */
    Plans.prototype.render = function () {
        var _this = this;
        var _a = this.props, subscriptions = _a.subscriptions, user = _a.user, selected = _a.selected;
        var contextSwitch = this.contextSwitch;
        var evalprops = function (plan) {
            switch (plan.state) {
                case 'current':
                    return { class: 'border-primary', behavior: React.createElement("span", { className: "btn btn-primary" },
                            React.createElement("i", { className: "fa fa-check" }),
                            " Active") };
                case 'upgrade':
                    return { class: '',
                        behavior: React.createElement("a", { href: "#", className: "btn btn-primary", "data-planid": plan.id, onClick: _this.subscribeClick }, "Upgrade") };
                case 'disable':
                    return { class: 'disabled',
                        behavior: '' };
                case 'free':
                    return {
                        class: 'border-primary',
                        behavior: ''
                    };
                case 'free-promotion':
                    return {
                        class: 'border-primary',
                        behavior: React.createElement("a", { href: "#", className: "btn btn-primary", "data-planid": plan.id, onClick: _this.subscribeClick }, "Subscribe")
                    };
                case 'enable':
                default:
                    return { class: '',
                        behavior: React.createElement("a", { href: "#", className: "btn btn-primary", "data-planid": plan.id, onClick: _this.subscribeClick }, "Subscribe") };
            }
        };
        var planCard = function (plan, i) {
            var props = evalprops(plan);
            var prices = _this.renderPrice(plan);
            //  console.log('plan card....');
            return React.createElement("div", { className: 'card ' + props.class, key: 'card-' + i },
                React.createElement("div", { className: "card-body" },
                    React.createElement("h6", null, plan.title),
                    React.createElement("p", { className: "card-text" }, plan.description),
                    React.createElement("ul", { className: "card-text" }, plan.features.map(function (feature, i) {
                        return React.createElement("li", { key: i }, feature);
                    })),
                    React.createElement("h6", { className: "display-4 text-center" }, prices.map(function (price, i) {
                        if (prices.length > 1 && i == 0)
                            return React.createElement("span", { className: 'strikethrough mr-2 small text-muted', key: i }, price);
                        else
                            return React.createElement("span", { key: i }, price);
                    })),
                    React.createElement("p", { className: 'card-text text-center' }, (plan.expirationdate) ?
                        ['Expires On: ', new Date(plan.expirationdate).toDisplay()] : ''),
                    React.createElement("p", { className: "card-text text-center" }, props.behavior)));
        };
        var togglecontext = selected ? types_1.UserContextTypeMap[usercontexts.filter(function (usercontext) {
            return !usercontext.equals(selected.usercontext);
        })[0]] : '';
        var fSubscriptions = subscriptions ? subscriptions.filter(function (subscription) {
            return subscription.usercontext.equals(selected.usercontext);
        }) : null;
        var subscriptionContent = fSubscriptions && selected ? user['isregistered' + selected.usercontext.toLowerCase()] ?
            fSubscriptions.map(planCard) :
            React.createElement("div", { className: "alert alert-warning" },
                "Please complete your",
                React.createElement("a", { className: "alert-link", href: '/auth/profile?usercontext=' + selected.usercontext },
                    ' ' + common_1.functions.translate(selected.usercontext) + ' ',
                    " Profile "),
                "before activating your subscription.")
            : 'No Subscriptions found.';
        return React.createElement("div", { className: "container" },
            React.createElement("h5", { className: "pl-1 pt-3" },
                [common_1.functions.translate(selected && selected.usercontext ? selected.usercontext :
                        (user ? user.usercontext : usercontexts[0])), ' Subscriptions'],
                React.createElement("a", { className: "mx-1 highlight small", href: '#', onClick: contextSwitch, "data-usercontext": togglecontext }, 'Select ' + common_1.functions.translate(togglecontext) + ' Subscriptions')),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "justify-content-center card-deck" }, subscriptionContent)));
    };
    Plans.prototype.contextSwitch = function (e) {
        var t = e.target, usercontext = t.dataset.usercontext;
        this.props.updateSelected({ usercontext: usercontext });
    };
    Plans.prototype.subscribeClick = function (e) {
        var b = e.target, pi = b.dataset.planid, selected = this.props.selected;
        selected.planid = pi;
        //format subscription to user item 
        this.props.nextStep({ selected: selected });
    };
    Plans.prototype.renderPrice = function (plan) {
        var cprice = plan.cprice, ispromoted = plan.ispromoted, price = plan.price, state = plan.state;
        var formattedprice = price && price != 0 ?
            React.createElement(currency_1.Currency, { value: price }) : (/free*/.test(state) ? 'Free' : '');
        var formattedcprice = cprice && cprice != 0 ?
            React.createElement(currency_1.Currency, { value: cprice }) : (/free*/.test(state) ? 'Free' : '');
        var prices = [];
        if (ispromoted && cprice < price) {
            //display price strikethrough with cprice
            //if cprice == 0 then mark as free else the dollar amount
            prices = [formattedprice, formattedcprice];
        }
        else {
            //display price or
            //mark as free
            prices = [formattedcprice];
        }
        return prices;
    };
    return Plans;
}(React.Component));
exports.Plans = Plans;
//# sourceMappingURL=plans.js.map