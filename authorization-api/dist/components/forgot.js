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
var Forgot = /** @class */ (function (_super) {
    __extends(Forgot, _super);
    function Forgot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Forgot.prototype.render = function () {
        var _a = this.context, client = _a.client, data = _a.data;
        var token = data && data.token ? data.token : null;
        var success = data && data.success ? data.success : null;
        var heading = token ? React.createElement("h4", { className: 'heading' }, "Reset your password below:") :
            React.createElement("div", { className: 'alert alert-warning' },
                React.createElement("strong", null, "Did not get the password reset request?"),
                React.createElement("span", { className: 'ml-1' }, "Request below to resend  it."));
        var renderForm = React.createElement("form", { method: "post", id: "validate-form" },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { className: "sr-only" }, "Email"),
                React.createElement("input", { type: "email", id: "inputEmail", name: "email", className: "form-control", placeholder: "Email" })),
            token ?
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "sr-only" }, "New Password"),
                    React.createElement("input", { type: "password", id: "inputPassword", name: "npassword", className: "form-control", placeholder: "Password" }))
                : '',
            React.createElement("input", { type: "hidden", id: "inputToken", name: "token", value: token }),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { className: "btn btn-primary", name: "verify", formAction: "../api/forgot", type: "submit" }, !token ? 'Send Reset Email' : 'Reset Password')),
            React.createElement(status_1.Status, { status: this.context.status.filter(function (status) {
                    return status.statusCode == 'error';
                }) }));
        var renderContent = (success) ?
            React.createElement(status_1.Status, { classNames: 'lead', status: this.context.status.filter(function (status) {
                    return status.statusCode == 'info';
                }) }) :
            renderForm;
        return (React.createElement("div", { className: "row background text-light" },
            React.createElement("div", { className: "col col-md-6 offset-md-3" },
                React.createElement("div", { className: "panel panel-dark forgot-panel" },
                    React.createElement(status_1.Status, { classNames: 'lead', status: this.context.status.filter(function (status) {
                            return status.statusCode == 'redirect';
                        }) }),
                    React.createElement("div", { className: "panel-heading" },
                        React.createElement("h3", null, "Reset Password")),
                    React.createElement("div", { className: "panel-body" },
                        renderContent,
                        React.createElement(status_1.Status, { classNames: 'lead', status: this.context.status.filter(function (status) {
                                return status.statusCode == 'warn';
                            }) }))))));
    };
    Forgot.contextTypes = {
        data: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array]),
        status: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array]),
        client: react_1.PropTypes.object
    };
    return Forgot;
}(React.Component));
exports.Forgot = Forgot;
//# sourceMappingURL=forgot.js.map