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
var InputList = /** @class */ (function (_super) {
    __extends(InputList, _super);
    function InputList(props) {
        var _this = _super.call(this, props) || this;
        // set initial state
        //console.log('in constructor');
        _this.state = Object.assign({}, _this.getInitialState(), props);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleAddClick = _this.handleAddClick.bind(_this);
        _this.handleRemoveItem = _this.handleRemoveItem.bind(_this);
        return _this;
    }
    InputList.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            values: [],
            isdirty: false
        };
    };
    InputList.prototype.render = function () {
        var _this = this;
        var _a = this.state, values = _a.values, isdirty = _a.isdirty;
        var _b = this.props, placeholder = _b.placeholder, inputRef = _b.inputRef;
        var rvalues = values && values.length > 0 ? values.map(function (value, i) {
            return React.createElement("li", { key: i, className: 'list-group-item', "data-index": i, onClick: _this.handleRemoveItem },
                value,
                React.createElement("span", { className: 'pull-right' },
                    React.createElement("i", { className: 'ml-2 fa fa-close' })));
        }) : React.createElement("li", { className: 'list-group-item text-muted' }, "No Items available");
        return React.createElement("div", { className: 'row input-list-items' },
            React.createElement("div", { className: 'input-group' },
                React.createElement("input", { type: 'text', className: 'form-control', name: name, ref: inputRef, onChange: this.handleInputChange, placeholder: placeholder }),
                React.createElement("span", { className: 'input-group-btn' },
                    React.createElement("button", { className: 'btn btn-secondary ' + (!isdirty ? 'disabled' : ''), onClick: this.handleAddClick, type: 'button' },
                        React.createElement("i", { className: 'ml-2 fa fa-plus' })))),
            React.createElement("ul", { className: 'my-2 list-group' }, rvalues));
    };
    InputList.prototype.handleInputChange = function (e) {
        var target = e.target;
        this.setState({
            isdirty: target.value.length > 0 ? true : false
        });
    };
    InputList.prototype.handleAddClick = function (e) {
        var target = e.target;
        var parent = common_1.functions.findAncestor(target, 'input-list-items');
        var input = parent.querySelector('input[type=text]');
        var values = this.state.values;
        var nvalues = values;
        if (nvalues) {
            nvalues.push(input.value);
        }
        else
            nvalues = [input.value];
        this.setState({
            values: nvalues,
            isdirty: false
        });
        this.props.onChange({
            oldValue: values,
            newValue: nvalues,
            name: this.props.name,
            required: this.props.required
        });
        input.value = '';
    };
    InputList.prototype.handleRemoveItem = function (e) {
        var target = e.target;
        var values = this.state.values;
        var nvalues = values;
        var index = target.dataset.index;
        nvalues.splice(index, 1);
        this.setState({
            values: nvalues
        });
        this.props.onChange({
            oldValue: values,
            newValue: nvalues,
            name: this.props.name,
            required: this.props.required
        });
    };
    return InputList;
}(React.Component));
exports.InputList = InputList;
//# sourceMappingURL=inputlist.js.map