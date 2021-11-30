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
var common_1 = require("../../helpers/common");
var library_1 = require("../../helpers/library");
var basecomponent_1 = require("./basecomponent");
var Validate = /** @class */ (function (_super) {
    __extends(Validate, _super);
    function Validate(props) {
        return _super.call(this, props) || this;
    }
    Validate.prototype.validateChange = function (type, refName) {
        //console.log('am coming thru in validate change ' + type + ' ' + refName);
        switch (type) {
            case 'checkboxlist':
            case 'selectboxlist':
                return this.showCheckBoxListError(refName);
            case 'inputlist':
                return this.showInputListError(refName);
            case 'select':
                return this.showSelectError(refName);
            case 'textarea':
                return this.showTextAreaError(refName);
            case 'inputtypecombo':
                return this.showInputTypeComboError(refName);
            case 'input':
            case 'url':
            case 'tel':
            case 'password':
            case 'text':
            case 'email':
            case 'file':
                return this.showInputError(refName);
        }
    };
    Validate.prototype.showFormErrors = function (obj) {
        if (obj === void 0) { obj = document; }
        var inputs = obj.querySelectorAll('input');
        var selects = obj.querySelectorAll('select');
        var textareas = obj.querySelectorAll('textarea');
        var checkboxlists = obj.querySelectorAll('.check-box-list[data-required], .select-box-list[required]');
        var inputLists = obj.querySelectorAll('.input-list[data-required]');
        var inputTypeCombos = obj.querySelectorAll('.input-type-combo[data-required]');
        var isFormValid = true;
        // console.log(this);
        // console.log(inputLists);
        for (var i = 0; i <= inputs.length - 1; i++) {
            var input = inputs.item(i);
            if (input.name && !input.formNoValidate) { //validation requires this attribute
                //input.classList.add('active');
                var isInputValid = this.showInputError(input.name);
                if (!isInputValid) {
                    isFormValid = false;
                }
            }
        }
        for (var i = 0; i <= selects.length - 1; i++) {
            var select = selects.item(i);
            if (select.name) { //validation requires this attribute
                select.classList.add('active');
                var isSelectValid = this.showSelectError(select.name);
                if (!isSelectValid) {
                    isFormValid = false;
                }
            }
        }
        for (var i = 0; i <= textareas.length - 1; i++) {
            var textarea = textareas.item(i);
            if (textarea.name && !common_1.functions.isHidden(textarea)) { //validation requires this attribute
                textarea.classList.add('active');
                var isTextAreaValid = this.showTextAreaError(textarea.name);
                if (!isTextAreaValid) {
                    isFormValid = false;
                }
            }
        }
        for (var i = 0; i <= checkboxlists.length - 1; i++) { //custom controls
            var checkboxlist = checkboxlists.item(i);
            checkboxlist.classList.add('active');
            var isCheckedListValid = this.showCheckBoxListError(checkboxlist.getAttribute('data-name'));
            if (!isCheckedListValid) {
                isFormValid = false;
            }
        }
        for (var i = 0; i <= inputLists.length - 1; i++) {
            var inputList = inputLists.item(i);
            inputList.classList.add('active');
            var isInputListValid = this.showInputListError(inputList.getAttribute('data-name'));
            if (!isInputListValid) {
                isFormValid = false;
            }
        }
        for (var i = 0; i <= inputTypeCombos.length - 1; i++) {
            var inputTypeCombo = inputTypeCombos[i];
            inputTypeCombo.classList.add('active');
            if (!this.showInputTypeComboError(inputTypeCombo.getAttribute('data-name'))) {
                isFormValid = false;
            }
        }
        return isFormValid;
    };
    Validate.prototype.showInputError = function (refName) {
        //console.log('in validator ' + refName);
        var ref = this.refs[refName];
        var validity = ref.validity;
        var label = document.getElementById(refName + "Label").textContent;
        var error = document.getElementById(refName + "Error");
        var isPassword = refName.indexOf('password') !== -1;
        var isPasswordConfirm = refName === 'passwordConfirm';
        var customValidity = null;
        ref.classList.add('active');
        if (isPasswordConfirm) {
            var refpassword = this.refs.password;
            if (refpassword.value !== ref.value) {
                customValidity = { valid: false, customError: 'Passwords do not match' };
            }
        }
        else if (ref.type != 'email' && common_1.functions.contains('email', ref.value)) {
            customValidity = { valid: false, customError: 'Please remove email address from text' };
        }
        else if (ref.type != 'url' && common_1.functions.contains('url', ref.value)) {
            customValidity = { valid: false, customError: 'Please remove links from text' };
        }
        else if (ref.type != 'tel' && common_1.functions.contains('phone', ref.value)) {
            customValidity = { valid: false, customError: 'Please remove phone number from text' };
        }
        else if (validity.typeMismatch && ref.type == 'url') {
            customValidity = { valid: false, customError: library_1.Library.MSG_INVALID_URL };
        }
        else if (validity.patternMismatch && ref.type == 'tel') {
            customValidity = { valid: false, customError: library_1.Library.MSG_INVALID_TEL };
        }
        if (customValidity) {
            ref.setCustomValidity(customValidity.customError);
        }
        else {
            ref.setCustomValidity(''); //clear custom error message
        }
        return this.showValidError(refName, customValidity ? customValidity : validity);
    };
    Validate.prototype.showTypeError = function (refName) {
        var ref = this.refs['type-' + refName];
        var validity = { valid: true, customError: '' };
        if (ref.getAttribute('data-required') == 'true' &&
            (ref.innerHTML.length <= 0 || ref.innerHTML == 'undefined')) {
            validity = { valid: false, customError: "should have at least one selected" };
            ref.classList.add('invalid');
            ref.classList.remove('valid');
        }
        else {
            ref.classList.remove('invalid');
            ref.classList.add('valid');
        }
        return this.showValidError(refName, validity);
    };
    Validate.prototype.showInputTypeComboError = function (refName) {
        return [this.showInputError(refName), this.showTypeError(refName)]
            .filter(function (v) { return !v; }).length <= 0;
    };
    Validate.prototype.showTextAreaError = function (refName) {
        var ref = this.refs[refName];
        var validity = ref.validity;
        var label = document.getElementById(refName + "Label").textContent;
        var error = document.getElementById(refName + "Error");
        //check for url, email and contact phone number
        var customValidity = null;
        if (common_1.functions.contains('email', ref.value)) {
            customValidity = { valid: false, customError: 'Please remove email address from text' };
        }
        else if (common_1.functions.contains('url', ref.value)) {
            customValidity = { valid: false, customError: 'Please remove links from text' };
        }
        else if (common_1.functions.contains('phone', ref.value)) {
            customValidity = { valid: false, customError: 'Please remove phone number from text' };
        }
        ;
        if (customValidity) {
            ref.setCustomValidity(customValidity.customError);
        }
        else {
            ref.setCustomValidity(''); //clear custom error message
        }
        return this.showValidError(refName, customValidity ? customValidity : validity);
    };
    Validate.prototype.showSelectError = function (refName) {
        var ref = this.refs[refName];
        var validity = ref.validity;
        return this.showValidError(refName, validity);
    };
    Validate.prototype.showCheckBoxListError = function (refName) {
        var ref = this.refs[refName];
        var validity = { valid: true, customError: '' };
        var checked = ref.querySelectorAll('input[type=checkbox]:checked');
        if (ref.hasAttribute('data-required') && checked.length <= 0) {
            validity = { valid: false, customError: "should have at least one selected" };
            ref.classList.add('invalid');
            ref.classList.remove('valid');
        }
        else {
            ref.classList.remove('invalid');
            ref.classList.add('valid');
        }
        return this.showValidError(refName, validity);
    };
    Validate.prototype.showInputListError = function (refName) {
        var ref = this.refs[refName];
        var validity = { valid: true, customError: '' };
        //var inputitems = ref.querySelectorAll('.token');
        //var input = ref.querySelectorAll('input[value][type="text"]:not([value=""])'); //if there is a current input
        var inputvals = ref.getAttribute('data-value');
        if (ref.hasAttribute('data-required') && !inputvals) {
            validity = { valid: false, customError: 'should have at least one selected' };
            ref.classList.add('invalid');
            ref.classList.remove('valid');
        }
        else if (common_1.functions.contains('email', inputvals)) {
            validity = { valid: false, customError: 'Please remove email address from text' };
            ref.classList.add('invalid');
            ref.classList.remove('valid');
        }
        else if (common_1.functions.contains('url', inputvals)) {
            validity = { valid: false, customError: 'Please remove links from text' };
            ref.classList.add('invalid');
            ref.classList.remove('valid');
        }
        else if (common_1.functions.contains('phone', inputvals)) {
            validity = { valid: false, customError: 'Please remove phone number from text' };
            ref.classList.add('invalid');
            ref.classList.remove('valid');
        }
        else {
            ref.classList.remove('invalid');
            ref.classList.add('valid');
        }
        return this.showValidError(refName, validity);
    };
    Validate.prototype.showValidError = function (refName, validity) {
        var label = document.getElementById(refName + "Label").textContent;
        var error = document.getElementById(refName + "Error");
        if (!validity.valid) {
            if (validity.customError)
                error.textContent = validity.customError;
            else if (validity.valueMissing) {
                error.textContent = label + " is a required field";
            }
            else if (validity.typeMismatch) {
                error.textContent = label + " should be a valid email address";
            }
            else if (validity.patternMismatch) {
                error.textContent = label + " should have the correct format";
            }
            return false;
        }
        else if (error) {
            error.textContent = '';
        }
        return true;
    };
    return Validate;
}(basecomponent_1.BaseComponent));
exports.Validate = Validate;
//# sourceMappingURL=validatecomponent.js.map