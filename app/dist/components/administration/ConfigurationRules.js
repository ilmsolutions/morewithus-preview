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
var ConfigurationRules = /** @class */ (function (_super) {
    __extends(ConfigurationRules, _super);
    function ConfigurationRules(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, { isdirty: false }, props);
        return _this;
    }
    ConfigurationRules.prototype.render = function () {
        var _a = this.props, status = _a.status, message = _a.message;
        var _b = this.state, row = _b.row, isdirty = _b.isdirty;
        return React.createElement("div", { className: "card my-2 py-2" },
            React.createElement("form", { role: "form", action: "", method: "post", className: "p-2 validate-form registration-form", noValidate: true },
                React.createElement("div", { className: "form-group row" }, this.renderText(row.description, 'description', 'Description')),
                React.createElement("div", { className: "form-group row" },
                    this.renderText(row.custom.field, 'custom.field', 'Field', { disabled: true, required: true, type: 'text' }),
                    this.renderInputTypeCombo(types_1.DurationTypeMap, row.custom.duration, 'custom.duration', 'Duration', { required: true })),
                React.createElement("div", { className: "form-group row" }, this.renderCheckBox(row.active, 'active', 'Active')),
                React.createElement("div", { className: "form-group row" }, this.renderActions(isdirty, ['save']))),
            this.renderStatus(status, message));
    };
    return ConfigurationRules;
}(configurationcommons_1.ConfigurationCommons));
exports.ConfigurationRules = ConfigurationRules;
//# sourceMappingURL=configurationrules.js.map