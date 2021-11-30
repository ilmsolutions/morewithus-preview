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
var ReactDOM = require("react-dom");
var scriptloadwrapper_1 = require("../commons/scriptloadwrapper");
var BasePaypalButton = /** @class */ (function (_super) {
    __extends(BasePaypalButton, _super);
    function BasePaypalButton(props) {
        var _this = _super.call(this, props) || this;
        window.React = React;
        window.ReactDOM = ReactDOM;
        _this.state = Object.assign({}, _this.getInitialState(), props, { loadstatus: '' });
        return _this;
    }
    BasePaypalButton.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            amount: 0,
            currency: 'USD'
        };
    };
    BasePaypalButton.prototype.componentDidMount = function () {
        var _this = this;
        this.props.onLoad(function () {
            _this.setState({ loadstatus: 'ready' });
        }, function (err) {
            //console.log('there was an error', err);  
            _this.props.onFailure({ status: false, message: 'Load Error: ' + err });
        });
    };
    BasePaypalButton.prototype.componentWillUnmount = function () {
    };
    BasePaypalButton.prototype.render = function () {
        var _a = this.state, loadstatus = _a.loadstatus, amount = _a.amount, currency = _a.currency;
        var _b = this.props, env = _b.env, apikey = _b.apikey, onSuccess = _b.onSuccess, onFailure = _b.onFailure;
        var renderPayPalButton = function () {
            var _a;
            var client = (_a = {},
                _a[env] = apikey,
                _a);
            var payment = function (data, actions) {
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: amount, currency: currency }
                            }
                        ]
                    }
                });
            };
            var onAuthorize = function (data, actions) {
                //console.log('on authorize....');
                //console.log(actions);
                //console.log(data);
                return actions.payment.execute().then(function (res) {
                    //window.alert('Payment Complete!');
                    //console.log('in execute success');
                    //console.log(res);
                    if (res.state == 'approved' && onSuccess)
                        onSuccess(data);
                }).catch(function (res) {
                    //console.log('error handler');
                    //console.log(res);
                    if (onFailure)
                        onFailure({ status: false, message: 'Payment could not be executed. Please try again!' });
                });
            };
            var onCancel = function (data) {
                //console.log('The payment was cancelled!');
                if (onFailure)
                    onFailure({ status: false, message: 'The payment was cancelled.' });
            };
            var onError = function (data) {
                if (onFailure)
                    onFailure({ status: false, message: 'Error occurred while loading files.' });
            };
            //  let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
            return React.createElement(paypal.Button.react, { env: env, client: client, payment: payment, commit: true, onAuthorize: onAuthorize, onCancel: onCancel, onError: onError });
        };
        return React.createElement("span", null, (loadstatus == 'ready') ?
            renderPayPalButton() : '');
    };
    return BasePaypalButton;
}(React.Component));
exports.PaypalButton = scriptloadwrapper_1.ScriptLoadWrapper({ paypal: 'https://www.paypalobjects.com/api/checkout.js' }, BasePaypalButton);
//# sourceMappingURL=paypalbutton.js.map