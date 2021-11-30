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
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Login.prototype.render = function () {
        var client = this.context.client;
        var urltemplate = '/{page}' + (client ? '?client_id=' + client.id : '');
        return (React.createElement("div", { className: "row background text-light" },
            React.createElement("div", { className: "col col-md-6 offset-md-3" },
                React.createElement("div", { className: "panel panel-dark login-panel" },
                    React.createElement("div", { className: "panel-heading" },
                        React.createElement("h3", { className: "heading" }, "Please Sign In")),
                    React.createElement("div", { className: "panel-body" },
                        React.createElement("form", { method: "post", id: "validate-form", action: "../auth/login" },
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "sr-only" }, "Email address"),
                                React.createElement("input", { type: "email", id: "inputEmail", name: "email", className: "form-control", placeholder: "Email address" })),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "sr-only" }, "Password"),
                                React.createElement("input", { type: "password", id: "inputPassword", name: "password", className: "form-control", placeholder: "Password" })),
                            React.createElement("div", { className: "row ml-lg-0 form-group" },
                                React.createElement("div", { className: "col custom-control custom-checkbox" },
                                    React.createElement("input", { type: "checkbox", className: "custom-control-input", id: "rememberMe", value: "remember-me" }),
                                    React.createElement("label", { className: "custom-control-label", htmlFor: "rememberme" }, "Remember me")),
                                React.createElement("a", { href: urltemplate.replace('{page}', 'forgot'), className: 'col d-flex justify-content-end highlight' }, "Forgot Password")),
                            React.createElement("button", { className: "btn btn-lg btn-primary btn-block", type: "submit" }, "Sign in"),
                            React.createElement(status_1.Status, { status: this.context.status })),
                        React.createElement("div", { className: "text-center mt-2" }, [
                            'Not Registered? ',
                            React.createElement("a", { key: 0, className: "highlight", href: urltemplate.replace('{page}', 'signup') }, "Sign Up Here")
                        ]))))));
    };
    Login.contextTypes = {
        data: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array]),
        status: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array]),
        client: react_1.PropTypes.object
    };
    return Login;
}(React.Component));
exports.Login = Login;
//# sourceMappingURL=login.js.map