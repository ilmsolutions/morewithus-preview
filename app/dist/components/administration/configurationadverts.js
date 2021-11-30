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
var configurationcommons_1 = require("./configurationcommons");
var common_1 = require("../../helpers/common");
var ConfigurationAdverts = /** @class */ (function (_super) {
    __extends(ConfigurationAdverts, _super);
    function ConfigurationAdverts(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, { key: 0, isdirty: false }, props);
        _this._bind('renderContent', 'renderInputFile', 'handleInputFileChange', 'cancelPreview');
        return _this;
    }
    ConfigurationAdverts.prototype.render = function () {
        var _a = this.props, status = _a.status, message = _a.message;
        var _b = this.state, row = _b.row, key = _b.key, isdirty = _b.isdirty;
        row.custom = row.custom ? row.custom : { url: '', image: null, file: null };
        return React.createElement("div", { className: "card my-2 py-2", key: key },
            React.createElement("form", { role: "form", action: "", method: "post", className: "p-2 validate-form registration-form", noValidate: true },
                React.createElement("div", { className: "form-group row" },
                    this.renderText(row.label, 'label', 'Label'),
                    this.renderText(row.description, 'description', 'Description')),
                React.createElement("div", { className: "form-group row" }, this.renderText(row.custom.url, 'custom.url', 'Link', { type: 'url', required: true })),
                this.renderContent(row),
                this.renderActions(isdirty)),
            this.renderStatus(status, message));
    };
    ConfigurationAdverts.prototype.renderContent = function (row) {
        if (row.custom.image) {
            return (React.createElement("div", { className: "form-group card" },
                row.custom.image ?
                    React.createElement("button", { type: "button", className: "text-right close", onClick: this.cancelPreview, "aria-label": "Close" },
                        React.createElement("span", { "aria-hidden": "true" }, "\u00D7")) : '',
                React.createElement("img", { src: row.custom.image, className: 'card-img-bottom' })));
        }
        return (React.createElement("div", { className: "form-group row" }, this.renderInputFile(row.custom.file ? row.custom.file : null, 'custom.file', 'Choose File', {
            type: 'file',
            accept: 'image/*',
            required: true
        })));
    };
    ConfigurationAdverts.prototype.renderInputFile = function (defvalue, fieldname, header, props) {
        props = props || { required: true, type: 'file' };
        var namePref = fieldname;
        return (React.createElement("div", { className: "col" },
            React.createElement("label", { htmlFor: "label", id: namePref + 'Label' }, header),
            React.createElement("input", __assign({ className: "form-control", id: 'input' + namePref, name: namePref, ref: namePref, placeholder: header, onChange: this.handleInputFileChange, defaultValue: defvalue }, props)),
            React.createElement("div", { className: "error", id: namePref + 'Error' })));
    };
    ConfigurationAdverts.prototype.handleInputFileChange = function (e) {
        var _this = this;
        e.preventDefault();
        var reader = new FileReader();
        var target = e.target;
        var file = e.target.files[0];
        var name = e.target.name;
        reader.onloadend = function () {
            console.log(target.files[0]);
            _this.customStates([
                { name: name, value: file.name },
                { name: 'custom.image', value: reader.result }
                //   ,{name: 'custom.file', value: file}
            ]);
        };
        reader.readAsDataURL(file);
    };
    ConfigurationAdverts.prototype.cancelPreview = function (e) {
        e.preventDefault();
        var target = e.target, parent = common_1.functions.findAncestor(target, 'validate-form');
        this.customStates([
            { name: 'custom.file', value: null },
            { name: 'custom.image', value: null }
        ]);
    };
    return ConfigurationAdverts;
}(configurationcommons_1.ConfigurationCommons));
exports.ConfigurationAdverts = ConfigurationAdverts;
//# sourceMappingURL=configurationadverts.js.map