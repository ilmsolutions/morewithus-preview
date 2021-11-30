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
var Carousel = /** @class */ (function (_super) {
    __extends(Carousel, _super);
    function Carousel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Carousel.prototype.render = function () {
        var id = this.props.id;
        var slides = this.props.slides;
        return (React.createElement("div", { id: this.props.id, className: "carousel slide", "data-ride": "carousel" },
            React.createElement("ol", { className: "carousel-indicators" }, slides.map(function (slide, i) {
                return React.createElement("li", { "data-target": '#' + id, "data-slide-to": i, key: i, className: (i == 0 ? 'active' : '') });
            })),
            React.createElement("div", { className: "carousel-inner", role: "listbox" }, slides.map(function (slide, i) {
                return React.createElement("div", { className: 'carousel-item ' + (i == 0 ? 'active' : ''), key: i },
                    React.createElement("img", { className: slide.name, src: slide.image, alt: slide.name }),
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "carousel-caption d-none d-md-block text-left" },
                            React.createElement("h1", null, slide.title),
                            React.createElement("p", null, slide.description),
                            React.createElement("p", null,
                                React.createElement("a", { className: "btn btn-lg btn-primary", href: "#", role: "button" }, "Sign up today")))));
            })),
            React.createElement("a", { className: "carousel-control-prev", href: '#' + id, role: "button", "data-slide": "prev" },
                React.createElement("span", { className: "carousel-control-prev-icon", "aria-hidden": "true" }),
                React.createElement("span", { className: "sr-only" }, "Previous")),
            React.createElement("a", { className: "carousel-control-next", href: '#' + id, role: "button", "data-slide": "next" },
                React.createElement("span", { className: "carousel-control-next-icon", "aria-hidden": "true" }),
                React.createElement("span", { className: "sr-only" }, "Next"))));
    };
    return Carousel;
}(React.Component));
exports.Carousel = Carousel;
//# sourceMappingURL=Carousel.js.map