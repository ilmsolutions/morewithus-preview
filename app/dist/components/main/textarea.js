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
var TextArea = /** @class */ (function (_super) {
    __extends(TextArea, _super);
    function TextArea(props) {
        var _this = _super.call(this, props) || this;
        var val = props.value ? props.value : '';
        _this.state = Object.assign({}, _this.getInitialState(), { value: val });
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    TextArea.prototype.componentWillMount = function () {
    };
    TextArea.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            value: ''
        };
    };
    TextArea.prototype.render = function () {
        var _a = this.props, id = _a.id, name = _a.name, rows = _a.rows, maxlength = _a.maxlength, defaultMessage = _a.defaultMessage, inputRef = _a.inputRef, required = _a.required;
        var value = this.state.value;
        return (React.createElement("div", { className: "form-group", key: 'text-area-' + name },
            React.createElement("textarea", { className: "form-control", id: id, name: name, value: value, ref: inputRef, maxLength: maxlength, rows: rows, placeholder: defaultMessage, onChange: this.handleChange, required: required }),
            React.createElement("span", { className: "badge badge-info pull-right" }, value.length + '/' + maxlength)));
    };
    TextArea.prototype.handleChange = function (e) {
        // e.preventDefault();
        e.stopPropagation();
        if (e.target.value.length > this.props.maxlength)
            return;
        this.setState({ value: e.target.value });
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };
    return TextArea;
}(React.Component));
exports.TextArea = TextArea;
//# sourceMappingURL=textarea.js.map