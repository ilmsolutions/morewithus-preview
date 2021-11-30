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
var common_1 = require("../../helpers/common");
var InputTypeCombo = /** @class */ (function (_super) {
    __extends(InputTypeCombo, _super);
    function InputTypeCombo(props) {
        var _this = _super.call(this, props) || this;
        // set initial state
        //console.log('in constructor');
        _this.state = Object.assign({}, _this.getInitialState(), props);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleOptionClick = _this.handleOptionClick.bind(_this);
        return _this;
    }
    InputTypeCombo.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            options: [],
            selected: null
        };
    };
    InputTypeCombo.prototype.render = function () {
        var _this = this;
        var _a = this.props, inputRef = _a.inputRef, inputTypeRef = _a.inputTypeRef, typeMap = _a.typeMap, placeholder = _a.placeholder, name = _a.name, required = _a.required;
        var selected = this.state.selected;
        //console.log(selected);
        var selectedParsed = this.valueParser(selected);
        //console.log(selectedParsed);
        var roption = Object.keys(typeMap).map(function (type, i) {
            return React.createElement("li", { key: i, className: 'dropdown-item type-item ' +
                    (type == selectedParsed.type ? 'active' : ''), "data-value": type, onClick: _this.handleOptionClick }, typeMap[type]);
        });
        return React.createElement("div", { className: "input-type-combo input-group", "data-value": selectedParsed.value, "data-type": selectedParsed.type, "data-selected": selected, "data-required": required, "data-name": name },
            React.createElement("input", { type: "number", className: "form-control", placeholder: placeholder, defaultValue: selectedParsed.value, name: name, ref: inputRef, onChange: this.handleInputChange, required: required }),
            React.createElement("div", { className: "input-group-prepend" },
                React.createElement("button", { type: "button", ref: inputTypeRef, name: "type-" + name, className: "btn btn-secondary dropdown-toggle", value: selectedParsed.type, "data-required": required, "data-toggle": "dropdown" }, typeMap[selectedParsed.type]),
                React.createElement("ul", { className: "dropdown-menu" }, roption)));
    };
    InputTypeCombo.prototype.valueParser = function (value) {
        var typeMap = this.props.typeMap;
        if (value) {
            var regexParser = this.props.regexParser; //reinit global regex paraser
            var valueParts = regexParser.exec(value.trim());
            //console.log(valueParts);
            if (valueParts && valueParts.length > 1) {
                return {
                    type: valueParts[2] ? valueParts[2] : valueParts[1],
                    value: valueParts[2] ? valueParts[1] : null
                };
            }
        }
        return { type: null, value: null };
    };
    InputTypeCombo.prototype.handleInputChange = function (e) {
        e.preventDefault();
        var target = e.target;
        var parent = common_1.functions.findAncestor(target, 'input-type-combo');
        parent.dataset.value = target.value;
        this.handleChange(e);
    };
    InputTypeCombo.prototype.handleOptionClick = function (e) {
        e.preventDefault();
        var target = e.target;
        var parent = common_1.functions.findAncestor(target, 'input-type-combo');
        var label = parent ? parent.querySelector('button[name="type-' + this.props.name + '"]') : null;
        label.innerHTML = target.innerHTML;
        label.dataset.value = target.innerHTML;
        parent.dataset.type = target.dataset.value;
        this.handleChange(e);
    };
    InputTypeCombo.prototype.handleChange = function (e) {
        var target = e.target;
        var parent = common_1.functions.findAncestor(target, 'input-type-combo');
        var selected = this.state.selected;
        var nselected = parent.dataset.value && parent.dataset.value.length > 0 ?
            (parent.dataset.value + parent.dataset.type) : null;
        //console.log(parent.dataset.value);
        //console.log(parent.dataset.type);
        this.props.onChange({
            oldValue: selected,
            newValue: nselected,
            name: this.props.name,
            required: this.props.required
        });
        this.setState({
            selected: nselected
        });
    };
    return InputTypeCombo;
}(React.Component));
exports.InputTypeCombo = InputTypeCombo;
//# sourceMappingURL=inputtypecombo.js.map