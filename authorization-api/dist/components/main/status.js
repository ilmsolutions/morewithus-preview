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
var Status = /** @class */ (function (_super) {
    __extends(Status, _super);
    function Status(props) {
        return _super.call(this, props) || this;
        // set initial state
    }
    Status.prototype.render = function () {
        var _this = this;
        var r = this.props.status.map(function (sts, i) {
            var alertClass;
            switch (sts.statusCode) {
                case 'error':
                case 'warn':
                    alertClass = 'alert-danger';
                    break;
                case 'redirect':
                default:
                    alertClass = 'alert-info';
                    break;
            }
            return (React.createElement("div", { className: 'alert ' + alertClass + ' ' + _this.props.classNames, key: i }, sts.statusMessages.join(' ')));
        });
        return React.createElement("div", { className: "status" }, r);
    };
    return Status;
}(React.Component));
exports.Status = Status;
//# sourceMappingURL=status.js.map