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
var customasynctypeahead_1 = require("../main/customasynctypeahead");
var ConfigurationForm = /** @class */ (function (_super) {
    __extends(ConfigurationForm, _super);
    function ConfigurationForm(props) {
        var _this = _super.call(this, props) || this;
        _this.setIsDirty = function (on) {
            var isdirty = this.state.isdirty;
            if (isdirty != on)
                this.setState({ isdirty: on });
        };
        _this.dropDownOnChange = function (change) {
            this.customState(change.name, change.newValue);
            if (this.validateChange) {
                this.validateChange(change.type ? change.type : 'select', change.name);
            }
        };
        _this.state = Object.assign({}, { key: 0, isdirty: false }, props);
        _this._bind('dropDownOnChange');
        return _this;
    }
    ConfigurationForm.prototype.render = function () {
        var _a = this.props, status = _a.status, message = _a.message;
        var _b = this.state, row = _b.row, key = _b.key, isdirty = _b.isdirty;
        row.custom = row.custom ? row.custom : { options: [] };
        return React.createElement("div", { className: "card my-2 py-2" },
            React.createElement("form", { role: "form", action: "", method: "post", key: key, className: "validate-form registration-form", noValidate: true },
                this.renderText(row.label, 'label', 'Label'),
                this.renderText(row.description, 'description', 'Description'),
                this.renderOptions(row.custom.options, 'custom.options', 'Options'),
                this.renderCheckBox(row.active, 'active', 'Active'),
                this.renderText(row.order, 'order', 'Order'),
                this.renderActions(isdirty)),
            this.renderStatus(status, message));
    };
    /*
       renderstatus(status, message){
    
        if(status == true)
           return;
    
         return (
             <div className="form-group col-12 has-danger">
                 <div className="form-control-label text-center">
                     {message}
                 </div>
            </div>
         ) ;
      }
    
     */
    ConfigurationForm.prototype.renderOptions = function (options, fieldname, header) {
        var _this = this;
        var namePref = fieldname;
        var d = {
            data: JSON.stringify({ result: options })
        }, foptions = options ? options.map(function (opt) { return { label: opt, value: opt }; }) : options;
        return React.createElement("div", { className: "col" },
            React.createElement("label", { htmlFor: "", id: namePref + 'Label' }, header + ': '),
            React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: 'typeAhead' + namePref, name: namePref, inputRef: function (el) { _this.refs[namePref] = el; }, selected: foptions, allowNew: true, multiple: true, minLength: 1, defaultOption: "Add Options", getResource: function () { return new Promise(function (res) { return res(d); }); }, onChange: this.dropDownOnChange, required: true }),
            React.createElement("div", { className: "error", id: namePref + 'Error' }));
    };
    return ConfigurationForm;
}(configurationcommons_1.ConfigurationCommons));
exports.ConfigurationForm = ConfigurationForm;
//# sourceMappingURL=configurationform.js.map