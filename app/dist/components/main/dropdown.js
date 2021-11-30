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
var ReactDOM = require("react-dom");
var common_1 = require("../../helpers/common");
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(props) {
        var _this = _super.call(this, props) || this;
        // set initial state
        //console.log('in constructor');
        _this.state = Object.assign({}, _this.getInitialState(), { selected: _this.getSelectedFromProps(props) });
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    Dropdown.prototype.componentWillMount = function () {
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
    Dropdown.prototype.componentDidUpdate = function (prevProps, prevState) {
        //IE Fix 
        //for validation API to mark it as valid appropriately when default selected
        //requires toggling the selection
        if (common_1.functions.detectIE()) {
            var elem = ReactDOM.findDOMNode(this);
            var si = -1;
            if (elem && prevState.options.length < 1) {
                //check for prevState.options.length < 1 
                //to ensure execution only after the options are loaded asyncrhonously
                si = elem.selectedIndex;
                var opts = elem.options;
                var ti = (si + 1) % opts.length;
                opts.item(ti).selected = true;
                opts.item(si).selected = true;
            }
        }
    };
    Dropdown.prototype.componentWillReceiveProps = function (nextProps) {
    };
    Dropdown.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            options: []
        };
    };
    Dropdown.prototype.render = function () {
        var _a = this.props, id = _a.id, name = _a.name, options = _a.options, value = _a.value, valueField = _a.valueField, labelField = _a.labelField, inputRef = _a.inputRef, required = _a.required;
        var selected = this.state.selected;
        var soptions = this.state.options.map(function (o, i) {
            return React.createElement("option", { key: name + '-' + i, value: o[valueField] }, o[labelField]);
        });
        var defOption;
        if (this.props.defaultOption) {
            defOption = React.createElement("option", { value: "" }, this.props.defaultOption);
        }
        return (React.createElement("select", { id: '_' + id, className: "form-control", name: name, ref: inputRef, onChange: this.handleChange, value: selected, required: required },
            defOption,
            soptions));
    };
    Dropdown.prototype.getSelectedFromProps = function (props) {
        var selected;
        //console.log('in getselectedfromprops');
        //console.log(props.value);
        if (props.value === null && props.options.length !== 0) {
            selected = props.options[0][props.valueField];
        }
        else {
            selected = props.value;
        }
        return selected;
    };
    Dropdown.prototype.handleChange = function (e) {
        e.preventDefault();
        if (this.props.onChange) {
            var change = {
                oldValue: this.state.selected,
                newValue: e.target.value,
                name: e.target.name,
                required: this.props.required
            };
            this.props.onChange(change);
        }
        this.setState({ selected: e.target.value });
    };
    return Dropdown;
}(React.Component));
exports.Dropdown = Dropdown;
//# sourceMappingURL=dropdown.js.map