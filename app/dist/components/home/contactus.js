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
var common_1 = require("../../helpers/common");
var googlerecaptcha_1 = require("../main/googlerecaptcha");
var recaptchaOpts = {
    //  "key": "6Le6J0EUAAAAAFDhajRRyfw6qNliQ283-McKmW5_"
    key: '6Le6J0EUAAAAAFDhajRRyfw6qNliQ283-McKmW5_' //testing
};
var ContactUs = /** @class */ (function (_super) {
    __extends(ContactUs, _super);
    function ContactUs(props) {
        var _this = _super.call(this, props) || this;
        _this._bind('customState', 'handleSubmitClick', 'getInitialState', 'onResolved', 'handleInputChange', 'checkFormValidity');
        _this.state = Object.assign({}, _this.getInitialState());
        return _this;
    }
    ContactUs.prototype.getInitialState = function () {
        return {
            isvalid: false,
            name: '',
            email: '',
            phone: '',
            message: ''
        };
    };
    ContactUs.prototype.componentDidMount = function () {
    };
    ContactUs.prototype.render = function () {
        var _this = this;
        var size = this.props.size;
        var _a = this.state, isvalid = _a.isvalid, name = _a.name, email = _a.email, phone = _a.phone, message = _a.message;
        var inputSizeClass = size ? 'input-group-' + size : '';
        var formControlSizeClass = size ? 'form-control-' + size : '';
        var btnSizeClass = size ? 'btn-' + size : '';
        size = size ? size : 'lg';
        return (React.createElement("form", { role: "form", action: "", method: "post", className: "validate-form form-" + size, noValidate: true },
            React.createElement("div", { className: "form-group form-group-sm form-row mb-0" },
                React.createElement("div", { className: "mb-2 col-8 col-md-7" },
                    React.createElement("label", { className: "sr-only", htmlFor: "Inputname", id: "nameLabel" }, "Name"),
                    React.createElement("input", { type: "text", onChange: this.handleInputChange, ref: "name", name: "name", id: "Inputname", value: name, className: "form-control " + formControlSizeClass, placeholder: "Name", required: true }),
                    React.createElement("div", { className: "error", id: "nameError" }))),
            React.createElement("div", { className: "form-group form-group-sm form-row mb-0" },
                React.createElement("div", { className: "mb-2 col-auto" },
                    React.createElement("label", { className: "sr-only", htmlFor: "Inputemail", id: "emailLabel" }, "Username"),
                    React.createElement("div", { className: "input-group " + inputSizeClass },
                        React.createElement("div", { className: "input-group-prepend" },
                            React.createElement("i", { className: "input-group-text fa fa-envelope" })),
                        React.createElement("input", { type: "email", className: "form-control", onChange: this.handleInputChange, ref: "email", name: "email", id: "Inputemail", value: email, placeholder: "Email", required: true }),
                        React.createElement("div", { className: "error", id: "emailError" }))),
                React.createElement("div", { className: "mb-2 col-auto" },
                    React.createElement("label", { className: "sr-only", htmlFor: "Inputphone", id: "phoneLabel" }, "Phone"),
                    React.createElement("div", { className: "input-group " + inputSizeClass },
                        React.createElement("div", { className: "input-group-prepend" },
                            React.createElement("i", { className: "input-group-text fa fa-phone" })),
                        React.createElement("input", { type: "tel", className: "form-control", onChange: this.handleInputChange, ref: "phone", name: "phone", id: "Inputphone", value: phone, placeholder: "Phone" }),
                        React.createElement("div", { className: "error", id: "phoneError" })))),
            React.createElement("div", { className: "form-group form-group-sm form-row" },
                React.createElement("div", { className: "mb-2 col-8 col-md-7" },
                    React.createElement("label", { className: "sr-only", htmlFor: "Inputmessage", id: "messageLabel" }, "Message"),
                    React.createElement("textarea", { className: "form-control " + formControlSizeClass, onChange: this.handleInputChange, ref: "message", name: "message", id: "Inputmessage", value: message, placeholder: "Message", required: true }),
                    React.createElement("div", { className: "error", id: "messageError" })),
                React.createElement("div", { className: "mb-2 col-2 d-flex" },
                    React.createElement("button", { type: "submit", name: "_submit", onClick: this.handleSubmitClick, className: "align-self-end btn btn-primary " + btnSizeClass, disabled: !isvalid }, "Submit"),
                    isvalid ? React.createElement(googlerecaptcha_1.GoogleRecaptcha, { id: "contact-us", ref: function (ref) { _this.recaptcha = ref; }, sitekey: recaptchaOpts.key, onResolved: this.onResolved }) : '',
                    "            "))));
    };
    ContactUs.prototype.customState = function (name, value) {
        this.setState(function (state) {
            var _a;
            return Object.assign(state, (_a = {}, _a[name] = value, _a));
        });
    };
    //----change handlers
    ContactUs.prototype.handleInputChange = function (event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked :
            target.type === 'number' ? parseInt(target.value) : target.value;
        var name = target.name;
        //console.log(name + ' ' + value);
        //console.log(this.state);
        this.customState(name, value);
        this.checkFormValidity(event);
    };
    ContactUs.prototype.checkFormValidity = function (event) {
        var target = event.target, parent = common_1.functions.findAncestor(target, 'validate-form');
        var valid = this.showFormErrors(parent);
        this.setState({
            isvalid: valid
        });
    };
    ContactUs.prototype.handleSubmitClick = function (event) {
        event.preventDefault();
        //console.log(this.recaptcha);
        this.recaptcha.execute();
        return true;
    };
    ContactUs.prototype.onResolved = function (token) {
        var _this = this;
        //console.log('on resolved.....');
        //var res = this.recaptcha.getResponse();
        var data = Object.assign({}, this.state, { recaptcha: token });
        //console.log(token);
        this.postResource('notifications.contact us', data).then(function (res) {
            _this.setState(_this.getInitialState());
        });
        //console.log(this.recaptcha.getResponse());
    };
    return ContactUs;
}(validatecomponent_1.Validate));
exports.ContactUs = ContactUs;
//# sourceMappingURL=contactus.js.map