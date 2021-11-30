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
var paypalbutton_1 = require("../../main/paypalbutton");
var currency_1 = require("../../main/currency");
var library_1 = require("../../../helpers/library");
require("../../../helpers/date");
require("../../../helpers/string");
var Confirm = /** @class */ (function (_super) {
    __extends(Confirm, _super);
    function Confirm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState(), props);
        _this.onFailure = _this.onFailure.bind(_this);
        _this.onSuccess = _this.onSuccess.bind(_this);
        _this.onActivate = _this.onActivate.bind(_this);
        return _this;
    }
    Confirm.prototype.getInitialState = function () {
        return {
            status: true,
            message: ''
        };
    };
    Confirm.prototype.render = function () {
        var _this = this;
        var _a = this.state, subscriptions = _a.subscriptions, paypal = _a.paypal, selected = _a.selected, previousStep = _a.previousStep, status = _a.status, message = _a.message;
        var renderPlan = function () {
            var subscription = subscriptions ? subscriptions.filter(function (subscription) {
                return subscription.id == selected.planid;
            }) : null;
            selected.plan = subscription ? subscription[0] : null;
            var activate = selected.plan.cprice > 0 ? React.createElement("div", null,
                React.createElement(paypalbutton_1.PaypalButton, __assign({}, paypal, { amount: selected.plan.cprice, onSuccess: _this.onSuccess, onFailure: _this.onFailure })),
                React.createElement("span", { className: 'small text-muted' }, library_1.Library.MSG_PAYPAL_PAYMENT_INFO))
                : React.createElement("a", { href: '#', className: 'btn btn-primary', onClick: _this.onActivate }, "Activate");
            var date = new Date();
            return selected.plan ? React.createElement("div", { className: 'card' },
                React.createElement("div", { className: "card-body" },
                    React.createElement("h5", null,
                        selected.plan.usercontext
                            + ' Subscriptions: '
                            + selected.plan.title,
                        React.createElement("small", null,
                            React.createElement("a", { href: "#", className: "ml-1", onClick: previousStep }, "(Select another plan)"))),
                    React.createElement("p", { className: "card-text" }, selected.plan.description),
                    React.createElement("ul", { className: "card-text" }, selected.plan.features.map(function (feature, i) {
                        return React.createElement("li", { key: i }, feature);
                    })),
                    React.createElement("h6", { className: "display-4 text-center" },
                        React.createElement(currency_1.Currency, { value: selected.plan.cprice })),
                    React.createElement("p", { className: "card-text text-center" },
                        "Expires On: ",
                        selected.plan.expirationdate.toDisplay()),
                    React.createElement("div", { className: "card-text text-center" }, activate))) : 'Invalid Plan selected.';
        };
        var renderStatus = function (status, message) {
            return (message ? React.createElement("div", { className: 'alert ' + (status == true ?
                    'alert-success' : 'alert-danger') }, message) : '');
        };
        return React.createElement("div", { className: "container" },
            renderPlan(),
            renderStatus(status, message));
    };
    Confirm.prototype.onFailure = function (data) {
        this.setState(data);
    };
    Confirm.prototype.onActivate = function (e) {
        this.onSuccess({
            orderamount: 0
        });
    };
    Confirm.prototype.onSuccess = function (data) {
        var nextStep = this.props.nextStep;
        var selected = this.state.selected;
        if (nextStep && data) {
            //  console.log(data);
            nextStep(Object.assign({}, {
                usercontext: selected.usercontext,
                planid: selected.plan.id,
                orderid: data.orderID,
                orderamount: selected.plan.cprice,
                paymenttoken: data.paymentToken,
                payerid: data.payerID,
                paymentid: data.paymentID,
                paymentdate: Date.now(),
                startdate: selected.plan.startdate,
                expirationdate: selected.plan.expirationdate
            }));
        }
    };
    return Confirm;
}(React.Component));
exports.Confirm = Confirm;
//# sourceMappingURL=confirm.js.map