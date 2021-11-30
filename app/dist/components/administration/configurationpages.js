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
var texteditor_1 = require("../main/texteditor");
var ConfigurationPages = /** @class */ (function (_super) {
    __extends(ConfigurationPages, _super);
    function ConfigurationPages(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, { isdirty: false }, props);
        _this._bind('handleTextEditorChange');
        return _this;
    }
    ConfigurationPages.prototype.render = function () {
        var _a = this.props, status = _a.status, message = _a.message;
        var _b = this.state, row = _b.row, isdirty = _b.isdirty;
        row.custom = row.custom ? row.custom : {
            title: '',
            body: '',
            description: '',
            keywords: ''
        };
        //console.log(row);
        return React.createElement("div", { className: "card my-2 py-2" },
            React.createElement("form", { role: "form", action: "", method: "post", className: "p-2 validate-form registration-form", noValidate: true },
                React.createElement("div", { className: "form-group row" }, this.renderText(row.description, 'description', 'Description')),
                React.createElement("div", { className: "form-group row" }, this.renderText(row.custom.title, 'custom.title', 'Page Title')),
                React.createElement("div", { className: "form-group row" }, this.renderCheckBox(row.active, 'active', 'Active')),
                React.createElement("div", { className: "form-group row" }, this.renderTextEditor(row.custom.body, 'custom.body', 'Body')),
                React.createElement("div", { className: "form-group row" }, this.renderText(row.custom.description, 'custom.description', 'Meta Description', { required: false, type: 'text' })),
                React.createElement("div", { className: "form-group row" }, this.renderText(row.custom.keywords, 'custom.keywords', 'Meta Keywords', { required: false, type: 'text' })),
                React.createElement("div", { className: "form-group row" }, this.renderActions(isdirty, ['save']))),
            this.renderStatus(status, message));
    };
    ConfigurationPages.prototype.renderTextEditor = function (value, fieldname, header) {
        var _this = this;
        return React.createElement("div", { className: "col" },
            React.createElement("label", { htmlFor: "label", id: fieldname + 'Label' }, header),
            React.createElement(texteditor_1.TextEditor, { name: fieldname, id: 'textEditor' + fieldname, value: value, placeholder: header, inputRef: function (el) { _this.refs[fieldname] = el; }, onChange: this.handleTextEditorChange, required: true }),
            React.createElement("div", { className: "error", id: fieldname + 'Error' }));
    };
    ConfigurationPages.prototype.handleTextEditorChange = function (change) {
        //console.log(value);
        this.customState(change.name, change.newValue);
    };
    return ConfigurationPages;
}(configurationcommons_1.ConfigurationCommons));
exports.ConfigurationPages = ConfigurationPages;
//# sourceMappingURL=configurationpages.js.map