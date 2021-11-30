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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var axios_1 = require("axios");
var types_1 = require("../../helpers/types");
var library_1 = require("../../helpers/library");
var common_1 = require("../../helpers/common");
var decisionbranch_1 = require("../registration/decisionbranch");
var authbasecomponent_1 = require("../commons/authbasecomponent");
var profileemployee_1 = require("./profileemployee");
var profileemployer_1 = require("./profileemployer");
var DecisionBranchUserContext = decisionbranch_1.DecisionBranch;
var DecisionBranchUserType = decisionbranch_1.DecisionBranch;
var beginStep = 3;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState());
        _this._bind('nextStep', 'previousStep', 'finishEmployeeStep', 'finishEmployerStep', 'submitData', 'switchClick');
        return _this;
    }
    Main.prototype.componentWillMount = function () {
    };
    Main.prototype.componentDidMount = function () {
        var _this = this;
        //axios.get('/api/auth/external/authorization/user')
        var location = this.props.location;
        var usercontext = location && location.query ? location.query.usercontext : null;
        this.getResource('user')
            .then(function (res) {
            var user = JSON.parse(res.data.toString());
            //override value for usercontext from querystring to show the appropriate profile page
            if (usercontext)
                user.usercontext = types_1.UserContextTypeMap[usercontext];
            var step = (user.usercontext) ? ((user.usertype) ? beginStep : 2) : 1;
            _this.setState({
                status: true,
                message: '',
                step: step,
                user: Object.assign({}, user)
            });
        });
    };
    Main.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            step: 1,
            user: {}
        };
    };
    Main.prototype.render = function () {
        //console.log(this.state);
        var _a = this.state, status = _a.status, message = _a.message, step = _a.step, user = _a.user;
        var mprops = Object.assign({}, { status: status, message: message, step: step,
            nextStep: this.nextStep, previousStep: this.previousStep, nextStepLabel: 'Next',
            getResource: this.getResource });
        var props;
        var contextProps = this.getContextProps(user.usercontext);
        var Profile;
        if (contextProps.finish == step) {
            mprops = Object.assign({}, mprops, { nextStep: contextProps.finishCb, nextStepLabel: 'Finish' });
        }
        var renderComponent = function () {
            switch (step) {
                case 1:
                    //employer or employee                
                    props = Object.assign({}, {
                        fieldname: 'usercontext',
                        decision: library_1.Library.MSG_DECISION_CONTEXT,
                        choices: [{ type: 'Employee', label: library_1.Library.MSG_ASSERT_EMPLOYEE },
                            { type: 'Employer', label: library_1.Library.MSG_ASSERT_EMPLOYER }]
                    }, mprops);
                    return React.createElement(DecisionBranchUserContext, __assign({}, props));
                case 2:
                    props = Object.assign({}, {
                        fieldname: 'usertype',
                        decision: library_1.Library.MSG_DECISION_ACCOUNTTYPE,
                        choices: [{ type: 'Individual', label: 'Individual' },
                            { type: 'Organization', label: 'Business' }]
                    }, mprops);
                    return React.createElement(DecisionBranchUserType, __assign({}, props));
                //organization or individual          
                case 3: //registration - step 1
                case 4: //registration - step 2
                    Profile = contextProps.profile;
                    return React.createElement(Profile, __assign({ user: user }, mprops));
                case 5: //success /finish
                    Profile = contextProps.profile;
                    return React.createElement(Profile, __assign({ user: user }, mprops));
            }
            return React.createElement("div", null);
        };
        return (React.createElement("div", null,
            React.createElement("h5", { className: "pl-5 pt-3" },
                common_1.functions.translate(user.usercontext) + ' Profile ',
                React.createElement("a", { className: 'highlight small', href: "#", onClick: this.switchClick, "data-switch-type": contextProps.switch }, 'Select ' + common_1.functions.translate(contextProps.switch) + ' Profile')),
            renderComponent()));
    };
    Main.prototype.nextStep = function (data) {
        var step = (this.state.step < 5) ? this.state.step + 1 : beginStep; //finish step default to 3
        if (data) {
            this.submitData(data, step);
        }
        else
            this.setState({
                step: step
            });
    };
    Main.prototype.finishEmployeeStep = function (data) {
        if (data) {
            data = Object.assign({}, data, { isregisteredemployee: true, isregisteredemployer: true });
            this.submitData(data, beginStep, function () {
                //response redirect to page
                window.scrollTo(0, 0);
                if (data.usertype == 'Organization') {
                    window.location.href = '/auth/profile/subscriptions?usercontext=Employee';
                }
                else
                    window.sweetalert(library_1.Library.MSG_REGISTER_COMPLETE);
                //console.log('you are registered!');
            });
        }
    };
    Main.prototype.finishEmployerStep = function (data) {
        if (data) {
            data = Object.assign({}, data, { isregisteredemployer: true });
            this.submitData(data, beginStep, function () {
                //response redirect to page
                //window.sweetalert('You are registered! Have your resume ready.');
                //console.log('you are registered!');
                window.scrollTo(0, 0);
                //navigate to subscriptions
                window.location.href = '/auth/profile/subscriptions?usercontext=Employer';
            });
        }
    };
    Main.prototype.submitData = function (data, step, cb) {
        var self = this;
        return function () {
            //save data
            axios_1.default.post('/api/auth/external/authorization/user', data)
                .then(function (res) {
                //  console.log(res);
                self.setState(function (state) { return ({
                    status: true, message: '',
                    user: Object.assign({}, state.user, data),
                    step: step
                }); });
                if (cb) {
                    cb();
                }
                ;
                window.scrollTo(0, 0);
            })
                .catch(function (err) {
                self.setState(function (state) { return ({
                    status: false,
                    message: (err.response && err.response.data ? err.response.data : '')
                }); });
            });
        }();
    };
    // Same as nextStep, but decrementing
    Main.prototype.previousStep = function () {
        this.setState({
            step: this.state.step - 1
        });
    };
    Main.prototype.switchClick = function (e) {
        e.stopPropagation();
        var target = e.target, data = { usercontext: target.dataset.switchType };
        this.submitData(data, beginStep);
    };
    Main.prototype.getContextProps = function (usercontext) {
        switch (usercontext) {
            case 'Employer':
                return {
                    switch: "Employee",
                    profile: profileemployer_1.ProfileEmployer,
                    finish: 3,
                    finishCb: this.finishEmployerStep
                };
            case 'Employee':
            default:
                return {
                    switch: "Employer",
                    profile: profileemployee_1.ProfileEmployee,
                    finish: 5,
                    finishCb: this.finishEmployeeStep
                };
        }
        ;
    };
    return Main;
}(authbasecomponent_1.AuthBaseComponent));
exports.Main = Main;
//# sourceMappingURL=main.js.map