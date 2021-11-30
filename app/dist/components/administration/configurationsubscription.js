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
var configurationcommons_1 = require("./configurationcommons");
var types_1 = require("../../helpers/types");
//import {InputTypeCombo} from '../main/inputtypecombo';
var inputlist_1 = require("../main/inputlist");
var usercontexts = Object.keys(types_1.UserContextTypeMap).map(function (usercontext) {
    return types_1.UserContextTypeMap[usercontext];
});
var usertypes = Object.keys(types_1.UserTypeMap).map(function (usertype) {
    return types_1.UserTypeMap[usertype];
});
var ConfigurationSubscription = /** @class */ (function (_super) {
    __extends(ConfigurationSubscription, _super);
    function ConfigurationSubscription(props) {
        var _this = _super.call(this, props) || this;
        _this.handleInputListChange = function (change) {
            this.customState(change.name, change.newValue);
            /*         if(this.validateChange){
                        this.validateChange(change.type ? change.type : 'select', change.name);
                    }
             */ 
        };
        _this.state = Object.assign({}, { key: 0, isdirty: false }, props);
        _this._bind('handleInputListChange', 'handleDropDownChange');
        return _this;
    }
    ConfigurationSubscription.prototype.componentDidMount = function () {
        //hack to add ref for input element in the 3rd party react-dates input element
        //ref is needed for validation to work correclty
        if (this.refs['date'] == null) {
            this.refs['date'] = this.refs['form'].querySelectorAll('input[name=date]')[0];
            this.refs['date'].classList.add('form-control');
        }
    };
    ConfigurationSubscription.prototype.render = function () {
        var _this = this;
        var _a = this.props, status = _a.status, message = _a.message;
        var _b = this.state, row = _b.row, key = _b.key, isdirty = _b.isdirty;
        row.custom = row.custom ? row.custom : { duration: null,
            price: null,
            promotionprice: null,
            ispromoted: false,
            features: [] };
        //console.log(this.state);
        return React.createElement("div", { className: "card my-2 py-2", key: key },
            React.createElement("form", { role: "form", action: "", method: "post", ref: function (form) { return _this.refs['form'] = form; }, className: "p-2 validate-form registration-form", noValidate: true },
                React.createElement("div", { className: "form-group row" },
                    this.renderSelect(usertypes, row.path, 'usertype', 'User Type'),
                    this.renderSelect(usercontexts, row.path, 'usercontext', 'User Context')),
                React.createElement("div", { className: "form-group row" },
                    this.renderText(row.label, 'label', 'Label'),
                    this.renderText(row.description, 'description', 'Description')),
                React.createElement("div", { className: "form-group row" },
                    this.renderCurrency(row.custom.price, 'custom.price', 'Price'),
                    this.renderInputTypeCombo(types_1.DurationTypeMap, row.custom.duration, 'custom.duration', 'Duration')),
                React.createElement("div", { className: "form-group row" },
                    this.renderCheckBox(row.custom.ispromoted, 'custom.ispromoted', 'Is Promoted'),
                    this.renderCurrency(row.custom.promotionprice, 'custom.promotionprice', 'Promotion Price', { disabled: !row.custom.ispromoted, required: row.custom.ispromoted })),
                React.createElement("div", { className: "form-group row" }, this.renderDatePicker(row.custom.promotionexpireson, 'custom.promotionexpireson', 'Promotion Expires On', { disabled: !row.custom.ispromoted, required: row.custom.ispromoted })),
                React.createElement("div", { className: "form-group row" },
                    this.renderCheckBox(row.active, 'active', 'Active'),
                    this.renderCheckBox(row.custom.isfeatured, 'custom.isfeatured', 'Is Featured')),
                React.createElement("div", { className: "form-group row" }, this.renderInputList(row.custom.features, 'custom.features', 'Features')),
                React.createElement("div", { className: "form-group row" }, this.renderActions(isdirty))),
            this.renderStatus(status, message));
    };
    ConfigurationSubscription.prototype.renderSelect = function (options, path, fieldname, header) {
        var ropt = options.map(function (opt, i) {
            return React.createElement("option", { key: i, value: opt }, opt);
        });
        var selected = options.filter(function (opt) {
            return path && path.indexOf(',' + opt + ',') >= 0;
        });
        return React.createElement("div", { className: "col" },
            React.createElement("label", { htmlFor: "label", id: fieldname + 'Label' }, header + ': '),
            React.createElement("select", { className: 'custom-select', name: fieldname, ref: fieldname, defaultValue: (selected ? selected[0] : ""), onChange: this.handleDropDownChange, required: true },
                React.createElement("option", { value: "" }, "Select One"),
                ropt),
            React.createElement("div", { className: "error", id: fieldname + 'Error' }));
    };
    ConfigurationSubscription.prototype.renderInputList = function (options, fieldname, header) {
        var _this = this;
        return React.createElement("div", { className: "mx-2 col" },
            React.createElement("label", { htmlFor: "label", id: fieldname + 'Label' }, header),
            React.createElement(inputlist_1.InputList, { values: options, name: fieldname, id: 'inputList' + fieldname, placeholder: header, inputRef: function (el) { _this.refs[fieldname] = el; }, onChange: this.handleInputListChange, required: true }),
            React.createElement("div", { className: "error", id: fieldname + 'Error' }));
    };
    ConfigurationSubscription.prototype.handleDropDownChange = function (event) {
        var regexPatt = /(,(?!$)[^,]*)(,(?!$)[^,]*)?(,(?!$)[^,]*)?,/;
        var row = this.state.row;
        var path = row.path;
        var m = path.match(regexPatt);
        //reconstruct complete path
        path = m ? ',' + m.slice(1).map(function (t, i) {
            return t ? t.substring(1) : '';
        }).join() + ',' : path;
        //console.log(path);
        var target = event.target;
        var value = target.options[target.selectedIndex].value;
        var replacepatt = '$1' +
            (target.name == 'usertype' ?
                '$2,' + value + ',' : ',' + value + '$3,');
        var npath = path.replace(regexPatt, replacepatt);
        this.customState('path', npath);
    };
    return ConfigurationSubscription;
}(configurationcommons_1.ConfigurationCommons));
exports.ConfigurationSubscription = ConfigurationSubscription;
//# sourceMappingURL=configurationsubscription.js.map