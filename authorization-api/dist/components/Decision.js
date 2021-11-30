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
var Decision = /** @class */ (function (_super) {
    __extends(Decision, _super);
    function Decision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Decision.prototype.render = function () {
        var hiddeninputs = [];
        if (this.context && this.context.data) {
            hiddeninputs.push({ id: 'transaction_id', value: this.context.data.transactionId });
        }
        return (React.createElement("div", { className: "row background text-light" },
            React.createElement("div", { className: "col col-md-6 offset-md-3" },
                React.createElement("div", { className: "panel panel-dark decision-panel" },
                    React.createElement("div", { className: "panel-heading" },
                        React.createElement("h3", { className: "heading" }, "Authorize")),
                    React.createElement("div", { className: "panel-body" },
                        React.createElement("form", { className: "form-decision", method: "post", action: "../auth/decision" },
                            React.createElement("h4", null,
                                "Hi ",
                                this.context.data.user.firstname,
                                ","),
                            React.createElement("p", null,
                                React.createElement("strong", null,
                                    this.context.data.client.name,
                                    " "),
                                "is requesting access to your account. Do you approve?"),
                            React.createElement("p", null,
                                React.createElement("input", { type: "submit", id: "btnallow", name: "allow", className: "m-2 btn btn-primary", value: "Allow" }),
                                React.createElement("input", { type: "submit", id: "btndeny", name: "cancel", className: "m-2 btn btn-secondary", value: "Deny" }),
                                hiddeninputs.map(function (input, i) {
                                    return React.createElement("input", { type: "hidden", id: input.id, name: input.id, value: input.value, key: i });
                                }))))))));
    };
    Decision.contextTypes = {
        data: react_1.PropTypes.oneOfType([react_1.PropTypes.object, react_1.PropTypes.array])
    };
    return Decision;
}(React.Component));
exports.Decision = Decision;
//# sourceMappingURL=Decision.js.map