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
var popup = "javascript:window.open('{url}', '{title}', 'width=500,height=250');";
var Signup = /** @class */ (function (_super) {
    __extends(Signup, _super);
    function Signup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Signup.prototype.componentDidMount = function () {
    };
    Signup.prototype.render = function () {
        var client = this.context.client;
        return (React.createElement("div", { className: "row background text-light" },
            React.createElement("div", { className: "col col-md-6 offset-md-3" },
                React.createElement("div", { className: "panel panel-dark signup-panel" },
                    React.createElement("div", { className: "panel-heading" },
                        React.createElement("h3", { className: "heading" }, "Please Sign Up")),
                    React.createElement("div", { className: "panel-body" },
                        React.createElement("form", { method: "post", id: "validate-form", action: "../api/signup" },
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "sr-only" }, "First Name"),
                                React.createElement("input", { type: "text", id: "inputFirstName", name: "firstname", className: "form-control", placeholder: "First Name" })),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "sr-only" }, "Last Name"),
                                React.createElement("input", { type: "text", id: "inputLastName", name: "lastname", className: "form-control", placeholder: "Last Name" })),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "sr-only" }, "Email address"),
                                React.createElement("input", { type: "email", id: "inputEmail", name: "email", className: "form-control", placeholder: "Email address" })),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "sr-only" }, "Password"),
                                React.createElement("input", { type: "password", id: "inputPassword", name: "password", className: "form-control", placeholder: "Password" })),
                            React.createElement("div", { className: "custom-control custom-checkbox" },
                                React.createElement("input", { type: "checkbox", className: "custom-control-input", id: "inputTermsandConditions", name: "checktermsandconditions", value: "option1" }),
                                React.createElement("label", { className: "custom-control-label", htmlFor: "inputTermsandConditions" }, ['I accept the ',
                                    React.createElement("a", { key: 0, className: "highlight", target: '_blank', href: popup.replace('{url}', client ? client.baseuri + '/info/terms?ispopup=true' : '#')
                                            .replace('{title}', 'Terms & Conditions') }, "Terms & Conditions"),
                                    ' and ',
                                    React.createElement("a", { key: 1, className: "highlight", target: '_blank', href: popup.replace('{url}', client ? client.baseuri + '/info/privacy%20policy?ispopup=true' : '#')
                                            .replace('{title}', 'Privacy Statement') }, "Privacy Statement")
                                ])),
                            React.createElement("button", { className: "btn btn-lg btn-primary btn-block", type: "submit" }, "Sign Up"),
                            React.createElement(status_1.Status, { status: this.context.status }),
                            React.createElement("div", { className: "text-center mt-2" }, [
                                'Already Registered? ',
                                React.createElement("a", { key: 0, className: "highlight", href: "/login" }, "Login Here")
                            ])))))));
    };
    Signup.contextTypes = {
        data: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array]),
        status: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array]),
        client: react_1.PropTypes.object
    };
    return Signup;
}(React.Component));
exports.Signup = Signup;
//# sourceMappingURL=signup.js.map