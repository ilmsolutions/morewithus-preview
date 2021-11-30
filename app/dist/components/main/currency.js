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
var Currency = /** @class */ (function (_super) {
    __extends(Currency, _super);
    function Currency(props) {
        return _super.call(this, props) || this;
    }
    Currency.prototype.render = function () {
        var value = this.props.value;
        var rendervalue = function (v) {
            var fvalue = Number(v).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }).split('.');
            return [fvalue[0], (fvalue[1] ? '.' : ''), (fvalue[1] ? React.createElement("span", { className: 'smaller', key: 0 }, fvalue[1]) : '')];
        };
        return (React.createElement("span", null, !isNaN(value) ? rendervalue(value) : ''));
    };
    return Currency;
}(React.Component));
exports.Currency = Currency;
//# sourceMappingURL=currency.js.map