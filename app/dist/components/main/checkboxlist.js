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
var CheckboxList = /** @class */ (function (_super) {
    __extends(CheckboxList, _super);
    function CheckboxList(props) {
        var _this = _super.call(this, props) || this;
        // set initial state
        //console.log('in constructor');
        _this.state = Object.assign({}, _this.getInitialState(), __assign({}, _this.getSelectionProps(props.values)));
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    CheckboxList.prototype.componentWillMount = function () {
        var _this = this;
        //console.log('am in component will mount');
        this.props.getResource().then(function (res) {
            if (res && res.data) {
                _this.setState(function (state) { return ({
                    options: Object.assign([], state.options, res.data)
                }); });
                // this.setState({options: res.data});        
            }
        });
    };
    CheckboxList.prototype.componentDidMount = function () {
    };
    CheckboxList.prototype.componentWillReceiveProps = function (nextProps) {
    };
    CheckboxList.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            options: [],
            checkAll: false
        };
    };
    CheckboxList.prototype.render = function () {
        var _a = this.props, id = _a.id, name = _a.name, options = _a.options, values = _a.values, valueField = _a.valueField, labelField = _a.labelField, inputRef = _a.inputRef, required = _a.required;
        var _b = this.state, selected = _b.selected, checkAll = _b.checkAll;
        var handleChange = this.handleChange;
        var soptions = this.state.options.map(function (o, i) {
            var value = o[valueField];
            return (React.createElement("div", { className: "custom-control custom-checkbox", key: i },
                React.createElement("input", { type: "checkbox", className: "custom-control-input", id: value, name: name, value: value, checked: checkAll || selected.indexOf(value) >= 0 ? true : false, onChange: handleChange, formNoValidate: true }),
                React.createElement("label", { className: "custom-control-label", htmlFor: value }, o[labelField])));
        });
        return (React.createElement("div", { id: id, className: "form-control check-box-list", "data-name": name, ref: inputRef, "data-required": required }, soptions));
    };
    /*    getSelectedFromProps(props) {
             if(props.values != null && props.values.length > 0){
               return props.values;
             }
             return [];
        }*/
    CheckboxList.prototype.getSelectionProps = function (values, change) {
        values = values ? values : [];
        var selected = [], checkAll = false;
        //check for target related change
        if (change) {
            var key = change.dataset.key;
            var index = values.indexOf(change.value);
            var _a = this.props, valueField_1 = _a.valueField, checkAllValue_1 = _a.checkAllValue;
            if (change.checked === true)
                values.splice(key, 0, change.value);
            else if (change.value == checkAllValue_1)
                values = [];
            else if (this.state.checkAll) {
                //return all values except the check all value && the current target value
                values = this.state.options.filter(function (o) {
                    return (o[valueField_1] != checkAllValue_1) &&
                        (o[valueField_1] != change.value);
                }).map(function (o) {
                    return o[valueField_1];
                });
            }
            else if (index >= 0)
                values.splice(index, 1);
        }
        if (this.props.checkAllValue && //if checkall option is available
            (values.indexOf(this.props.checkAllValue) >= 0 ||
                (this.state && values.length == this.state.options.length - 1))) //if all options are checked
         {
            selected = [this.props.checkAllValue];
            checkAll = true;
        }
        else
            selected = values;
        return { selected: selected, checkAll: checkAll };
    };
    CheckboxList.prototype.handleChange = function (e) {
        e.stopPropagation();
        var selected = this.state.selected;
        var sProps = this.getSelectionProps(selected, e.target);
        if (this.props.onChange) {
            var change = {
                oldValue: selected,
                newValue: sProps.selected,
                name: e.target.name,
                type: 'checkboxlist',
                required: this.props.required
            };
            this.props.onChange(change);
        }
        //console.log(selected);
        this.setState(__assign({}, sProps));
    };
    return CheckboxList;
}(React.Component));
exports.CheckboxList = CheckboxList;
//# sourceMappingURL=checkboxlist.js.map