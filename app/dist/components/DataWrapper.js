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
var prop_types_1 = require("prop-types");
var DataWrapper = /** @class */ (function (_super) {
    __extends(DataWrapper, _super);
    function DataWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataWrapper.prototype.getChildContext = function () {
        return {
            data: this.props.context
        };
    };
    DataWrapper.prototype.render = function () {
        return (React.createElement("div", null, this.props.children));
    };
    DataWrapper.childContextTypes = {
        data: prop_types_1.PropTypes.oneOfType([prop_types_1.PropTypes.object, prop_types_1.PropTypes.array])
    };
    return DataWrapper;
}(React.Component));
exports.default = DataWrapper;
//# sourceMappingURL=datawrapper.js.map