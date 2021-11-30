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
var react_1 = require("react");
var header_1 = require("./main/header");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.getChildContext = function () {
        return {
            data: this.props.context,
            status: this.props.status,
            client: this.props.client
        };
    };
    App.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(header_1.Header, null),
            this.props.children));
    };
    App.childContextTypes = {
        data: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array]),
        status: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array]),
        client: react_1.PropTypes.object,
        query: react_1.PropTypes.object
    };
    return App;
}(React.Component));
exports.App = App;
//# sourceMappingURL=App.js.map