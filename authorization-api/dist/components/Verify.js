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
var react_1 = require("react");
var status_1 = require("./main/status");
var Verify = /** @class */ (function (_super) {
    __extends(Verify, _super);
    function Verify() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Verify.prototype.render = function () {
        var token = this.context.data.token;
        var heading = token ? React.createElement("h4", { className: 'heading' }, "Verify your email address below:") :
            React.createElement("div", { className: 'alert alert-warning' },
                React.createElement("strong", null, "Did not get the email verification request?"),
                React.createElement("span", { className: 'ml-1' }, "Request below to resend  it."));
        return (React.createElement("div", { className: "row background text-light" },
            React.createElement("div", { className: "col col-md-6 offset-md-3" },
                React.createElement("div", { className: "panel panel-dark verify-panel" },
                    React.createElement(status_1.Status, { classNames: 'lead', status: this.context.status.filter(function (status) {
                            return status.statusCode == 'redirect';
                        }) }),
                    React.createElement("div", { className: "panel-heading" }, heading),
                    React.createElement("div", { className: "panel-body" },
                        React.createElement("form", { method: "post", id: "validate-form" },
                            React.createElement("div", { className: "form-group col" },
                                React.createElement("label", { className: "sr-only" }, "Email"),
                                React.createElement("input", { type: "email", id: "inputEmail", name: "email", className: "form-control", placeholder: "Email" })),
                            React.createElement("input", { type: "hidden", id: "inputToken", name: "token", value: token }),
                            React.createElement("div", { className: "form-group col" },
                                token ?
                                    React.createElement("button", { className: "mx-2 btn btn-primary", name: "verify", formAction: "../api/verify", type: "submit" }, "Verify Email") : '',
                                React.createElement("button", { className: "mx-2 btn btn-sm btn-warning", name: "resend", formAction: "../api/resendverification", type: "submit" }, "Resend Verification Email")),
                            React.createElement(status_1.Status, { status: this.context.status.filter(function (status) {
                                    return status.statusCode == 'error';
                                }) })),
                        React.createElement(status_1.Status, { classNames: 'lead', status: this.context.status.filter(function (status) {
                                return status.statusCode == 'warn';
                            }) }))))));
    };
    Verify.contextTypes = {
        data: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array]),
        status: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array]),
        client: react_1.PropTypes.object
    };
    return Verify;
}(React.Component));
exports.Verify = Verify;
//# sourceMappingURL=verify.js.map