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
var update = require("immutability-helper");
var react_transition_group_1 = require("react-transition-group");
var validatecomponent_1 = require("../commons/validatecomponent");
var common_1 = require("../../helpers/common");
var employersteps_1 = require("./steps/employersteps");
var ProfileEmployer = /** @class */ (function (_super) {
    __extends(ProfileEmployer, _super);
    function ProfileEmployer(props) {
        var _this = _super.call(this, props) || this;
        _this.dropDownOnChange = function (change) {
            //console.log(change);
            this.customState(change.name, change.newValue);
            if (this.validateChange) {
                this.validateChange(change.type ? change.type : 'select', change.name);
            }
        };
        _this.state = Object.assign({}, props.user);
        _this._bind('handleInputChange', 'customState');
        _this.statedefs = employersteps_1.employerdefs.call(_this, {
            getResource: _this.props.getResource,
            stateRef: function (el) { return _this.refs["mailingAddress.state"] = el; },
            ageRef: function (el) { return _this.refs["ageRange"] = el; }
        });
        return _this;
    }
    ProfileEmployer.prototype.render = function () {
        var _this = this;
        var _a = this.props, user = _a.user, nextStepLabel = _a.nextStepLabel;
        var statedefs = this.statedefs;
        var onClick = function (e) { return _this.saveContinue(e); };
        var onPrevious = function (e) { return _this.previous(e); };
        var currentStep = function (step) { return (step == (_this.props.step - 2)); };
        var prevStep = function (step) { return (step < (_this.props.step - 2)); };
        var next = React.createElement("button", { className: "btn btn-primary pull-right", onClick: onClick, type: "submit" }, nextStepLabel);
        var prev = null;
        if (this.props.step - 2 > 1) {
            prev = React.createElement("button", { className: "btn btn-secondary pull-left", onClick: onPrevious, type: "submit" }, "Previous");
        }
        var inputChange = this.handleInputChange;
        var dropDownChange = this.dropDownOnChange.bind(this);
        var renderStep = function (step) {
            var d = statedefs[step - 1];
            if (!d)
                return React.createElement("fieldset", { key: "fieldset-" + step });
            return React.createElement("fieldset", { key: "fieldset-" + step },
                React.createElement("div", { className: "form-top" },
                    React.createElement("div", { className: "form-top-left" },
                        React.createElement("h4", null, d.title)),
                    React.createElement("div", { className: "form-top-right" },
                        React.createElement("i", { className: d.iconClass }))),
                d.render(user, inputChange, dropDownChange, d.props),
                React.createElement("div", { className: "form-group" },
                    React.createElement("div", { className: "clearfix col-12" },
                        prev,
                        next)));
        };
        return (React.createElement("div", { className: "container employer form-box d-flex flex-column" },
            React.createElement("form", { role: "form", action: "", method: "post", className: "form validate-form registration-form", noValidate: true },
                React.createElement(react_transition_group_1.CSSTransition, { classNames: "step", timeout: { enter: 500, exit: 300 } }, renderStep(this.props.step - 2)),
                this.renderstatus(this.props.status, this.props.message))));
    };
    ProfileEmployer.prototype.handleInputChange = function (event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        this.customState(name, value);
        if (this.validateChange) {
            this.validateChange(target.type ? target.type : 'input', event.target.name);
        }
    };
    ProfileEmployer.prototype.customState = function (name, value) {
        var _a;
        var namefields = name.split('.');
        if (namefields.length > 1) {
            this.setState(function (state) {
                var _a, _b, _c, _d;
                return (state[namefields[0]]) ?
                    update(state, (_a = {}, _a[namefields[0]] = (_b = {}, _b[namefields[1]] = { $set: value }, _b), _a)) :
                    Object.assign({}, state, (_c = {},
                        _c[namefields[0]] = (_d = {},
                            _d[namefields[1]] = value,
                            _d),
                        _c));
            });
        }
        else {
            this.setState((_a = {},
                _a[name] = value,
                _a));
        }
    };
    ProfileEmployer.prototype.saveContinue = function (e) {
        e.preventDefault();
        var target = e.target, parent = common_1.functions.findAncestor(target, 'validate-form');
        if (!this.showFormErrors(parent)) {
        }
        else
            this.props.nextStep(this.state);
        return true;
    };
    ProfileEmployer.prototype.previous = function (e) {
        e.preventDefault();
        this.props.previousStep();
        return true;
    };
    ProfileEmployer.prototype.renderstatus = function (status, message) {
        if (status == true)
            return;
        return (React.createElement("div", { className: "form-group col-12 has-danger" },
            React.createElement("div", { className: "form-control-label text-center" }, message)));
    };
    return ProfileEmployer;
}(validatecomponent_1.Validate));
exports.ProfileEmployer = ProfileEmployer;
//# sourceMappingURL=profileemployer.js.map