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
var axios_1 = require("axios");
var authbasecomponent_1 = require("../commons/authbasecomponent");
var datagrid_1 = require("../main/datagrid");
var transforms_1 = require("../../helpers/transforms");
var PaymentHistory = /** @class */ (function (_super) {
    __extends(PaymentHistory, _super);
    function PaymentHistory(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState());
        return _this;
    }
    PaymentHistory.prototype.componentDidMount = function () {
        var _this = this;
        //axios.get('/api/auth/external/authorization/user')
        //console.log('subscriptions mount');
        axios_1.default.all([
            this.getResource('user?include=subscriptions'),
            this.getResource('settings.subscriptions')
        ]).then(function (results) {
            var user = JSON.parse(results[0].data.toString());
            //let subscriptions = results[1].data;
            var subscriptions = JSON.parse(results[1].data.toString());
            //console.log(user);
            //console.log(subscriptions);
            _this.setState({
                user: user,
                subscriptions: subscriptions.map(transforms_1.transformSubscriptionDTO).filter(function (subscription) {
                    return subscription.usertype.indexOf(user.usertype) >= 0;
                })
            });
        });
    };
    PaymentHistory.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            step: 1,
            user: null,
            type: 'paymenthistory',
            subscriptions: []
        };
    };
    PaymentHistory.prototype.render = function () {
        var _a = this.state, type = _a.type, user = _a.user;
        var columnDefs = this.getColumnDefs(type);
        return (React.createElement("div", { className: 'container' },
            React.createElement("h5", { className: 'pl-3 pt-3' }, "Payment History"),
            React.createElement("div", { className: 'container' }, user ? React.createElement(datagrid_1.DataGrid, { columndefs: columnDefs, type: type, rows: user.subscriptions }) : React.createElement("span", null, "Loading...."))));
    };
    PaymentHistory.prototype.getColumnDefs = function (type) {
        switch (true) {
            case /paymenthistory/.test(type):
                var rplan = renderplanname.bind(this.state.subscriptions);
                return [
                    { key: 'orderid', name: 'Order ID', cell: renderValue },
                    { key: 'paymentid', name: 'Payment ID', cell: renderValue },
                    { key: 'paymentdate', name: 'Payment Date', cell: renderdate },
                    { key: 'usercontext', name: 'Plan Type' },
                    { key: 'planid', name: 'Plan', cell: rplan },
                    { key: 'orderamount', name: 'Amount Paid', cell: rendercurrency },
                    { key: 'isexpired', name: 'Active', cell: renderboolean }
                ];
        }
        function renderValue(item, key) {
            return item[key] ? item[key] : 'None';
        }
        function renderplanname(item, key) {
            var subscriptions = this;
            var subscription = subscriptions ? subscriptions.filter(function (subscription) {
                return subscription.id == item[key];
            }) : null;
            return subscription && subscription[0] ? subscription[0].title : '-';
        }
        function renderdate(item, key) {
            return new Date(item[key]).toDisplay();
        }
        function renderboolean(item, key) {
            return item[key] ? React.createElement("i", { className: 'fa fa-close' }) :
                React.createElement("i", { className: 'fa fa-check' });
        }
        function rendercurrency(item, key) {
            return item[key] >= 0 ? item[key].toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            }) : '-';
        }
    };
    return PaymentHistory;
}(authbasecomponent_1.AuthBaseComponent));
exports.PaymentHistory = PaymentHistory;
//# sourceMappingURL=paymenthistory.js.map