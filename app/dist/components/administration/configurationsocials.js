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
var ConfigurationSocials = /** @class */ (function (_super) {
    __extends(ConfigurationSocials, _super);
    function ConfigurationSocials(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, { key: 0, isdirty: false }, props);
        return _this;
    }
    ConfigurationSocials.prototype.render = function () {
        var _a = this.props, status = _a.status, message = _a.message;
        var _b = this.state, row = _b.row, key = _b.key, isdirty = _b.isdirty;
        row.custom = row.custom ? row.custom : {};
        return (React.createElement("div", { className: "card my-2 py-2", key: key },
            React.createElement("form", { role: "form", action: "", method: "post", className: "p-2 validate-form registration-form", noValidate: true },
                React.createElement("div", { className: "form-group row" },
                    this.renderText(row.label, 'label', 'Label'),
                    this.renderText(row.description, 'description', 'Description')),
                React.createElement("div", { className: "form-group row" }, this.renderText(row.custom.facebook, 'custom.facebook', 'Facebook', { type: 'url', required: false })),
                React.createElement("div", { className: "form-group row" }, this.renderText(row.custom.google, 'custom.google', 'Google', { type: 'url', required: false })),
                React.createElement("div", { className: "form-group row" }, this.renderText(row.custom.linkedin, 'custom.linkedin', 'Linkedin', { type: 'url', required: false })),
                React.createElement("div", { className: "form-group row" }, this.renderText(row.custom.twitter, 'custom.twitter', 'Twitter', { type: 'url', required: false })),
                this.renderActions(isdirty)),
            this.renderStatus(status, message)));
    };
    return ConfigurationSocials;
}(configurationcommons_1.ConfigurationCommons));
exports.ConfigurationSocials = ConfigurationSocials;
//# sourceMappingURL=configurationsocials.js.map