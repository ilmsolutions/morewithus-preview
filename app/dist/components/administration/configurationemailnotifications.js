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
var types_1 = require("../../helpers/types");
var configurationcommons_1 = require("./configurationcommons");
var texteditor_1 = require("../main/texteditor");
var ConfigurationEmailNotifications = /** @class */ (function (_super) {
    __extends(ConfigurationEmailNotifications, _super);
    function ConfigurationEmailNotifications(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, { isdirty: false }, props);
        _this._bind('handleTextEditorChange');
        return _this;
    }
    ConfigurationEmailNotifications.prototype.render = function () {
        var _a = this.props, status = _a.status, message = _a.message;
        var _b = this.state, row = _b.row, isdirty = _b.isdirty;
        row.custom = row.custom ? row.custom : { duration: null,
            frequency: null,
            subject: '',
            body: '',
            bcc: '',
            cc: ''
        };
        //console.log(row);
        return React.createElement("div", { className: "card my-2 py-2" },
            React.createElement("form", { role: "form", action: "", method: "post", className: "p-2 validate-form registration-form", noValidate: true },
                React.createElement("div", { className: "form-group row" }, this.renderText(row.description, 'description', 'Description')),
                React.createElement("div", { className: "form-group row" }, this.renderText(row.custom.subject, 'custom.subject', 'Subject')),
                React.createElement("div", { className: "form-group row" },
                    this.renderText(row.custom.cc, 'custom.cc', 'CC', { required: false, type: 'email' }),
                    this.renderText(row.custom.bcc, 'custom.bcc', 'BCC', { required: false, type: 'email', multiple: true })),
                React.createElement("div", { className: "form-group row" },
                    this.renderInputTypeCombo(types_1.DurationTypeMap, row.custom.duration, 'custom.duration', 'Duration', { required: false }),
                    this.renderInputTypeCombo(types_1.DurationTypeMap, row.custom.frequency, 'custom.frequency', 'Frequency', { required: false })),
                React.createElement("div", { className: "form-group row" }, this.renderCheckBox(row.active, 'active', 'Active')),
                React.createElement("div", { className: "form-group row" }, this.renderTextEditor(row.custom.body, 'custom.body', 'Body')),
                React.createElement("div", { className: "form-group row" }, this.renderActions(isdirty, ['save']))),
            this.renderStatus(status, message));
    };
    ConfigurationEmailNotifications.prototype.renderTextEditor = function (value, fieldname, header) {
        var _this = this;
        return React.createElement("div", { className: "col" },
            React.createElement("label", { htmlFor: "label", id: fieldname + 'Label' }, header),
            React.createElement(texteditor_1.TextEditor, { name: fieldname, id: 'textEditor' + fieldname, value: value, placeholder: header, inputRef: function (el) { _this.refs[fieldname] = el; }, onChange: this.handleTextEditorChange, required: true }),
            React.createElement("div", { className: "error", id: fieldname + 'Error' }));
    };
    ConfigurationEmailNotifications.prototype.handleTextEditorChange = function (change) {
        //console.log(value);
        this.customState(change.name, change.newValue);
    };
    return ConfigurationEmailNotifications;
}(configurationcommons_1.ConfigurationCommons));
exports.ConfigurationEmailNotifications = ConfigurationEmailNotifications;
//# sourceMappingURL=configurationemailnotifications.js.map