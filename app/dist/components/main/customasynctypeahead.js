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
var react_bootstrap_typeahead_1 = require("react-bootstrap-typeahead");
require('../../assets/css/modules/typeahead/typeahead.css');
require('../../assets/css/modules/typeahead/token.css');
require('../../assets/css/modules/typeahead/loader.css');
require('../../assets/css/modules/typeahead/clearbutton.css');
var CustomAsyncTypeAhead = /** @class */ (function (_super) {
    __extends(CustomAsyncTypeAhead, _super);
    function CustomAsyncTypeAhead(props) {
        var _this = _super.call(this, props) || this;
        _this._addKeyDownBehavior = function () {
            var container = this.refs[this.props.name];
            if (!container)
                return;
            var input = container.querySelector('input.bootstrap-typeahead-input-main');
            if (!input || input.onkeydown)
                return;
            input.onkeydown = function (event) {
                if (event.keyCode !== 13)
                    return;
                var items = container.querySelectorAll('.bootstrap-typeahead-menu > li');
                if (items.length >= 1)
                    items[0].querySelector('a').click();
            };
        };
        _this.state = Object.assign({}, _this.getInitialState(), { allowNew: props.allowNew,
            multiple: props.multiple,
            minLength: props.minLength,
            selected: props.selected });
        _this._handleSearch = _this._handleSearch.bind(_this);
        _this._addKeyDownBehavior = _this._addKeyDownBehavior.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    CustomAsyncTypeAhead.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            allowNew: false,
            multiple: false,
            minLength: 0,
            options: [],
            selected: [],
            required: false
        };
    };
    CustomAsyncTypeAhead.prototype.componentDidUpdate = function (prevProps, prevState) {
        var multiple = this.props.multiple;
        if (!multiple) {
            this._addKeyDownBehavior();
        }
    };
    CustomAsyncTypeAhead.prototype.render = function () {
        var _a = this.props, id = _a.id, name = _a.name, classes = _a.classes, defaultOption = _a.defaultOption, inputRef = _a.inputRef, required = _a.required;
        var selected = this.state.selected;
        //console.log(this.state);
        return (React.createElement("div", { className: "input-list " + classes, "data-name": name, ref: inputRef, "data-required": required, "data-value": selected, key: "input-list" },
            React.createElement(react_bootstrap_typeahead_1.AsyncTypeahead, __assign({ ref: name, key: "input-list-typeahead", onSearch: this._handleSearch, placeholder: defaultOption, onChange: this.handleChange }, this.state))));
    };
    CustomAsyncTypeAhead.prototype.handleChange = function (selected) {
        if (this.props.onChange) {
            var newValue = selected.map(function (o) {
                return o.label ? o.label : o;
            }), change = {
                oldValue: this.state.selected,
                newValue: newValue,
                name: this.props.name,
                type: 'inputlist'
            };
            var ilist = document.querySelector('.input-list[data-name="' + this.props.name + '"]');
            ilist.setAttribute('data-value', newValue);
            this.props.onChange(change);
        }
        this.setState({ selected: selected });
    };
    CustomAsyncTypeAhead.prototype._handleSearch = function (query) {
        var _this = this;
        //console.log(query);
        if (!query) {
            return;
        }
        //+ '?query=' + query
        this.props.getResource()
            .then(function (res) {
            //console.log(res.data);
            if (res && res.data) {
                var d_1 = JSON.parse(res.data).result;
                // console.log(d);
                _this.setState(function (state) { return ({
                    options: d_1
                }); });
                // this.setState({options: res.data});        
            }
        });
    };
    return CustomAsyncTypeAhead;
}(React.Component));
exports.CustomAsyncTypeAhead = CustomAsyncTypeAhead;
//# sourceMappingURL=customasynctypeahead.js.map