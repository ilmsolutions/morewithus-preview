"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, { show: false }, props);
        _this.close = _this.close.bind(_this);
        return _this;
    }
    Modal.prototype.componentDidMount = function () {
        document.body.classList.add('modal-open');
    };
    Modal.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState(nextProps);
    };
    Modal.prototype.componentWillUnmount = function () {
        document.body.classList.remove('modal-open');
    };
    Modal.prototype.render = function () {
        var _a = this.props, title = _a.title, content = _a.content, renderer = _a.renderer;
        var show = this.state.show;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'modal fade ' + (show ? 'show' : '') },
                React.createElement("div", { className: 'modal-dialog' },
                    React.createElement("div", { className: 'modal-content' },
                        React.createElement("h5", null, title),
                        React.createElement("a", { href: '#', title: 'Close', onClick: this.close, className: 'd-flex justify-content-end mx-2' },
                            React.createElement("i", { className: "fa fa-close" })),
                        React.createElement("div", { className: "modal-body" }, renderer({ content: content }))))),
            React.createElement("div", { className: 'modal-backdrop fade ' + (show ? 'show' : ''), onClick: this.close })));
    };
    Modal.prototype.close = function (e) {
        var close = this.props.close;
        e.preventDefault();
        this.setState({
            show: false
        });
        close();
        return true;
    };
    return Modal;
}(React.Component));
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map