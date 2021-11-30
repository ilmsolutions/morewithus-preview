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
var ScrollToTop = /** @class */ (function (_super) {
    __extends(ScrollToTop, _super);
    function ScrollToTop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScrollToTop.prototype.componentDidMount = function () {
        //console.log('am i getting in here??');
        window.scrollTo(0, 0);
    };
    ScrollToTop.prototype.componentDidUpdate = function (prevProps) {
        //console.log('component did update');
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    };
    ScrollToTop.prototype.render = function () {
        return null;
    };
    return ScrollToTop;
}(React.Component));
exports.ScrollToTop = ScrollToTop;
//# sourceMappingURL=scrolltotop.js.map