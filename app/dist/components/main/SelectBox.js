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
var common_1 = require("../../helpers/common");
var SelectBox = /** @class */ (function (_super) {
    __extends(SelectBox, _super);
    function SelectBox(props) {
        var _this = _super.call(this, props) || this;
        // set initial state
        //console.log('in constructor');
        _this.state = Object.assign({}, _this.getInitialState(), __assign({}, _this.getSelectionProps(props.values)));
        _this.handleChange = _this.handleChange.bind(_this);
        _this.removeSelection = _this.removeSelection.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    SelectBox.prototype.componentDidMount = function () {
        window.addEventListener('click', this.handleClick);
    };
    SelectBox.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.handleClick);
    };
    SelectBox.prototype.componentWillMount = function () {
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
    SelectBox.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            options: []
        };
    };
    SelectBox.prototype.render = function () {
        var _a = this.props, id = _a.id, name = _a.name, options = _a.options, values = _a.values, inputRef = _a.inputRef, valueField = _a.valueField, labelField = _a.labelField, defaultOption = _a.defaultOption, required = _a.required;
        var selected = this.state.selected;
        var handleChange = this.handleChange;
        var removeSelection = this.removeSelection;
        var soptions = function (o, i) {
            var value = o[valueField];
            return (React.createElement("div", { className: "custom-control custom-checkbox", key: i, "data-name": name },
                React.createElement("input", { type: "checkbox", className: "custom-control-input", id: value, name: name, value: value, checked: selected.indexOf(value) >= 0 ? true : false, onChange: handleChange, formNoValidate: true }),
                React.createElement("label", { className: "custom-control-label", htmlFor: value }, o[labelField])));
        };
        var sboxes = this.state.options.map(function (o, i) {
            var children = o.children;
            return React.createElement("div", { className: "card", key: i },
                React.createElement("h6", null, o[labelField]),
                React.createElement("div", { className: "custom-controls-stacked" }, children.map(soptions)));
        });
        var selectlabel = function () {
            var tags;
            if (selected.length > 0) {
                tags = selected.map(function (o, i) {
                    return React.createElement("div", { className: "token token-removeable", key: 'tag-' + i },
                        o,
                        React.createElement("span", { className: "close-button", onClick: function (e) {
                                e.nativeEvent.stopImmediatePropagation();
                                e.stopPropagation();
                                return removeSelection(o);
                            } }, "x"));
                });
            }
            else {
                tags = React.createElement("div", { className: "token" }, defaultOption);
            }
            return React.createElement("div", { className: "dropdown-label bootstrap-tokenizer" }, tags);
        };
        return React.createElement("div", { className: "form-control select-box-list", "data-name": name, ref: inputRef, "data-required": required },
            React.createElement("div", { className: "dropdown" },
                React.createElement("div", { className: "dropdown-toggle" }, selectlabel()),
                React.createElement("div", { className: "dropdown-menu" },
                    React.createElement("div", { className: "card-columns" }, sboxes))));
    };
    SelectBox.prototype.handleClick = function (e) {
        e.stopPropagation();
        var target = e.target, parent = common_1.functions.findAncestor(target, 'dropdown');
        if (!parent) {
            var dds = document.getElementsByClassName('dropdown dropdown-menu');
            for (var i = 0; i <= dds.length - 1; i++)
                dds[i].classList.remove('show');
        }
        else if (target.classList.contains('dropdown-toggle')) {
            var parent = common_1.functions.findAncestor(target, 'dropdown'), children = parent.getElementsByClassName('dropdown-menu');
            parent.classList.toggle('show');
            for (var i = 0; i <= children.length - 1; i++)
                children[i].classList.toggle('show');
        }
        return false;
    };
    SelectBox.prototype.getSelectionProps = function (values, change) {
        values = values ? values : [];
        var selected = [];
        if (change) {
            var key = change.dataset.key;
            var index = values.indexOf(change.value);
            var valueField = this.props.valueField;
            if (change.checked === true)
                values.splice(key, 0, change.value);
            else if (index >= 0)
                values.splice(index, 1);
        }
        return { selected: values };
    };
    SelectBox.prototype.removeSelection = function (v) {
        var input = document.querySelectorAll('input[type=checkbox][value="' + v + '"]:checked'), selected = this.state.selected;
        //console.log(input);
        //console.log(v);
        if (input.length > 0) {
            selected.splice(selected.indexOf(v), 1);
            if (this.props.onChange) {
                var change = {
                    oldValue: this.state.selected,
                    newValue: selected,
                    name: input[0].getAttribute('name'),
                    type: 'selectboxlist',
                    required: this.props.required
                };
                this.props.onChange(change);
            }
            this.setState({ selected: selected });
        }
        return true;
    };
    SelectBox.prototype.handleChange = function (e) {
        // e.preventDefault();
        e.stopPropagation();
        var selected = this.state.selected;
        var sProps = this.getSelectionProps(selected, e.target);
        if (this.props.onChange) {
            var change = {
                oldValue: selected,
                newValue: sProps.selected,
                name: e.target.name,
                type: 'selectboxlist',
                required: this.props.required
            };
            this.props.onChange(change);
        }
        //console.log(selected);
        this.setState(__assign({}, sProps));
    };
    return SelectBox;
}(React.Component));
exports.SelectBox = SelectBox;
//# sourceMappingURL=selectbox.js.map