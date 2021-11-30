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
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(props) {
        return _super.call(this, props) || this;
    }
    Popup.prototype.componentWillMount = function () {
    };
    Popup.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            value: ''
        };
    };
    Popup.prototype.render = function () {
        return React.createElement("div", null);
    };
    return Popup;
}(React.Component));
exports.Popup = Popup;
//# sourceMappingURL=Popup.js.map