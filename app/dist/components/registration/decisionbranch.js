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
var DecisionBranch = /** @class */ (function (_super) {
    __extends(DecisionBranch, _super);
    function DecisionBranch(props) {
        return _super.call(this, props) || this;
        //    this.state = props;
    }
    DecisionBranch.prototype.render = function () {
        var _this = this;
        var onClick = function (e) { return _this.saveContinue(e); };
        var items = this.props.choices.map(function (d, i) {
            return React.createElement("button", { key: i, className: 'btn btn-' + (i == 0 ? 'primary' : 'secondary'), value: i, onClick: onClick }, d.label);
        });
        return (React.createElement("div", { className: "container display-modal" },
            React.createElement("div", { className: "modal" },
                React.createElement("div", { className: "modal-dialog" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-body" },
                            React.createElement("p", null, this.props.decision)),
                        React.createElement("div", { className: "modal-footer" }, items))))));
    };
    DecisionBranch.prototype.saveContinue = function (e) {
        e.preventDefault();
        var data = JSON.parse('{"' + this.props.fieldname + '":"' + this.props.choices[e.target.value].type + '"}');
        this.props.nextStep(data);
        return true;
    };
    return DecisionBranch;
}(React.Component));
exports.DecisionBranch = DecisionBranch;
//# sourceMappingURL=decisionbranch.js.map