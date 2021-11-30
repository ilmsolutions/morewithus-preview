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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var update = require("immutability-helper");
var validatecomponent_1 = require("../commons/validatecomponent");
var inputtypecombo_1 = require("../main/inputtypecombo");
var common_1 = require("../../helpers/common");
require("react-dates/initialize");
require("react-dates/lib/css/_datepicker.css");
var react_dates_1 = require("react-dates");
var moment = require("moment");
var ConfigurationCommons = /** @class */ (function (_super) {
    __extends(ConfigurationCommons, _super);
    function ConfigurationCommons(props) {
        var _this = _super.call(this, props) || this;
        _this._bind('handleInputChange', 'handleDateChange', 'handleInputTypeComboChange', 'save', 'remove', 'cancel');
        return _this;
    }
    ConfigurationCommons.prototype.renderText = function (defvalue, fieldname, header, props) {
        props = props || { required: true, type: 'text' };
        var namePref = fieldname;
        return (React.createElement("div", { className: "col" },
            React.createElement("label", { htmlFor: "label", id: namePref + 'Label' }, header + ': '),
            React.createElement("input", __assign({ className: "form-control", id: 'input' + namePref, name: namePref, ref: namePref, placeholder: header, onChange: this.handleInputChange, defaultValue: defvalue }, props)),
            React.createElement("div", { className: "error", id: namePref + 'Error' })));
    };
    ConfigurationCommons.prototype.renderCurrency = function (value, fieldname, header, props) {
        props = props || { required: true };
        return (React.createElement("div", { className: "col" },
            React.createElement("label", { htmlFor: "label", id: fieldname + 'Label' }, header + ': '),
            React.createElement("div", { className: "input-group" },
                React.createElement("div", { className: "input-group-prepend" },
                    React.createElement("span", { className: "input-group-text" }, "$")),
                React.createElement("input", __assign({ type: "number", step: 0.01, className: "form-control", name: fieldname, ref: fieldname, onChange: this.handleInputChange, defaultValue: value }, props))),
            React.createElement("div", { className: "error", id: fieldname + 'Error' })));
    };
    ConfigurationCommons.prototype.renderCheckBox = function (defvalue, fieldname, header) {
        var namePref = fieldname;
        return (React.createElement("div", { className: "form-check col" },
            React.createElement("label", { className: "mt-4 form-check-label", htmlFor: "label", id: namePref + 'Label' },
                React.createElement("input", { className: "form-check-input", type: "checkbox", id: 'input' + namePref, name: namePref, ref: namePref, onChange: this.handleInputChange, defaultChecked: defvalue }),
                header),
            React.createElement("div", { className: "error", id: namePref + 'Error' })));
    };
    ConfigurationCommons.prototype.renderInputTypeCombo = function (typeMap, defvalue, fieldname, header, props) {
        var _this = this;
        props = props || { required: true };
        var regex = new RegExp('^([\+\-]*[0-9]+)?(' + Object.keys(typeMap).join('|') + ')$', 'i');
        //console.log(regex);
        return (React.createElement("div", { className: "col" },
            React.createElement("label", { htmlFor: "label", id: fieldname + 'Label' }, header + ': '),
            React.createElement(inputtypecombo_1.InputTypeCombo, __assign({ typeMap: typeMap, selected: defvalue, name: fieldname, id: 'inputTypeCombo' + fieldname, placeholder: header, inputRef: function (el) { _this.refs[fieldname] = el; }, inputTypeRef: function (el) { _this.refs['type-' + fieldname] = el; }, onChange: this.handleInputTypeComboChange, regexParser: regex }, props)),
            React.createElement("div", { className: "error", id: fieldname + 'Error' })));
    };
    ConfigurationCommons.prototype.renderDatePicker = function (defvalue, fieldname, header, props) {
        var _this = this;
        props = props || { required: true };
        var namePref = fieldname;
        if (defvalue != null)
            props = Object.assign({}, props, { date: moment(defvalue) });
        return (React.createElement("div", { className: "col" },
            React.createElement("label", { htmlFor: "label", id: 'dateLabel' }, header + ': '),
            React.createElement(react_dates_1.SingleDatePicker, __assign({ ref: namePref, onDateChange: function (c) { return _this.handleDateChange(namePref, c); }, focused: this.state.focused, onFocusChange: function (o) { return _this.setState(o); }, orientation: "vertical", verticalHeight: 400, showClearDate: true, small: true }, props)),
            React.createElement("div", { className: "error", id: 'dateError' })));
    };
    ConfigurationCommons.prototype.renderActions = function (isdirty, actions) {
        actions = actions || ['save', 'delete', 'cancel'];
        var disabled = function (isdirty) { return !isdirty; };
        var actionMap = [
            { 'id': 'save', 'label': 'Save',
                'action': this.save, 'classes': 'btn btn-success',
                'icon': 'fa fa-save', 'disable': disabled },
            { 'id': 'delete', 'label': 'Delete',
                'action': this.remove, 'classes': 'btn btn-dark',
                'icon': 'fa fa-trash', 'disable': function () { return false; } },
            { 'id': 'cancel', 'label': 'Cancel',
                'action': this.cancel, 'classes': 'btn btn-warning',
                'icon': 'fa fa-undo', 'disable': disabled }
        ];
        var renderAction = actions.map(function (action, i) {
            var am = actionMap.filter(function (map) {
                return map.id == action;
            });
            var fam = am ? am[0] : null;
            if (fam) {
                var isdisabled = fam.disable ? fam.disable(isdirty) : false;
                return React.createElement("button", { className: fam.classes + (isdisabled ? ' disabled' : ''), key: i, onClick: fam.action, type: "submit", disabled: isdisabled },
                    React.createElement("i", { className: fam.icon }),
                    " ",
                    fam.label);
            }
            return '';
        });
        return React.createElement("div", { className: "my-2 btn-group d-flex justify-content-end" }, renderAction);
    };
    ConfigurationCommons.prototype.renderStatus = function (status, message) {
        var renderMessage = (message) ?
            React.createElement("span", { className: 'form-control-label alert alert-' + (status ? 'success' : 'danger') }, message) : '';
        return (React.createElement("div", { className: "form-group col-12" }, renderMessage));
    };
    //----change handlers
    ConfigurationCommons.prototype.handleDateChange = function (name, change) {
        this.customState(name, change ? new Date(change.toDate()) : null);
    };
    ConfigurationCommons.prototype.handleInputChange = function (event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        //console.log(name + ' ' + value);
        //console.log(this.state);
        this.customState(name, value);
        if (this.validateChange) {
            this.validateChange(target.type ? target.type : 'input', event.target.name);
        }
    };
    ConfigurationCommons.prototype.handleInputTypeComboChange = function (change) {
        //console.log(change);
        this.customState(change.name, change.newValue);
        if (this.validateChange) {
            this.validateChange('inputtypecombo', change.name);
        }
    };
    ConfigurationCommons.prototype.customStates = function (kvps) {
        this.setState(function (state) {
            kvps.forEach(function (kvp) {
                var _a, _b, _c;
                var namefields = kvp.name.split('.');
                if (namefields.length > 1) {
                    state = update(state, {
                        row: (_a = {}, _a[namefields[0]] = (_b = {},
                            _b[namefields[1]] = { $set: kvp.value },
                            _b), _a),
                        isdirty: { $set: true }
                    });
                }
                else {
                    state = update(state, {
                        row: (_c = {}, _c[namefields[0]] = { $set: kvp.value }, _c),
                        isdirty: { $set: true }
                    });
                }
            });
            return state;
        });
    };
    ConfigurationCommons.prototype.customState = function (name, value) {
        //console.log(name + ' ' + value);
        var namefields = name.split('.');
        if (namefields.length > 1) {
            this.setState(function (state) {
                var _a, _b, _c, _d;
                return (state.row[namefields[0]]) ?
                    update(state, { row: (_a = {}, _a[namefields[0]] = (_b = {}, _b[namefields[1]] = { $set: value }, _b), _a),
                        isdirty: { $set: true } }) :
                    update(state, {
                        row: (_c = {}, _c[namefields[0]] = (_d = {},
                            _d[namefields[1]] = { $set: value },
                            _d), _c),
                        isdirty: { $set: true }
                    });
            });
        }
        else {
            this.setState(function (state) {
                var _a;
                return update(state, {
                    row: (_a = {}, _a[name] = { $set: value }, _a),
                    isdirty: { $set: true }
                });
            });
        }
    };
    //---action behaviors
    ConfigurationCommons.prototype.save = function (e) {
        e.preventDefault();
        var save = this.props.save;
        var row = this.state.row;
        var target = e.target, parent = common_1.functions.findAncestor(target, 'validate-form');
        if (this.showFormErrors(parent)) {
            row.value = row.label;
            save(row);
        }
        else {
            this.setState({
                status: false,
                message: 'there are errors'
            });
            //console.log('there are errors');
        }
        return true;
    };
    ConfigurationCommons.prototype.remove = function (e) {
        e.preventDefault();
        var row = this.state.row;
        //console.log('this is delete. needs a prompt');
        //console.log(row);
        this.props.remove({ item: row._id });
        return true;
    };
    ConfigurationCommons.prototype.cancel = function (e) {
        e.preventDefault();
        var target = e.target, key = this.state.key;
        //console.log('this is cancel. just needs a reload');
        this.setState(Object.assign({}, this.props, { key: key + 1,
            isdirty: false }));
        return true;
    };
    return ConfigurationCommons;
}(validatecomponent_1.Validate));
exports.ConfigurationCommons = ConfigurationCommons;
//# sourceMappingURL=configurationcommons.js.map