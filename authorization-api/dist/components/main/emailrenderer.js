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
var EmailRenderer = /** @class */ (function (_super) {
    __extends(EmailRenderer, _super);
    function EmailRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, props);
        return _this;
    }
    EmailRenderer.prototype.render = function () {
        var body = this.state.body;
        return (React.createElement("div", { className: "content", dangerouslySetInnerHTML: { __html: body } }));
    };
    return EmailRenderer;
}(React.Component));
exports.EmailRenderer = EmailRenderer;
//# sourceMappingURL=emailrenderer.js.map