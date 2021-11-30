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
var R = require("ramda");
exports.Promised = R.curry(function (promiseProp, Decorated) { return /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { loading: true, error: null, value: null };
        return _this;
    }
    class_1.prototype.componentWillMount = function () {
    };
    class_1.prototype.render = function () {
        if (this.state.loading) {
            return React.createElement("span", null, "Loading...");
        }
        else if (this.state.error !== null) {
            return React.createElement("span", null,
                "Error: ",
                this.state.error.message);
        }
        else {
            var propsWithoutThePromise = R.dissoc(promiseProp, this.props);
            return React.createElement(Decorated, __assign({}, propsWithoutThePromise, this.state.value));
        }
    };
    class_1.prototype.componentDidMount = function () {
        var _this = this;
        this.props[promiseProp].then(function (value) { return _this.setState({ loading: false, value: value }); }, function (error) { return _this.setState({ loading: false, error: error }); });
    };
    return class_1;
}(React.Component)); });
//# sourceMappingURL=promised.js.map