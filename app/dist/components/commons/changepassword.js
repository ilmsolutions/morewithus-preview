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
var validatecomponent_1 = require("../commons/validatecomponent");
var ChangePassword = /** @class */ (function (_super) {
    __extends(ChangePassword, _super);
    function ChangePassword(props) {
        var _this = _super.call(this, props) || this;
        //console.log(props);
        _this.state = Object.assign({}, { status: props.location.query.status,
            message: props.location.query.message });
        _this._bind('handleInputChange', 'onSubmit');
        return _this;
    }
    ChangePassword.prototype.render = function () {
        var _a = this.state, status = _a.status, message = _a.message;
        var InputChange = this.handleInputChange;
        //console.log(status);
        var renderStatus = status != null ? function () {
            return React.createElement("span", { className: 'alert alert-' + (status == 'true' ? 'success' : 'danger') }, message);
        } : null;
        return React.createElement("div", { className: "container" },
            React.createElement("h5", { className: "pl-3 pt-3" }, "Change Password"),
            React.createElement("div", { className: "container form-box d-flex flex-column" },
                React.createElement("form", { name: "change-password-form", role: "form", action: "", method: "post", className: "validate-form change-password-form", noValidate: true },
                    React.createElement("fieldset", { className: "form pt-3 col-12" },
                        React.createElement("div", { className: "form-group col-lg-6" },
                            React.createElement("label", { htmlFor: "currentPassword", id: "currentPasswordLabel" }, "Current Password"),
                            React.createElement("input", { type: "password", className: "form-control", name: "currentPassword", placeholder: "Current Password", ref: "currentPassword", onChange: InputChange, required: true }),
                            React.createElement("div", { className: "error", id: "currentPasswordError" })),
                        React.createElement("div", { className: "form-group col-lg-6" },
                            React.createElement("label", { htmlFor: "password", id: "passwordLabel" }, "New Password"),
                            React.createElement("input", { type: "password", className: "form-control", name: "password", placeholder: "New Password", ref: "password", onChange: InputChange, required: true }),
                            React.createElement("div", { className: "error", id: "passwordError" })),
                        React.createElement("div", { className: "form-group col-lg-6" },
                            React.createElement("label", { htmlFor: "passwordConfirm", id: "passwordConfirmLabel" }, "Confirm Password"),
                            React.createElement("input", { type: "password", className: "form-control", name: "passwordConfirm", placeholder: "Confirm Password", ref: "passwordConfirm", onChange: InputChange, required: true }),
                            React.createElement("div", { className: "error", id: "passwordConfirmError" })),
                        React.createElement("div", { className: "form-group col-lg-6" },
                            React.createElement("button", { className: "btn btn-primary", onClick: this.onSubmit, type: "submit" }, "Submit")),
                        React.createElement("div", { className: "form-group col-lg-6" }, renderStatus && renderStatus())))));
    };
    ChangePassword.prototype.handleInputChange = function (event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        if (this.validateChange) {
            this.validateChange(target.type ? target.type : 'input', event.target.name);
        }
    };
    ChangePassword.prototype.onSubmit = function (event) {
        event.stopPropagation();
        if (!this.showFormErrors())
            return false;
        return true;
    };
    return ChangePassword;
}(validatecomponent_1.Validate));
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=changepassword.js.map