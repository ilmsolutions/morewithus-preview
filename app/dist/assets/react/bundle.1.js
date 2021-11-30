webpackJsonp([1],{

/***/ 1178:
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(1);
var validatecomponent_1 = __webpack_require__(270);
var ChangePassword = /** @class */ (function (_super) {
    __extends(ChangePassword, _super);
    function ChangePassword(props) {
        var _this = _super.call(this, props) || this;
        //console.log(props);
        _this.state = Object.assign({}, { status: props.location.query.status,
            message: props.location.query.message });
        _this._bind('handleInputChange', 'onSubmit');
        return _this;
    }
    ChangePassword.prototype.render = function () {
        var _a = this.state, status = _a.status, message = _a.message;
        var InputChange = this.handleInputChange;
        //console.log(status);
        var renderStatus = status != null ? function () {
            return React.createElement("span", { className: 'alert alert-' + (status == 'true' ? 'success' : 'danger') }, message);
        } : null;
        return React.createElement("div", { className: "container" },
            React.createElement("h5", { className: "pl-3 pt-3" }, "Change Password"),
            React.createElement("div", { className: "container form-box d-flex flex-column" },
                React.createElement("form", { name: "change-password-form", role: "form", action: "", method: "post", className: "validate-form change-password-form", noValidate: true },
                    React.createElement("fieldset", { className: "form pt-3 col-12" },
                        React.createElement("div", { className: "form-group col-lg-6" },
                            React.createElement("label", { htmlFor: "currentPassword", id: "currentPasswordLabel" }, "Current Password"),
                            React.createElement("input", { type: "password", className: "form-control", name: "currentPassword", placeholder: "Current Password", ref: "currentPassword", onChange: InputChange, required: true }),
                            React.createElement("div", { className: "error", id: "currentPasswordError" })),
                        React.createElement("div", { className: "form-group col-lg-6" },
                            React.createElement("label", { htmlFor: "password", id: "passwordLabel" }, "New Password"),
                            React.createElement("input", { type: "password", className: "form-control", name: "password", placeholder: "New Password", ref: "password", onChange: InputChange, required: true }),
                            React.createElement("div", { className: "error", id: "passwordError" })),
                        React.createElement("div", { className: "form-group col-lg-6" },
                            React.createElement("label", { htmlFor: "passwordConfirm", id: "passwordConfirmLabel" }, "Confirm Password"),
                            React.createElement("input", { type: "password", className: "form-control", name: "passwordConfirm", placeholder: "Confirm Password", ref: "passwordConfirm", onChange: InputChange, required: true }),
                            React.createElement("div", { className: "error", id: "passwordConfirmError" })),
                        React.createElement("div", { className: "form-group col-lg-6" },
                            React.createElement("button", { className: "btn btn-primary", onClick: this.onSubmit, type: "submit" }, "Submit")),
                        React.createElement("div", { className: "form-group col-lg-6" }, renderStatus && renderStatus())))));
    };
    ChangePassword.prototype.handleInputChange = function (event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        if (this.validateChange) {
            this.validateChange(target.type ? target.type : 'input', event.target.name);
        }
    };
    ChangePassword.prototype.onSubmit = function (event) {
        event.stopPropagation();
        if (!this.showFormErrors())
            return false;
        return true;
    };
    return ChangePassword;
}(validatecomponent_1.Validate));
exports.ChangePassword = ChangePassword;


/***/ }),

/***/ 1179:
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(1);
var axios_1 = __webpack_require__(54);
var authbasecomponent_1 = __webpack_require__(269);
var datagrid_1 = __webpack_require__(812);
var transforms_1 = __webpack_require__(164);
var PaymentHistory = /** @class */ (function (_super) {
    __extends(PaymentHistory, _super);
    function PaymentHistory(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState());
        return _this;
    }
    PaymentHistory.prototype.componentDidMount = function () {
        var _this = this;
        //axios.get('/api/auth/external/authorization/user')
        //console.log('subscriptions mount');
        axios_1.default.all([
            this.getResource('user?include=subscriptions'),
            this.getResource('settings.subscriptions')
        ]).then(function (results) {
            var user = JSON.parse(results[0].data.toString());
            //let subscriptions = results[1].data;
            var subscriptions = JSON.parse(results[1].data.toString());
            //console.log(user);
            //console.log(subscriptions);
            _this.setState({
                user: user,
                subscriptions: subscriptions.map(transforms_1.transformSubscriptionDTO).filter(function (subscription) {
                    return subscription.usertype.indexOf(user.usertype) >= 0;
                })
            });
        });
    };
    PaymentHistory.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            step: 1,
            user: null,
            type: 'paymenthistory',
            subscriptions: []
        };
    };
    PaymentHistory.prototype.render = function () {
        var _a = this.state, type = _a.type, user = _a.user;
        var columnDefs = this.getColumnDefs(type);
        return (React.createElement("div", { className: 'container' },
            React.createElement("h5", { className: 'pl-3 pt-3' }, "Payment History"),
            React.createElement("div", { className: 'container' }, user ? React.createElement(datagrid_1.DataGrid, { columndefs: columnDefs, type: type, rows: user.subscriptions }) : React.createElement("span", null, "Loading...."))));
    };
    PaymentHistory.prototype.getColumnDefs = function (type) {
        switch (true) {
            case /paymenthistory/.test(type):
                var rplan = renderplanname.bind(this.state.subscriptions);
                return [
                    { key: 'orderid', name: 'Order ID', cell: renderValue },
                    { key: 'paymentid', name: 'Payment ID', cell: renderValue },
                    { key: 'paymentdate', name: 'Payment Date', cell: renderdate },
                    { key: 'usercontext', name: 'Plan Type' },
                    { key: 'planid', name: 'Plan', cell: rplan },
                    { key: 'orderamount', name: 'Amount Paid', cell: rendercurrency },
                    { key: 'isexpired', name: 'Active', cell: renderboolean }
                ];
        }
        function renderValue(item, key) {
            return item[key] ? item[key] : 'None';
        }
        function renderplanname(item, key) {
            var subscriptions = this;
            var subscription = subscriptions ? subscriptions.filter(function (subscription) {
                return subscription.id == item[key];
            }) : null;
            return subscription && subscription[0] ? subscription[0].title : '-';
        }
        function renderdate(item, key) {
            return new Date(item[key]).toDisplay();
        }
        function renderboolean(item, key) {
            return item[key] ? React.createElement("i", { className: 'fa fa-close' }) :
                React.createElement("i", { className: 'fa fa-check' });
        }
        function rendercurrency(item, key) {
            return item[key] >= 0 ? item[key].toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            }) : '-';
        }
    };
    return PaymentHistory;
}(authbasecomponent_1.AuthBaseComponent));
exports.PaymentHistory = PaymentHistory;


/***/ }),

/***/ 1181:
/***/ (function(module, exports, __webpack_require__) {

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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var scriptcache_1 = __webpack_require__(1197);
exports.ScriptLoadWrapper = function (scripts, Wrapped) { return /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
        var _this = _super.call(this, props) || this;
        _this.onLoad = _this.onLoad.bind(_this);
        return _this;
    }
    class_1.prototype.componentWillMount = function () {
        var scriptcache = scriptcache_1.ScriptCache.bind(Wrapped)();
        this.cache = scriptcache(scripts);
        //console.log('component will mount');
        //console.log(scriptcache);
        //console.log(this.cache);
    };
    class_1.prototype.onLoad = function (cb, reject) {
        //  console.log('on load');
        //  console.log(this.cache);
        var cache = this.cache;
        Object.keys(scripts).forEach(function (key) {
            cache[key].onLoad(cb, reject);
        });
    };
    class_1.prototype.render = function () {
        return React.createElement(Wrapped, __assign({}, this.props, { onLoad: this.onLoad }));
    };
    return class_1;
}(React.Component)); };


/***/ }),

/***/ 1185:
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(11);
var scriptloadwrapper_1 = __webpack_require__(1181);
var BasePaypalButton = /** @class */ (function (_super) {
    __extends(BasePaypalButton, _super);
    function BasePaypalButton(props) {
        var _this = _super.call(this, props) || this;
        window.React = React;
        window.ReactDOM = ReactDOM;
        _this.state = Object.assign({}, _this.getInitialState(), props, { loadstatus: '' });
        return _this;
    }
    BasePaypalButton.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            amount: 0,
            currency: 'USD'
        };
    };
    BasePaypalButton.prototype.componentDidMount = function () {
        var _this = this;
        this.props.onLoad(function () {
            _this.setState({ loadstatus: 'ready' });
        }, function (err) {
            //console.log('there was an error', err);  
            _this.props.onFailure({ status: false, message: 'Load Error: ' + err });
        });
    };
    BasePaypalButton.prototype.componentWillUnmount = function () {
    };
    BasePaypalButton.prototype.render = function () {
        var _a = this.state, loadstatus = _a.loadstatus, amount = _a.amount, currency = _a.currency;
        var _b = this.props, env = _b.env, apikey = _b.apikey, onSuccess = _b.onSuccess, onFailure = _b.onFailure;
        var renderPayPalButton = function () {
            var client = (_a = {},
                _a[env] = apikey,
                _a);
            var payment = function (data, actions) {
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: amount, currency: currency }
                            }
                        ]
                    }
                });
            };
            var onAuthorize = function (data, actions) {
                //console.log('on authorize....');
                //console.log(actions);
                //console.log(data);
                return actions.payment.execute().then(function (res) {
                    //window.alert('Payment Complete!');
                    //console.log('in execute success');
                    //console.log(res);
                    if (res.state == 'approved' && onSuccess)
                        onSuccess(data);
                }).catch(function (res) {
                    //console.log('error handler');
                    //console.log(res);
                    if (onFailure)
                        onFailure({ status: false, message: 'Payment could not be executed. Please try again!' });
                });
            };
            var onCancel = function (data) {
                //console.log('The payment was cancelled!');
                if (onFailure)
                    onFailure({ status: false, message: 'The payment was cancelled.' });
            };
            var onError = function (data) {
                if (onFailure)
                    onFailure({ status: false, message: 'Error occurred while loading files.' });
            };
            //  let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
            return React.createElement(paypal.Button.react, { env: env, client: client, payment: payment, commit: true, onAuthorize: onAuthorize, onCancel: onCancel, onError: onError });
            var _a;
        };
        return React.createElement("span", null, (loadstatus == 'ready') ?
            renderPayPalButton() : '');
    };
    return BasePaypalButton;
}(React.Component));
exports.PaypalButton = scriptloadwrapper_1.ScriptLoadWrapper({ paypal: 'https://www.paypalobjects.com/api/checkout.js' }, BasePaypalButton);


/***/ }),

/***/ 1187:
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(1);
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


/***/ }),

/***/ 1188:
/***/ (function(module, exports, __webpack_require__) {

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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var axios_1 = __webpack_require__(54);
var types_1 = __webpack_require__(271);
var library_1 = __webpack_require__(105);
var common_1 = __webpack_require__(77);
var decisionbranch_1 = __webpack_require__(1187);
var authbasecomponent_1 = __webpack_require__(269);
var profileemployee_1 = __webpack_require__(1189);
var profileemployer_1 = __webpack_require__(1190);
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


/***/ }),

/***/ 1189:
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(1);
var update = __webpack_require__(272);
var react_transition_group_1 = __webpack_require__(275);
var validatecomponent_1 = __webpack_require__(270);
var common_1 = __webpack_require__(77);
var employeeusersteps_1 = __webpack_require__(1192);
var employeeorganizationsteps_1 = __webpack_require__(1191);
var ProfileEmployee = /** @class */ (function (_super) {
    __extends(ProfileEmployee, _super);
    function ProfileEmployee(props) {
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
        var commondefs = {
            getResource: _this.props.getResource,
            stateRef: function (el) { return _this.refs["mailingAddress.state"] = el; },
            mileRef: function (el) { return _this.refs["jobsWithinMiles"] = el; },
            availableTimesRef: function (el) { return _this.refs["availableTimes"] = el; },
            jobTypesRef: function (el) { return _this.refs["jobTypes"] = el; },
            workExperienceRef: function (el) { return _this.refs["workExperience"] = el; },
            descriptionRef: function (el) { return _this.refs["description"] = el; },
            workAreasRef: function (el) { return _this.refs["workAreas"] = el; },
            certificationsRef: function (el) { return _this.refs["certifications"] = el; },
            skillsRef: function (el) { return _this.refs["skills"] = el; },
            awardsRef: function (el) { return _this.refs["awards"] = el; },
            keywordsRef: function (el) { return _this.refs["keywords"] = el; }
        };
        switch (_this.state.usertype) {
            case 'Individual':
                _this.statedefs = employeeusersteps_1.userdefs.call(_this, Object.assign({}, commondefs, {
                    ageRef: function (el) { return _this.refs["ageRange"] = el; },
                    employmentTypesRef: function (el) { return _this.refs["employmentTypes"] = el; },
                    edlRef: function (el) { return _this.refs["educationLevel"] = el; }
                }));
                break;
            case 'Organization':
                _this.statedefs = employeeorganizationsteps_1.organizationdefs.call(_this, Object.assign({}, commondefs));
                break;
        }
        return _this;
    }
    ProfileEmployee.prototype.componentDidMount = function () {
    };
    ProfileEmployee.prototype.render = function () {
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
        var progressbars = statedefs.map(function (d, i) {
            return React.createElement("li", { key: i, className: prevStep(d.state) || currentStep(d.state) ? 'active' : '' }, d.title);
        });
        return (React.createElement("div", { className: "container employee form-box d-flex flex-column" },
            React.createElement("ul", { id: "progressbar" }, progressbars),
            React.createElement("form", { role: "form", action: "", method: "post", className: "form validate-form registration-form", noValidate: true },
                React.createElement(react_transition_group_1.CSSTransition, { classNames: "step", timeout: { enter: 500, exit: 300 } }, renderStep(this.props.step - 2)),
                this.renderstatus(this.props.status, this.props.message))));
    }; /*end render */
    ProfileEmployee.prototype.handleInputChange = function (event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        this.customState(name, value);
        if (this.validateChange) {
            this.validateChange(target.type ? target.type : 'input', event.target.name);
        }
    };
    ProfileEmployee.prototype.customState = function (name, value) {
        var namefields = name.split('.');
        if (namefields.length > 1) {
            this.setState(function (state) {
                return (state[namefields[0]]) ?
                    update(state, (_a = {}, _a[namefields[0]] = (_b = {}, _b[namefields[1]] = { $set: value }, _b), _a)) :
                    Object.assign({}, state, (_c = {},
                        _c[namefields[0]] = (_d = {},
                            _d[namefields[1]] = value,
                            _d),
                        _c));
                var _a, _b, _c, _d;
            });
        }
        else {
            this.setState((_a = {},
                _a[name] = value,
                _a));
        }
        var _a;
    };
    ProfileEmployee.prototype.saveContinue = function (e) {
        e.preventDefault();
        var target = e.target, parent = common_1.functions.findAncestor(target, 'validate-form');
        if (!this.showFormErrors(parent)) {
        }
        else
            this.props.nextStep(this.state);
        return true;
    };
    ProfileEmployee.prototype.previous = function (e) {
        e.preventDefault();
        this.props.previousStep();
        return true;
    };
    ProfileEmployee.prototype.renderstatus = function (status, message) {
        if (status == true)
            return;
        return (React.createElement("div", { className: "form-group col-12 has-danger" },
            React.createElement("div", { className: "form-control-label text-center" }, message)));
    };
    return ProfileEmployee;
}(validatecomponent_1.Validate));
exports.ProfileEmployee = ProfileEmployee;


/***/ }),

/***/ 1190:
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(1);
var update = __webpack_require__(272);
var react_transition_group_1 = __webpack_require__(275);
var validatecomponent_1 = __webpack_require__(270);
var common_1 = __webpack_require__(77);
var employersteps_1 = __webpack_require__(1193);
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
        var namefields = name.split('.');
        if (namefields.length > 1) {
            this.setState(function (state) {
                return (state[namefields[0]]) ?
                    update(state, (_a = {}, _a[namefields[0]] = (_b = {}, _b[namefields[1]] = { $set: value }, _b), _a)) :
                    Object.assign({}, state, (_c = {},
                        _c[namefields[0]] = (_d = {},
                            _d[namefields[1]] = value,
                            _d),
                        _c));
                var _a, _b, _c, _d;
            });
        }
        else {
            this.setState((_a = {},
                _a[name] = value,
                _a));
        }
        var _a;
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


/***/ }),

/***/ 1191:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var dropdown_1 = __webpack_require__(813);
var checkboxlist_1 = __webpack_require__(867);
var selectbox_1 = __webpack_require__(868);
var customasynctypeahead_1 = __webpack_require__(165);
var textarea_1 = __webpack_require__(869);
var transforms_1 = __webpack_require__(164);
var step1 = function (user, InputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputOrganization", id: "organizationnameLabel" }, "Organization Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputOrganization", placeholder: "Organization Name", defaultValue: user.organizationname, ref: "organizationname", name: "organizationname", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "organizationnameError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", null, "Email"),
                React.createElement("p", { className: "form-control-static", "data-name": "email" }, user.email))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputFirstName", id: "firstnameLabel" }, "First Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputFirstName", placeholder: "First Name", defaultValue: user.firstname, ref: "firstname", name: "firstname", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "firstnameError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputLastName", id: "lastnameLabel" }, "Last Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputLastName", placeholder: "Last Name", defaultValue: user.lastname, ref: "lastname", name: "lastname", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "lastnameError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputPhoneNumber", id: "contact.phoneLabel" }, "Phone Number"),
                React.createElement("input", { type: "tel", className: "form-control", id: "inputPhoneNumber", placeholder: "Phone Number", defaultValue: user.contact.phone, ref: "contact.phone", name: "contact.phone", onChange: InputChange, required: true, pattern: "[0-9]{3}[ |-][0-9]{3}[ |-][0-9]{4}" }),
                React.createElement("div", { className: "error", id: "contact.phoneError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputWebsite", id: "websiteLabel" }, "Website"),
                React.createElement("input", { type: "url", className: "form-control", id: "inputWebsite", placeholder: "Website", defaultValue: user.website, ref: "website", name: "website", onChange: InputChange }),
                React.createElement("div", { className: "error", id: "websiteError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-12" },
                React.createElement("label", { htmlFor: "inputAddress1", id: "mailingAddress.address1Label" },
                    "Street Address 1 ",
                    React.createElement("span", { className: 'small text-muted' }, " (will not be shared with public) ")),
                React.createElement("input", { type: "text", className: "form-control", id: "inputAddress1", placeholder: "Street address, P O box, company name", defaultValue: user.mailingAddress.address1, ref: "mailingAddress.address1", name: "mailingAddress.address1", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.address1Error" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-12" },
                React.createElement("label", { htmlFor: "inputAddress2", id: "mailingAddress.address2Label" },
                    "Street Address 2 ",
                    React.createElement("span", { className: 'small text-muted' }, " (will not be shared with public) ")),
                React.createElement("input", { type: "text", className: "form-control", id: "inputAddress2", placeholder: "Apartment, suite, unit, building, floor, etc.", ref: "mailingAddress.address2", name: "mailingAddress.address2", onChange: InputChange }),
                React.createElement("div", { className: "error", id: "mailingAddress.address2Error" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputCity", id: "mailingAddress.cityLabel" }, "City"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputCity", placeholder: "City", defaultValue: user.mailingAddress.city, ref: "mailingAddress.city", name: "mailingAddress.city", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.cityError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectState", id: "mailingAddress.stateLabel" }, "State"),
                React.createElement(dropdown_1.Dropdown, { id: "selectState", name: "mailingAddress.state", value: user.mailingAddress.state, defaultOption: "Select State", inputRef: props.stateRef, labelField: "name", valueField: "abbreviation", onChange: DropDownChange, getResource: function () { return props.getResource('data.states.us'); }, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.stateError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputZipCode", id: "mailingAddress.zipcodeLabel" }, "Zip Code"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputZipCode", placeholder: "Zip Code", defaultValue: user.mailingAddress.zipcode, ref: "mailingAddress.zipcode", name: "mailingAddress.zipcode", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.zipcodeError" })))));
};
var step2 = function (user, InputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectJobsWithinMiles", id: "jobsWithinMilesLabel" }, "Jobs within"),
                React.createElement(dropdown_1.Dropdown, { id: "selectJobsWithinMiles", name: "jobsWithinMiles", labelField: "label", valueField: "value", value: user.jobsWithinMiles, inputRef: props.mileRef, defaultOption: "Select mile radius", getResource: function () { return props.getResource('data.miles'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "jobsWithinMilesError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputGroupAvailableTimes", id: "availableTimesLabel" }, "Availability"),
                React.createElement(checkboxlist_1.CheckboxList, { id: "inputGroupAvailableTimes", name: "availableTimes", labelField: "label", valueField: "value", checkAllValue: "Anytime", values: user.availableTimes, inputRef: props.availableTimesRef, getResource: function () { return props.getResource('data.availabletimes'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "availableTimesError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputGroupJobTypes", id: "jobTypesLabel" }, "Job Interested In"),
                React.createElement(selectbox_1.SelectBox, { id: "inputGroupJobTypes", name: "jobTypes", labelField: "label", valueField: "value", defaultOption: "All Jobs", values: user.jobTypes, inputRef: props.jobTypesRef, getResource: function () {
                        return props.getResource('settings.jobtypes', {
                            transformResponse: [transforms_1.transformSettings]
                        });
                    }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "jobTypesError" })))));
};
var step3 = function (user, handleInputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectWorkExperience", id: "workExperienceLabel" }, "Work/Business Experience"),
                React.createElement(dropdown_1.Dropdown, { id: "selectWorkExperience", name: "workExperience", labelField: "label", valueField: "value", key: "workExperience", value: user.workExperience, inputRef: props.workExperienceRef, defaultOption: "Select number of years", getResource: function () { return props.getResource('data.workexperience'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "workExperienceError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "typeAheadWorkAreas", id: "workAreasLabel" }, "Areas worked in"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadWorkAreas", name: "workAreas", selected: user.workAreas, inputRef: props.workAreasRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Area", getResource: function () { return props.getResource('typeaheads.workareas'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "workAreasError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectSkills", id: "skillsLabel" }, "Skills"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadSkills", name: "skills", selected: user.skills, inputRef: props.skillsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Skill", getResource: function () { return props.getResource('typeaheads.skills'); }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "skillsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "textDescription", id: "descriptionLabel" }, "Profile Description"),
                React.createElement(textarea_1.TextArea, { id: "textAreaDescription", name: "description", defaultMessage: "Type description upto 700 characters long.", value: user.description, inputRef: props.descriptionRef, onChange: handleInputChange, maxlength: 700, rows: 5, required: true }),
                React.createElement("div", { className: "error", id: "descriptionError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "typeAheadCertifications", id: "certificationsLabel" }, "Certifications/ Licenses"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadCertifications", name: "certifications", selected: user.certifications, inputRef: props.certificationsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Certifications", getResource: function () { return props.getResource('typeaheads.certifications'); }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "certificationsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "typeAheadAwards", id: "awardsLabel" }, "Awards/ Achievements"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadAwards", name: "awards", selected: user.awards, inputRef: props.awardsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Awards/ Achievements", getResource: function () { return props.getResource('typeaheads.awards'); }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "awardsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "typeAheadKeywords", id: "keywordsLabel" },
                    "Keywords for job interests",
                    React.createElement("span", { className: 'small text-muted' }, " (e.g. store; restaurant)")),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadkeywords", name: "keywords", selected: user.keywords, inputRef: props.keywordsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Keywords", getResource: function () { return props.getResource('typeaheads.keywords'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "keywordsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-sm" },
                React.createElement("div", { className: "custom-control custom-checkbox" },
                    React.createElement("input", { type: "checkbox", className: "custom-control-input", id: "checkReferences", name: "hasReferences", ref: "hasReferences", onChange: handleInputChange, defaultChecked: user.hasReferences }),
                    React.createElement("label", { htmlFor: "checkReferences", className: "custom-control-label", id: "hasReferencesLabel" }, "References available on request"))))));
};
exports.organizationdefs = function (props) {
    return [
        { state: 1, title: 'About the organization?', iconClass: 'fa fa-id-card',
            render: step1.bind(_this),
            props: props
        },
        { state: 2, title: 'What is it looking for?', iconClass: 'fa fa-bullseye', render: step2.bind(_this), props: props },
        { state: 3, title: 'Why choose this organization?', iconClass: 'fa fa-bullhorn', render: step3.bind(_this), props: props }
    ];
};


/***/ }),

/***/ 1192:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var dropdown_1 = __webpack_require__(813);
var checkboxlist_1 = __webpack_require__(867);
var selectbox_1 = __webpack_require__(868);
var customasynctypeahead_1 = __webpack_require__(165);
var textarea_1 = __webpack_require__(869);
var transforms_1 = __webpack_require__(164);
var step1 = function (user, InputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "form-group row" },
            React.createElement("label", { className: "col-2 col-form-label" }, "Email"),
            React.createElement("div", { className: "col-10" },
                React.createElement("p", { className: "form-control-static", "data-name": "email" }, user.email))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputFirstName", id: "firstnameLabel" }, "First Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputFirstName", placeholder: "First Name", defaultValue: user.firstname, ref: "firstname", name: "firstname", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "firstnameError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputLastName", id: "lastnameLabel" }, "Last Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputLastName", placeholder: "Last Name", defaultValue: user.lastname, ref: "lastname", name: "lastname", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "lastnameError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputPhoneNumber", id: "contact.phoneLabel" }, "Phone Number"),
                React.createElement("input", { type: "tel", className: "form-control", id: "inputPhoneNumber", placeholder: "Phone Number", defaultValue: user.contact.phone, ref: "contact.phone", name: "contact.phone", onChange: InputChange, required: true, pattern: "[0-9]{3}[ |-][0-9]{3}[ |-][0-9]{4}" }),
                React.createElement("div", { className: "error", id: "contact.phoneError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectAge", id: "ageRangeLabel" }, "Age"),
                React.createElement(dropdown_1.Dropdown, { id: "selectAge", name: "ageRange", labelField: "label", valueField: "value", value: user.ageRange, inputRef: props.ageRef, defaultOption: "Select age range", getResource: function () { return props.getResource('data.age'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "ageRangeError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-12" },
                React.createElement("label", { htmlFor: "inputAddress1", id: "mailingAddress.address1Label" },
                    "Street Address 1",
                    React.createElement("span", { className: 'small text-muted' }, " (will not be shared with public) ")),
                React.createElement("input", { type: "text", className: "form-control", id: "inputAddress1", placeholder: "Street address, P O box, company name", defaultValue: user.mailingAddress.address1, ref: "mailingAddress.address1", name: "mailingAddress.address1", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.address1Error" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-12" },
                React.createElement("label", { htmlFor: "inputAddress2", id: "mailingAddress.address2Label" },
                    "Street Address 2",
                    React.createElement("span", { className: 'small text-muted' }, " (will not be shared with public) ")),
                React.createElement("input", { type: "text", className: "form-control", id: "inputAddress2", placeholder: "Apartment, suite, unit, building, floor, etc.", ref: "mailingAddress.address2", name: "mailingAddress.address2", onChange: InputChange }),
                React.createElement("div", { className: "error", id: "mailingAddress.address2Error" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputCity", id: "mailingAddress.cityLabel" }, "City"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputCity", placeholder: "City", defaultValue: user.mailingAddress.city, ref: "mailingAddress.city", name: "mailingAddress.city", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.cityError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectState", id: "mailingAddress.stateLabel" }, "State"),
                React.createElement(dropdown_1.Dropdown, { id: "selectState", name: "mailingAddress.state", value: user.mailingAddress.state, defaultOption: "Select State", inputRef: props.stateRef, labelField: "name", valueField: "abbreviation", onChange: DropDownChange, getResource: function () { return props.getResource('data.states.us'); }, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.stateError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputZipCode", id: "mailingAddress.zipcodeLabel" }, "Zip Code"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputZipCode", placeholder: "Zip Code", defaultValue: user.mailingAddress.zipcode, ref: "mailingAddress.zipcode", name: "mailingAddress.zipcode", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.zipcodeError" })))));
};
var step2 = function (user, InputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectJobsWithinMiles", id: "jobsWithinMilesLabel" }, "Jobs within"),
                React.createElement(dropdown_1.Dropdown, { id: "selectJobsWithinMiles", name: "jobsWithinMiles", labelField: "label", valueField: "value", value: user.jobsWithinMiles, inputRef: props.mileRef, defaultOption: "Select mile radius", getResource: function () { return props.getResource('data.miles'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "jobsWithinMilesError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputGroupEmploymentTypes", id: "employmentTypesLabel" }, "Employment Type"),
                React.createElement(checkboxlist_1.CheckboxList, { id: "inputGroupEmploymentTypes", name: "employmentTypes", labelField: "label", valueField: "value", values: user.employmentTypes, inputRef: props.employmentTypesRef, getResource: function () { return props.getResource('data.employmenttypes'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "employmentTypesError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputGroupAvailableTimes", id: "availableTimesLabel" }, "Availability"),
                React.createElement(checkboxlist_1.CheckboxList, { id: "inputGroupAvailableTimes", name: "availableTimes", labelField: "label", valueField: "value", checkAllValue: "Anytime", values: user.availableTimes, inputRef: props.availableTimesRef, getResource: function () { return props.getResource('data.availabletimes'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "availableTimesError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputGroupJobTypes", id: "jobTypesLabel" }, "Job Interested In"),
                React.createElement(selectbox_1.SelectBox, { id: "inputGroupJobTypes", name: "jobTypes", labelField: "label", valueField: "value", defaultOption: "All Jobs", values: user.jobTypes, inputRef: props.jobTypesRef, getResource: function () {
                        return props.getResource('settings.jobtypes', {
                            transformResponse: [transforms_1.transformSettings]
                        });
                    }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "jobTypesError" })))));
};
var step3 = function (user, handleInputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectWorkExperience", id: "workExperienceLabel" }, "Work/Business Experience"),
                React.createElement(dropdown_1.Dropdown, { id: "selectWorkExperience", name: "workExperience", labelField: "label", valueField: "value", key: "workExperience", value: user.workExperience, inputRef: props.workExperienceRef, defaultOption: "Select number of years", getResource: function () { return props.getResource('data.workexperience'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "workExperienceError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectEducationLevel", id: "educationLevelLabel" }, "Education Level"),
                React.createElement(dropdown_1.Dropdown, { id: "selectEducationLevel", name: "educationLevel", labelField: "label", valueField: "value", value: user.educationLevel, inputRef: props.edlRef, defaultOption: "Select Education Level", getResource: function () { return props.getResource('data.educationlevel'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "educationLevelError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectWorkAreas", id: "workAreasLabel" }, "Areas worked in"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadWorkAreas", name: "workAreas", selected: user.workAreas, inputRef: props.workAreasRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Area", getResource: function () { return props.getResource('typeaheads.workareas'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "workAreasError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectSkills", id: "skillsLabel" }, "Skills"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadSkills", name: "skills", selected: user.skills, inputRef: props.skillsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Skill", getResource: function () { return props.getResource('typeaheads.skills'); }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "skillsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "textDescription", id: "descriptionLabel" }, "Profile Description"),
                React.createElement(textarea_1.TextArea, { id: "textAreaDescription", name: "description", defaultMessage: "Type description upto 700 characters long.", value: user.description, inputRef: props.descriptionRef, onChange: handleInputChange, maxlength: 700, rows: 5, required: true }),
                React.createElement("div", { className: "error", id: "descriptionError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectCertifications", id: "certificationsLabel" }, "Certifications/ Licenses"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadCertifications", name: "certifications", selected: user.certifications, inputRef: props.certificationsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Certifications", getResource: function () { return props.getResource('typeaheads.certifications'); }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "certificationsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectAwards", id: "awardsLabel" }, "Awards/ Achievements"),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadAwards", name: "awards", selected: user.awards, inputRef: props.awardsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Awards/ Achievements", getResource: function () { return props.getResource('typeaheads.awards'); }, onChange: DropDownChange }),
                React.createElement("div", { className: "error", id: "awardsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectKeywords", id: "keywordsLabel" },
                    "Keywords for job interests",
                    React.createElement("span", { className: 'small text-muted' }, " (e.g. store; restaurant)")),
                React.createElement(customasynctypeahead_1.CustomAsyncTypeAhead, { id: "typeAheadkeywords", name: "keywords", selected: user.keywords, inputRef: props.keywordsRef, allowNew: true, multiple: true, minLength: 2, defaultOption: "Add Keywords", getResource: function () { return props.getResource('typeaheads.keywords'); }, onChange: DropDownChange, required: true }),
                React.createElement("div", { className: "error", id: "keywordsError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: 'col-sm' },
                React.createElement("div", { className: "custom-control custom-checkbox" },
                    React.createElement("input", { type: "checkbox", className: "custom-control-input", id: "checkReferences", name: "hasReferences", ref: "hasReferences", onChange: handleInputChange, defaultChecked: user.hasReferences }),
                    React.createElement("label", { htmlFor: "checkReferences", className: "custom-control-label", id: "hasReferencesLabel" }, "References available on request"))))));
};
exports.userdefs = function (props) {
    return [
        { state: 1, title: 'Who am I?', iconClass: 'fa fa-id-card',
            render: step1.bind(_this),
            props: props
        },
        { state: 2, title: 'What am I looking for?', iconClass: 'fa fa-bullseye', render: step2.bind(_this), props: props },
        { state: 3, title: 'Why hire me?', iconClass: 'fa fa-bullhorn', render: step3.bind(_this), props: props }
    ];
};


/***/ }),

/***/ 1193:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var dropdown_1 = __webpack_require__(813);
var step1 = function (user, InputChange, DropDownChange, props) {
    return (React.createElement("div", { className: "form-bottom" },
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { className: "col-2 col-form-label" }, "Email"),
                React.createElement("div", { className: "col-10" },
                    React.createElement("p", { className: "form-control-static", "data-name": "email" }, user.email))),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputOrganization", id: "organizationnameLabel" }, "Organization Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputOrganization", placeholder: "Organization Name", defaultValue: user.organizationname, ref: "organizationname", name: "organizationname", onChange: InputChange }),
                React.createElement("div", { className: "error", id: "organizationnameError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputFirstName", id: "firstnameLabel" }, "First Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputFirstName", placeholder: "First Name", defaultValue: user.firstname, ref: "firstname", name: "firstname", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "firstnameError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputLastName", id: "lastnameLabel" }, "Last Name"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputLastName", placeholder: "Last Name", defaultValue: user.lastname, ref: "lastname", name: "lastname", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "lastnameError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputPhoneNumber", id: "contact.phoneLabel" }, "Phone Number"),
                React.createElement("input", { type: "tel", className: "form-control", id: "inputPhoneNumber", placeholder: "Phone Number", defaultValue: user.contact.phone, ref: "contact.phone", name: "contact.phone", onChange: InputChange, required: true, pattern: "[0-9]{3}[ |-][0-9]{3}[ |-][0-9]{4}" }),
                React.createElement("div", { className: "error", id: "contact.phoneError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-12" },
                React.createElement("label", { htmlFor: "inputAddress1", id: "mailingAddress.address1Label" },
                    "Street Address 1 ",
                    React.createElement("span", { className: 'small text-muted' }, " (will not be shared with public) ")),
                React.createElement("input", { type: "text", className: "form-control", id: "inputAddress1", placeholder: "Street address, P O box, company name", defaultValue: user.mailingAddress.address1, ref: "mailingAddress.address1", name: "mailingAddress.address1", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.address1Error" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-12" },
                React.createElement("label", { htmlFor: "inputAddress2", id: "mailingAddress.address2Label" },
                    "Street Address 2 ",
                    React.createElement("span", { className: 'small text-muted' }, " (will not be shared with public) ")),
                React.createElement("input", { type: "text", className: "form-control", id: "inputAddress2", placeholder: "Apartment, suite, unit, building, floor, etc.", ref: "mailingAddress.address2", name: "mailingAddress.address2", onChange: InputChange }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputCity", id: "mailingAddress.cityLabel" }, "City"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputCity", placeholder: "City", defaultValue: user.mailingAddress.city, ref: "mailingAddress.city", name: "mailingAddress.city", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.cityError" })),
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "selectState", id: "mailingAddress.stateLabel" }, "State"),
                React.createElement(dropdown_1.Dropdown, { id: "selectState", name: "mailingAddress.state", value: user.mailingAddress.state, defaultOption: "Select State", inputRef: props.stateRef, labelField: "name", valueField: "abbreviation", onChange: DropDownChange, getResource: function () { return props.getResource('data.states.us'); }, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.stateError" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "form-group col-sm" },
                React.createElement("label", { htmlFor: "inputZipCode", id: "mailingAddress.zipcodeLabel" }, "Zip Code"),
                React.createElement("input", { type: "text", className: "form-control", id: "inputZipCode", placeholder: "Zip Code", defaultValue: user.mailingAddress.zipcode, ref: "mailingAddress.zipcode", name: "mailingAddress.zipcode", onChange: InputChange, required: true }),
                React.createElement("div", { className: "error", id: "mailingAddress.zipcodeError" })))));
};
exports.employerdefs = function (props) {
    return [
        { state: 1, title: 'Who am I?', iconClass: 'fa fa-id-card',
            render: step1.bind(_this),
            props: props
        }
    ];
};


/***/ }),

/***/ 1194:
/***/ (function(module, exports, __webpack_require__) {

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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var axios_1 = __webpack_require__(54);
var authbasecomponent_1 = __webpack_require__(269);
var plans_1 = __webpack_require__(1196);
var confirm_1 = __webpack_require__(1195);
__webpack_require__(814);
var transforms_1 = __webpack_require__(164);
var beginStep = 1;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState());
        _this._bind('previousStep', 'nextStep', 'finishStep', 'submitData', 'updateSelected');
        return _this;
    }
    Main.prototype.componentDidMount = function () {
        var _this = this;
        //axios.get('/api/auth/external/authorization/user')
        //console.log('subscriptions mount');
        axios_1.default.all([
            this.getResource('user'),
            this.getResource('settings.subscriptions'),
            this.getResource('locals.paypal')
        ]).then(function (results) {
            var user = JSON.parse(results[0].data.toString());
            //let subscriptions = results[1].data;
            var subscriptions = JSON.parse(results[1].data.toString());
            var paypal = results[2].data;
            //console.log(user);
            //console.log(subscriptions);
            //console.log(paypal);
            _this.setState({
                user: user,
                paypal: paypal,
                subscriptions: subscriptions.map(transforms_1.transformSubscriptionDTO).filter(function (subscription) {
                    return subscription.usertype.indexOf(user.usertype) >= 0;
                })
            });
        });
    };
    Main.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            step: 1,
            user: null,
            subscriptions: []
        };
    };
    Main.prototype.render = function () {
        var _a = this.state, status = _a.status, message = _a.message, step = _a.step, user = _a.user, subscriptions = _a.subscriptions, paypal = _a.paypal, selected = _a.selected;
        var usercontext = this.props.location.query.usercontext;
        selected = selected ? selected :
            (user ? { usercontext: (usercontext || user.usercontext) } : null);
        var mprops = Object.assign({}, { status: status, message: message, step: step,
            selected: selected,
            user: user,
            updateSelected: this.updateSelected,
            nextStep: (step == 2 ? this.finishStep : this.nextStep),
            previousStep: this.previousStep });
        //loop through subscriptions
        //get selected plan if any
        //if selected plan then 
        //filter out lower price plans or inactive plans
        //and for the remaining plans calculate the upgrade price
        //else
        //include
        var userSubscription = user && user.subscriptions ? user.subscriptions.filter(function (subscription) {
            return subscription.usercontext.equals(selected.usercontext);
        }) : null;
        //console.log(userSubscription);
        var selSubscription = userSubscription && userSubscription.length > 0 ? subscriptions.filter(function (subscription) {
            return subscription.id == userSubscription[0].planid;
        }) : null;
        //console.log(selSubscription);
        var startdate = userSubscription && userSubscription[0] ? new Date(userSubscription[0].startdate) : new Date();
        var evalSubscription = function (subscription) {
            var tSubscription = {};
            if (selSubscription && selSubscription.length > 0) {
                var selSPrice = selSubscription[0].price;
                if (subscription.id == selSubscription[0].id) {
                    tSubscription = Object.assign({ state: 'current' }, subscription, userSubscription[0], {
                        price: null,
                        cprice: null
                    });
                }
                else if (subscription.price == null) {
                    tSubscription = Object.assign({ state: 'free' }, subscription, {
                        price: null,
                        cprice: null
                    });
                }
                else if (subscription.price < selSPrice) {
                    tSubscription = Object.assign({ state: 'disable' }, subscription, {
                        price: null,
                        cprice: null
                    });
                }
                else if (subscription.price > selSPrice) {
                    var _price = (subscription.price - selSPrice);
                    var _aprice = subscription.ispromoted == true ? subscription.promotionprice
                        : _price;
                    var _state = _aprice <= 0 ? 'free-promotion' : 'upgrade';
                    tSubscription = Object.assign({ state: _state }, subscription, {
                        price: _price,
                        cprice: _aprice,
                        startdate: startdate,
                        expirationdate: subscription.duration ? startdate.addDuration(subscription.duration) : null
                    });
                }
                else
                    tSubscription = Object.assign({}, subscription, {
                        _cprice: subscription.price
                    });
            }
            else {
                //console.log(subscription.promotionprice);
                //if subscription price is 0 then it will be marked as free with no activation needed
                //however if the actual price (_aprice) is 0 then it will be marked as free-promotion 
                //needing activation
                var _aprice = subscription.ispromoted == true ? subscription.promotionprice
                    : subscription.price;
                var _state = subscription.price == 0 ? 'free'
                    : (_aprice <= 0 ? 'free-promotion' : 'enable');
                tSubscription = Object.assign({ state: _state }, subscription, {
                    startdate: startdate,
                    cprice: _aprice,
                    expirationdate: subscription.duration ? startdate.addDuration(subscription.duration) : null
                });
            }
            return tSubscription;
        };
        var msubscriptions = subscriptions.filter(function (subscription) {
            //only active subscriptions, and those which the user is already subscribed to
            return subscription.active == true ||
                (selSubscription && selSubscription[0] && selSubscription[0].id == subscription.id);
        }).map(evalSubscription);
        var renderComponent = function (step) {
            switch (step) {
                case 1:
                    return React.createElement(plans_1.Plans, __assign({ key: 'plans', subscriptions: msubscriptions }, mprops));
                case 2:
                    return React.createElement(confirm_1.Confirm, __assign({ key: 'confirm', subscriptions: msubscriptions, paypal: paypal }, mprops));
            }
        };
        return React.createElement("div", { className: "container" }, renderComponent(step));
        /*         else{
                   return <div className="container">
                           <div className="alert alert-warning">
                               Please complete your <a href="/auth/profile">Profile</a> before choosing a subscription.
                           </div>
                          </div>;
                } */
    };
    Main.prototype.nextStep = function (data) {
        //   console.log(data);
        //   console.log('this is the next step');
        console.log(data);
        var step = this.state.step;
        this.setState(function (state) { return Object.assign(state, { step: step + 1 }, __assign({}, data)); });
    };
    Main.prototype.finishStep = function (data) {
        var user = this.state.user;
        //record subscription for user
        // console.log('this is the finish step');
        // console.log(data);
        // console.log(user);
        if (data) {
            this.submitData(data, beginStep, function () {
                //response redirect to page
                window.scrollTo(0, 0);
                window.sweetalert('Thanks for subscribing to the plan.');
                //console.log('you are registered!');
            });
        }
    };
    Main.prototype.previousStep = function () {
        var step = this.state.step;
        this.setState({ step: step - 1 });
    };
    Main.prototype.updateSelected = function (value) {
        this.setState(function (state) {
            state.selected = Object.assign({}, state.selected, value);
        });
    };
    Main.prototype.submitData = function (data, step, cb) {
        var self = this;
        //console.log('submit data');
        //console.log(data);
        return function () {
            //save data
            axios_1.default.post('/api/auth/external/authorization/subscription', data)
                .then(function (res) {
                var user = res.data ? JSON.parse(res.data.toString()) : null;
                self.setState(function (state) { return ({
                    status: true, message: '',
                    user: Object.assign({}, user),
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
    return Main;
}(authbasecomponent_1.AuthBaseComponent));
exports.Main = Main;


/***/ }),

/***/ 1195:
/***/ (function(module, exports, __webpack_require__) {

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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var paypalbutton_1 = __webpack_require__(1185);
var currency_1 = __webpack_require__(273);
var library_1 = __webpack_require__(105);
__webpack_require__(274);
__webpack_require__(814);
var Confirm = /** @class */ (function (_super) {
    __extends(Confirm, _super);
    function Confirm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState(), props);
        _this.onFailure = _this.onFailure.bind(_this);
        _this.onSuccess = _this.onSuccess.bind(_this);
        _this.onActivate = _this.onActivate.bind(_this);
        return _this;
    }
    Confirm.prototype.getInitialState = function () {
        return {
            status: true,
            message: ''
        };
    };
    Confirm.prototype.render = function () {
        var _this = this;
        var _a = this.state, subscriptions = _a.subscriptions, paypal = _a.paypal, selected = _a.selected, previousStep = _a.previousStep, status = _a.status, message = _a.message;
        var renderPlan = function () {
            var subscription = subscriptions ? subscriptions.filter(function (subscription) {
                return subscription.id == selected.planid;
            }) : null;
            selected.plan = subscription ? subscription[0] : null;
            var activate = selected.plan.cprice > 0 ? React.createElement("div", null,
                React.createElement(paypalbutton_1.PaypalButton, __assign({}, paypal, { amount: selected.plan.cprice, onSuccess: _this.onSuccess, onFailure: _this.onFailure })),
                React.createElement("span", { className: 'small text-muted' }, library_1.Library.MSG_PAYPAL_PAYMENT_INFO))
                : React.createElement("a", { href: '#', className: 'btn btn-primary', onClick: _this.onActivate }, "Activate");
            var date = new Date();
            return selected.plan ? React.createElement("div", { className: 'card' },
                React.createElement("div", { className: "card-body" },
                    React.createElement("h5", null,
                        selected.plan.usercontext
                            + ' Subscriptions: '
                            + selected.plan.title,
                        React.createElement("small", null,
                            React.createElement("a", { href: "#", className: "ml-1", onClick: previousStep }, "(Select another plan)"))),
                    React.createElement("p", { className: "card-text" }, selected.plan.description),
                    React.createElement("ul", { className: "card-text" }, selected.plan.features.map(function (feature, i) {
                        return React.createElement("li", { key: i }, feature);
                    })),
                    React.createElement("h6", { className: "display-4 text-center" },
                        React.createElement(currency_1.Currency, { value: selected.plan.cprice })),
                    React.createElement("p", { className: "card-text text-center" },
                        "Expires On: ",
                        selected.plan.expirationdate.toDisplay()),
                    React.createElement("div", { className: "card-text text-center" }, activate))) : 'Invalid Plan selected.';
        };
        var renderStatus = function (status, message) {
            return (message ? React.createElement("div", { className: 'alert ' + (status == true ?
                    'alert-success' : 'alert-danger') }, message) : '');
        };
        return React.createElement("div", { className: "container" },
            renderPlan(),
            renderStatus(status, message));
    };
    Confirm.prototype.onFailure = function (data) {
        this.setState(data);
    };
    Confirm.prototype.onActivate = function (e) {
        this.onSuccess({
            orderamount: 0
        });
    };
    Confirm.prototype.onSuccess = function (data) {
        var nextStep = this.props.nextStep;
        var selected = this.state.selected;
        if (nextStep && data) {
            //  console.log(data);
            nextStep(Object.assign({}, {
                usercontext: selected.usercontext,
                planid: selected.plan.id,
                orderid: data.orderID,
                orderamount: selected.plan.cprice,
                paymenttoken: data.paymentToken,
                payerid: data.payerID,
                paymentid: data.paymentID,
                paymentdate: Date.now(),
                startdate: selected.plan.startdate,
                expirationdate: selected.plan.expirationdate
            }));
        }
    };
    return Confirm;
}(React.Component));
exports.Confirm = Confirm;


/***/ }),

/***/ 1196:
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(1);
var currency_1 = __webpack_require__(273);
var common_1 = __webpack_require__(77);
__webpack_require__(814);
var types_1 = __webpack_require__(271);
var usercontexts = Object.keys(types_1.UserContextTypeMap);
var Plans = /** @class */ (function (_super) {
    __extends(Plans, _super);
    function Plans(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.contextSwitch = _this.contextSwitch.bind(_this);
        _this.subscribeClick = _this.subscribeClick.bind(_this);
        _this.renderPrice = _this.renderPrice.bind(_this);
        return _this;
    }
    /*
          public componentWillReceiveProps(nextProps){
              let {selected} = this.props;
              if(selected == null || !selected.usercontext.equals(nextProps.selected.usercontext)){
                  this.setState({selected: {usercontext: nextProps.selected.usercontext}});
              }
          }
     */
    Plans.prototype.render = function () {
        var _this = this;
        var _a = this.props, subscriptions = _a.subscriptions, user = _a.user, selected = _a.selected;
        var contextSwitch = this.contextSwitch;
        var evalprops = function (plan) {
            switch (plan.state) {
                case 'current':
                    return { class: 'border-primary', behavior: React.createElement("span", { className: "btn btn-primary" },
                            React.createElement("i", { className: "fa fa-check" }),
                            " Active") };
                case 'upgrade':
                    return { class: '',
                        behavior: React.createElement("a", { href: "#", className: "btn btn-primary", "data-planid": plan.id, onClick: _this.subscribeClick }, "Upgrade") };
                case 'disable':
                    return { class: 'disabled',
                        behavior: '' };
                case 'free':
                    return {
                        class: 'border-primary',
                        behavior: ''
                    };
                case 'free-promotion':
                    return {
                        class: 'border-primary',
                        behavior: React.createElement("a", { href: "#", className: "btn btn-primary", "data-planid": plan.id, onClick: _this.subscribeClick }, "Subscribe")
                    };
                case 'enable':
                default:
                    return { class: '',
                        behavior: React.createElement("a", { href: "#", className: "btn btn-primary", "data-planid": plan.id, onClick: _this.subscribeClick }, "Subscribe") };
            }
        };
        var planCard = function (plan, i) {
            var props = evalprops(plan);
            var prices = _this.renderPrice(plan);
            //  console.log('plan card....');
            return React.createElement("div", { className: 'card ' + props.class, key: 'card-' + i },
                React.createElement("div", { className: "card-body" },
                    React.createElement("h6", null, plan.title),
                    React.createElement("p", { className: "card-text" }, plan.description),
                    React.createElement("ul", { className: "card-text" }, plan.features.map(function (feature, i) {
                        return React.createElement("li", { key: i }, feature);
                    })),
                    React.createElement("h6", { className: "display-4 text-center" }, prices.map(function (price, i) {
                        if (prices.length > 1 && i == 0)
                            return React.createElement("span", { className: 'strikethrough mr-2 small text-muted', key: i }, price);
                        else
                            return React.createElement("span", { key: i }, price);
                    })),
                    React.createElement("p", { className: 'card-text text-center' }, (plan.expirationdate) ?
                        ['Expires On: ', new Date(plan.expirationdate).toDisplay()] : ''),
                    React.createElement("p", { className: "card-text text-center" }, props.behavior)));
        };
        var togglecontext = selected ? types_1.UserContextTypeMap[usercontexts.filter(function (usercontext) {
            return !usercontext.equals(selected.usercontext);
        })[0]] : '';
        var fSubscriptions = subscriptions ? subscriptions.filter(function (subscription) {
            return subscription.usercontext.equals(selected.usercontext);
        }) : null;
        var subscriptionContent = fSubscriptions && selected ? user['isregistered' + selected.usercontext.toLowerCase()] ?
            fSubscriptions.map(planCard) :
            React.createElement("div", { className: "alert alert-warning" },
                "Please complete your",
                React.createElement("a", { className: "alert-link", href: '/auth/profile?usercontext=' + selected.usercontext },
                    ' ' + common_1.functions.translate(selected.usercontext) + ' ',
                    " Profile "),
                "before activating your subscription.")
            : 'No Subscriptions found.';
        return React.createElement("div", { className: "container" },
            React.createElement("h5", { className: "pl-1 pt-3" },
                [common_1.functions.translate(selected && selected.usercontext ? selected.usercontext :
                        (user ? user.usercontext : usercontexts[0])), ' Subscriptions'],
                React.createElement("a", { className: "mx-1 highlight small", href: '#', onClick: contextSwitch, "data-usercontext": togglecontext }, 'Select ' + common_1.functions.translate(togglecontext) + ' Subscriptions')),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "justify-content-center card-deck" }, subscriptionContent)));
    };
    Plans.prototype.contextSwitch = function (e) {
        var t = e.target, usercontext = t.dataset.usercontext;
        this.props.updateSelected({ usercontext: usercontext });
    };
    Plans.prototype.subscribeClick = function (e) {
        var b = e.target, pi = b.dataset.planid, selected = this.props.selected;
        selected.planid = pi;
        //format subscription to user item 
        this.props.nextStep({ selected: selected });
    };
    Plans.prototype.renderPrice = function (plan) {
        var cprice = plan.cprice, ispromoted = plan.ispromoted, price = plan.price, state = plan.state;
        var formattedprice = price && price != 0 ?
            React.createElement(currency_1.Currency, { value: price }) : (/free*/.test(state) ? 'Free' : '');
        var formattedcprice = cprice && cprice != 0 ?
            React.createElement(currency_1.Currency, { value: cprice }) : (/free*/.test(state) ? 'Free' : '');
        var prices = [];
        if (ispromoted && cprice < price) {
            //display price strikethrough with cprice
            //if cprice == 0 then mark as free else the dollar amount
            prices = [formattedprice, formattedcprice];
        }
        else {
            //display price or
            //mark as free
            prices = [formattedcprice];
        }
        return prices;
    };
    return Plans;
}(React.Component));
exports.Plans = Plans;


/***/ }),

/***/ 1197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var Cache = /** @class */ (function () {
    function Cache(scripts) {
        var self = this;
        Object.keys(scripts).forEach(function (key) {
            var script = scripts[key];
            self[key] = {
                tag: Cache._scriptTag(key, script),
                onLoad: Cache._onLoad(key)
            };
        });
    }
    Cache._onLoad = function (key) {
        return function (cb) {
            var stored = Cache.scriptMap.get(key);
            if (stored) {
                stored.promise.then(function () {
                    stored.error ? cb(stored.error) : cb(null, stored);
                });
            }
            else {
                // TODO:
            }
        };
    };
    ;
    Cache._scriptTag = function (key, src) {
        if (!Cache.scriptMap.has(key)) {
            var tag_1 = document.createElement('script');
            var promise = new Promise(function (resolve, reject) {
                var resolved = false, errored = false, body = document.getElementsByTagName('body')[0];
                tag_1.type = 'text/javascript';
                tag_1.async = false; // Load in order
                var cbName = "loaderCB" + Cache.counter++ + Date.now();
                var cb;
                var handleResult = function (state) {
                    return function (evt) {
                        var stored = Cache.scriptMap.get(key);
                        if (state === 'loaded') {
                            stored.resolved = true;
                            resolve(src);
                            // stored.handlers.forEach(h => h.call(null, stored))
                            // stored.handlers = []
                        }
                        else if (state === 'error') {
                            stored.errored = true;
                            // stored.handlers.forEach(h => h.call(null, stored))
                            // stored.handlers = [];
                            reject(evt);
                        }
                        cleanup();
                    };
                };
                var cleanup = function () {
                    if (global[cbName] && typeof global[cbName] === 'function') {
                        global[cbName] = null;
                    }
                };
                tag_1.onload = handleResult('loaded');
                tag_1.onerror = handleResult('error');
                // Pick off callback, if there is one
                if (src.match(/callback=CALLBACK_NAME/)) {
                    src = src.replace(/(callback=)[^\&]+/, "$1" + cbName);
                    cb = window[cbName] = tag_1.onload;
                }
                else {
                    tag_1.addEventListener('load', tag_1.onload);
                }
                tag_1.addEventListener('error', tag_1.onerror);
                tag_1.src = src;
                var atag = tag_1;
                atag.onreadystatechange = function () {
                    handleResult(atag.readyState);
                };
                tag_1 = atag;
                body.appendChild(tag_1);
                return tag_1;
            });
            var initialState = {
                loaded: false,
                error: false,
                resolved: false,
                errored: false,
                promise: promise,
                tag: tag_1
            };
            Cache.scriptMap.set(key, initialState);
        }
        return Cache.scriptMap.get(key);
    };
    Cache.scriptMap = new Map();
    Cache.counter = 0;
    return Cache;
}());
exports.Cache = Cache;
exports.ScriptCache = (function (global) {
    return function ScriptCache(scripts) {
        var cache = new Cache(scripts);
        return cache;
    };
});
//export default ScriptCache;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(78)))

/***/ }),

/***/ 709:
/***/ (function(module, exports, __webpack_require__) {

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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var prop_types_1 = __webpack_require__(4);
var basecomponent_1 = __webpack_require__(55);
var main_1 = __webpack_require__(1188);
var main_2 = __webpack_require__(1194);
var changepassword_1 = __webpack_require__(1178);
var paymenthistory_1 = __webpack_require__(1179);
var common_1 = __webpack_require__(77);
var Profile = /** @class */ (function (_super) {
    __extends(Profile, _super);
    function Profile(props) {
        var _this = _super.call(this, props) || this;
        _this.tabs = [
            { tag: 'profile', label: 'Profile', icon: 'fa-user' },
            { tag: 'changepassword', label: 'Change Password', icon: 'fa-key' },
            { tag: 'paymenthistory', label: 'Payment History', icon: 'fa-history' },
            { tag: 'subscriptions', label: 'Subscriptions', icon: 'fa-superpowers' }
        ];
        _this.renderContent = function (tab, props) {
            switch (tab.tag) {
                case 'profile':
                    return React.createElement(main_1.Main, __assign({}, props));
                case 'subscriptions':
                    return React.createElement(main_2.Main, __assign({}, props));
                case 'changepassword':
                    return React.createElement(changepassword_1.ChangePassword, __assign({}, props));
                case 'paymenthistory':
                    return React.createElement(paymenthistory_1.PaymentHistory, __assign({}, props));
            }
        };
        _this.renderTabs = function (tab) {
            var clickHandler = this.clickTab;
            //console.log('in render tabs');
            //console.log(this.steps);
            //console.log(step);
            return this.tabs.map(function (d, itab) {
                return React.createElement("li", { key: 'tab-' + itab, className: 'parent' + ((d.tag == tab.tag) ? ' selected' : '') },
                    React.createElement("a", { href: '/auth/profile/' + d.tag, "data-tag": d.tag, onClick: clickHandler }, [React.createElement("i", { key: 0, className: 'fa ' + d.icon }), ' ', d.label]));
            });
        };
        _this.clickTab = function (e) {
            var tag = e.target.getAttribute('data-tag');
            var tab = this.tabs.filter(function (tab) {
                return tab.tag == tag;
            });
            tab = tab ? tab[0] : this.tabs[0];
            this.toggleContent(e);
            this.setState({
                tab: tab
            });
        };
        _this.toggleContent = function (e) {
            var content = common_1.functions.findAncestor(e.target, 'row-offcanvas');
            if (content)
                content.classList.toggle('active');
        };
        // set initial state
        //this.state = props.session || {isAuthenticated: false, user: null};
        var _tabs = props.params.tab ? _this.tabs.filter(function (tab) {
            return tab.tag.toLowerCase() == props.params.tab.toLowerCase();
        }) : null, tab = _tabs ? _tabs[0] : _this.tabs[0];
        _this.state = Object.assign({}, _this.getInitialState(), props, { tab: tab });
        _this._bind('renderTabs', 'renderContent', 'clickTab', 'toggleContent');
        return _this;
    }
    Profile.prototype.getInitialState = function () {
        return {
            status: true,
            message: '',
            tab: this.tabs[0],
            user: {}
        };
    };
    Profile.prototype.componentWillReceiveProps = function (nextProps) {
        //console.log('am in component will receive props');
    };
    Profile.prototype.componentWillMount = function () {
        //initialize context
        //console.log('profile will mount');
        if (!this.context.data) {
            if (typeof (window) !== 'undefined') {
                // console.log(window['_INITIAL_STATE']);            
                this.context.data = window['_INITIAL_STATE'] || { session: {} };
                //console.log(this.context.data);
            }
            else
                this.context.data = { session: {} };
        }
    };
    Profile.prototype.componentDidMount = function () {
        //console.log('am in component did mount');
    };
    Profile.prototype.render = function () {
        //const {session} = this.context.data;
        var _a = this.state, status = _a.status, message = _a.message, tab = _a.tab, user = _a.user, location = _a.location;
        var alert;
        var cprops = Object.assign({}, { location: location });
        //if(!session.user.isverified){
        //   opts['disabled'] = 'disabled';
        //    alert = <div className="alert alert-warning">Please verify your email address before continuing</div>
        //}
        return (React.createElement("div", { className: "wide-main-page row no-gutters row-offcanvas row-offcanvas-left" },
            React.createElement("nav", { className: "col-6 col-md-3 sidebar-offcanvas" },
                React.createElement("ul", { className: "list-group", id: "left-nav-tabs" }, this.renderTabs(tab))),
            React.createElement("main", { className: "col-12 col-md-9 exhibit" },
                this.renderContent(tab, cprops),
                React.createElement("span", { className: "nav-pane-toggle", title: "Show Exhibit Navigation", onClick: this.toggleContent },
                    React.createElement("i", { className: "fa fa-angle-left" })))));
    };
    ; /*render*/
    Profile.contextTypes = {
        data: prop_types_1.PropTypes.oneOfType([prop_types_1.PropTypes.object, prop_types_1.PropTypes.array])
    };
    return Profile;
}(basecomponent_1.BaseComponent));
exports.default = Profile;


/***/ }),

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



//
/* harmony default export */ __webpack_exports__["a"] = ({
  get: get,
  set: set,
  takeRight: takeRight,
  last: last,
  orderBy: orderBy,
  range: range,
  remove: remove,
  clone: clone,
  getFirstDefined: getFirstDefined,
  sum: sum,
  makeTemplateComponent: makeTemplateComponent,
  groupBy: groupBy,
  isArray: isArray,
  splitProps: splitProps,
  compactObject: compactObject,
  isSortingDesc: isSortingDesc,
  normalizeComponent: normalizeComponent,
  asPx: asPx
});

function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  var pathObj = makePathArray(path);
  var val = void 0;
  try {
    val = pathObj.reduce(function (current, pathPart) {
      return current[pathPart];
    }, obj);
  } catch (e) {
    // continue regardless of error
  }
  return typeof val !== 'undefined' ? val : def;
}

function set() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments[1];
  var value = arguments[2];

  var keys = makePathArray(path);
  var keyPart = void 0;
  var cursor = obj;
  while ((keyPart = keys.shift()) && keys.length) {
    if (!cursor[keyPart]) {
      cursor[keyPart] = {};
    }
    cursor = cursor[keyPart];
  }
  cursor[keyPart] = value;
  return obj;
}

function takeRight(arr, n) {
  var start = n > arr.length ? 0 : arr.length - n;
  return arr.slice(start);
}

function last(arr) {
  return arr[arr.length - 1];
}

function range(n) {
  var arr = [];
  for (var i = 0; i < n; i += 1) {
    arr.push(n);
  }
  return arr;
}

function orderBy(arr, funcs, dirs, indexKey) {
  return arr.sort(function (rowA, rowB) {
    for (var i = 0; i < funcs.length; i += 1) {
      var comp = funcs[i];
      var desc = dirs[i] === false || dirs[i] === 'desc';
      var sortInt = comp(rowA, rowB);
      if (sortInt) {
        return desc ? -sortInt : sortInt;
      }
    }
    // Use the row index for tie breakers
    return dirs[0] ? rowA[indexKey] - rowB[indexKey] : rowB[indexKey] - rowA[indexKey];
  });
}

function remove(a, b) {
  return a.filter(function (o, i) {
    var r = b(o);
    if (r) {
      a.splice(i, 1);
      return true;
    }
    return false;
  });
}

function clone(a) {
  try {
    return JSON.parse(JSON.stringify(a, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }));
  } catch (e) {
    return a;
  }
}

function getFirstDefined() {
  for (var i = 0; i < arguments.length; i += 1) {
    if (typeof (arguments.length <= i ? undefined : arguments[i]) !== 'undefined') {
      return arguments.length <= i ? undefined : arguments[i];
    }
  }
}

function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function makeTemplateComponent(compClass, displayName) {
  if (!displayName) {
    throw new Error('No displayName found for template component:', compClass);
  }
  var cmp = function cmp(_ref) {
    var children = _ref.children,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      _extends({ className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(compClass, className) }, rest),
      children
    );
  };
  cmp.displayName = displayName;
  return cmp;
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x, i) {
    var resKey = typeof key === 'function' ? key(x, i) : x[key];
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
    rv[resKey].push(x);
    return rv;
  }, {});
}

function asPx(value) {
  value = Number(value);
  return Number.isNaN(value) ? null : value + 'px';
}

function isArray(a) {
  return Array.isArray(a);
}

// ########################################################################
// Non-exported Helpers
// ########################################################################

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i += 1) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function splitProps(_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      rest = _objectWithoutProperties(_ref2, ['className', 'style']);

  return {
    className: className,
    style: style,
    rest: rest || {}
  };
}

function compactObject(obj) {
  var newObj = {};
  if (obj) {
    Object.keys(obj).map(function (key) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined && typeof obj[key] !== 'undefined') {
        newObj[key] = obj[key];
      }
      return true;
    });
  }
  return newObj;
}

function isSortingDesc(d) {
  return !!(d.sort === 'desc' || d.desc === true || d.asc === false);
}

function normalizeComponent(Comp) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Comp;

  return typeof Comp === 'function' ? Object.getPrototypeOf(Comp).isReactComponent ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Comp, params) : Comp(params) : fallback;
}


/***/ }),

/***/ 812:
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(1);
//import {ReactTable} from 'react-table';
__webpack_require__(816);
var ReactTable;
if (typeof window !== 'undefined')
    ReactTable = __webpack_require__(857).default;
var DataGrid = /** @class */ (function (_super) {
    __extends(DataGrid, _super);
    function DataGrid(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialState(), props);
        return _this;
    }
    DataGrid.prototype.getInitialState = function () {
        return {
            rows: []
        };
    };
    DataGrid.prototype.componentDidMount = function () {
    };
    DataGrid.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.rows)
            this.setState({
                rows: nextProps.rows
            });
    };
    DataGrid.prototype.render = function () {
        var columndefs = this.props.columndefs;
        var tsettings = Object.assign({}, {
            getTdProps: function (state, rowInfo, column, instance) {
                //               console.log('td props');
                //               console.log(column);
                return {};
            }
        });
        var rows = this.state.rows;
        var mcolumndefs = columndefs.map(function (def) {
            return {
                Header: def.name,
                id: def.key,
                accessor: function (item) {
                    return def.cell ? def.cell(item, def.key) : item[def.key];
                },
                sortMethod: def.sort ? def.sort : null
            };
        });
        var renderGrid = ReactTable ? React.createElement(ReactTable, { key: 'table', columns: mcolumndefs, className: 'table', data: rows }) : ''; // : 'Loading....'
        return (React.createElement("div", { className: "my-2 container data-grid" }, renderGrid));
    };
    return DataGrid;
}(React.Component));
exports.DataGrid = DataGrid;


/***/ }),

/***/ 813:
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(11);
var common_1 = __webpack_require__(77);
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(props) {
        var _this = _super.call(this, props) || this;
        // set initial state
        //console.log('in constructor');
        _this.state = Object.assign({}, _this.getInitialState(), { selected: _this.getSelectedFromProps(props) });
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    Dropdown.prototype.componentWillMount = function () {
        var _this = this;
        //console.log('am in component will mount');
        this.props.getResource().then(function (res) {
            if (res && res.data) {
                _this.setState(function (state) { return ({
                    options: Object.assign([], state.options, res.data)
                }); });
                // this.setState({options: res.data});        
            }
        });
    };
    Dropdown.prototype.componentDidUpdate = function (prevProps, prevState) {
        //IE Fix 
        //for validation API to mark it as valid appropriately when default selected
        //requires toggling the selection
        if (common_1.functions.detectIE()) {
            var elem = ReactDOM.findDOMNode(this);
            var si = -1;
            if (elem && prevState.options.length < 1) {
                //check for prevState.options.length < 1 
                //to ensure execution only after the options are loaded asyncrhonously
                si = elem.selectedIndex;
                var opts = elem.options;
                var ti = (si + 1) % opts.length;
                opts.item(ti).selected = true;
                opts.item(si).selected = true;
            }
        }
    };
    Dropdown.prototype.componentWillReceiveProps = function (nextProps) {
    };
    Dropdown.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            options: []
        };
    };
    Dropdown.prototype.render = function () {
        var _a = this.props, id = _a.id, name = _a.name, options = _a.options, value = _a.value, valueField = _a.valueField, labelField = _a.labelField, inputRef = _a.inputRef, required = _a.required;
        var selected = this.state.selected;
        var soptions = this.state.options.map(function (o, i) {
            return React.createElement("option", { key: name + '-' + i, value: o[valueField] }, o[labelField]);
        });
        var defOption;
        if (this.props.defaultOption) {
            defOption = React.createElement("option", { value: "" }, this.props.defaultOption);
        }
        return (React.createElement("select", { id: '_' + id, className: "form-control", name: name, ref: inputRef, onChange: this.handleChange, value: selected, required: required },
            defOption,
            soptions));
    };
    Dropdown.prototype.getSelectedFromProps = function (props) {
        var selected;
        //console.log('in getselectedfromprops');
        //console.log(props.value);
        if (props.value === null && props.options.length !== 0) {
            selected = props.options[0][props.valueField];
        }
        else {
            selected = props.value;
        }
        return selected;
    };
    Dropdown.prototype.handleChange = function (e) {
        e.preventDefault();
        if (this.props.onChange) {
            var change = {
                oldValue: this.state.selected,
                newValue: e.target.value,
                name: e.target.name,
                required: this.props.required
            };
            this.props.onChange(change);
        }
        this.setState({ selected: e.target.value });
    };
    return Dropdown;
}(React.Component));
exports.Dropdown = Dropdown;


/***/ }),

/***/ 814:
/***/ (function(module, exports) {

String.prototype.equals = function (s) {
    return new RegExp(this, 'ig').test(s);
};


/***/ }),

/***/ 815:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(706)(false);
// imports


// module
exports.push([module.i, ".ReactTable{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;border:1px solid rgba(0,0,0,0.1);}.ReactTable *{box-sizing:border-box}.ReactTable .rt-table{-webkit-box-flex:1;-ms-flex:auto 1;flex:auto 1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;width:100%;border-collapse:collapse;overflow:auto}.ReactTable .rt-thead{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.ReactTable .rt-thead.-headerGroups{background:rgba(0,0,0,0.03);border-bottom:1px solid rgba(0,0,0,0.05)}.ReactTable .rt-thead.-filters{border-bottom:1px solid rgba(0,0,0,0.05);}.ReactTable .rt-thead.-filters input,.ReactTable .rt-thead.-filters select{border:1px solid rgba(0,0,0,0.1);background:#fff;padding:5px 7px;font-size:inherit;border-radius:3px;font-weight:normal;outline:none}.ReactTable .rt-thead.-filters .rt-th{border-right:1px solid rgba(0,0,0,0.02)}.ReactTable .rt-thead.-header{box-shadow:0 2px 15px 0 rgba(0,0,0,0.15)}.ReactTable .rt-thead .rt-tr{text-align:center}.ReactTable .rt-thead .rt-th,.ReactTable .rt-thead .rt-td{padding:5px 5px;line-height:normal;position:relative;border-right:1px solid rgba(0,0,0,0.05);transition:box-shadow .3s cubic-bezier(.175,.885,.32,1.275);box-shadow:inset 0 0 0 0 transparent;}.ReactTable .rt-thead .rt-th.-sort-asc,.ReactTable .rt-thead .rt-td.-sort-asc{box-shadow:inset 0 3px 0 0 rgba(0,0,0,0.6)}.ReactTable .rt-thead .rt-th.-sort-desc,.ReactTable .rt-thead .rt-td.-sort-desc{box-shadow:inset 0 -3px 0 0 rgba(0,0,0,0.6)}.ReactTable .rt-thead .rt-th.-cursor-pointer,.ReactTable .rt-thead .rt-td.-cursor-pointer{cursor:pointer}.ReactTable .rt-thead .rt-th:last-child,.ReactTable .rt-thead .rt-td:last-child{border-right:0}.ReactTable .rt-thead .rt-resizable-header{overflow:visible;}.ReactTable .rt-thead .rt-resizable-header:last-child{overflow:hidden}.ReactTable .rt-thead .rt-resizable-header-content{overflow:hidden;text-overflow:ellipsis}.ReactTable .rt-thead .rt-header-pivot{border-right-color:#f7f7f7}.ReactTable .rt-thead .rt-header-pivot:after,.ReactTable .rt-thead .rt-header-pivot:before{left:100%;top:50%;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none}.ReactTable .rt-thead .rt-header-pivot:after{border-color:rgba(255,255,255,0);border-left-color:#fff;border-width:8px;margin-top:-8px}.ReactTable .rt-thead .rt-header-pivot:before{border-color:rgba(102,102,102,0);border-left-color:#f7f7f7;border-width:10px;margin-top:-10px}.ReactTable .rt-tbody{-webkit-box-flex:99999;-ms-flex:99999 1 auto;flex:99999 1 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;overflow:auto;}.ReactTable .rt-tbody .rt-tr-group{border-bottom:solid 1px rgba(0,0,0,0.05);}.ReactTable .rt-tbody .rt-tr-group:last-child{border-bottom:0}.ReactTable .rt-tbody .rt-td{border-right:1px solid rgba(0,0,0,0.02);}.ReactTable .rt-tbody .rt-td:last-child{border-right:0}.ReactTable .rt-tbody .rt-expandable{cursor:pointer}.ReactTable .rt-tr-group{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.ReactTable .rt-tr{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.ReactTable .rt-th,.ReactTable .rt-td{-webkit-box-flex:1;-ms-flex:1 0 0px;flex:1 0 0;white-space:nowrap;text-overflow:ellipsis;padding:7px 5px;overflow:hidden;transition:.3s ease;transition-property:width,min-width,padding,opacity;}.ReactTable .rt-th.-hidden,.ReactTable .rt-td.-hidden{width:0 !important;min-width:0 !important;padding:0 !important;border:0 !important;opacity:0 !important}.ReactTable .rt-expander{display:inline-block;position:relative;margin:0;color:transparent;margin:0 10px;}.ReactTable .rt-expander:after{content:'';position:absolute;width:0;height:0;top:50%;left:50%;-webkit-transform:translate(-50%,-50%) rotate(-90deg);transform:translate(-50%,-50%) rotate(-90deg);border-left:5.04px solid transparent;border-right:5.04px solid transparent;border-top:7px solid rgba(0,0,0,0.8);transition:all .3s cubic-bezier(.175,.885,.32,1.275);cursor:pointer}.ReactTable .rt-expander.-open:after{-webkit-transform:translate(-50%,-50%) rotate(0);transform:translate(-50%,-50%) rotate(0)}.ReactTable .rt-resizer{display:inline-block;position:absolute;width:36px;top:0;bottom:0;right:-18px;cursor:col-resize;z-index:10}.ReactTable .rt-tfoot{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;box-shadow:0 0 15px 0 rgba(0,0,0,0.15);}.ReactTable .rt-tfoot .rt-td{border-right:1px solid rgba(0,0,0,0.05);}.ReactTable .rt-tfoot .rt-td:last-child{border-right:0}.ReactTable.-striped .rt-tr.-odd{background:rgba(0,0,0,0.03)}.ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover{background:rgba(0,0,0,0.05)}.ReactTable .-pagination{z-index:1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:3px;box-shadow:0 0 15px 0 rgba(0,0,0,0.1);border-top:2px solid rgba(0,0,0,0.1);}.ReactTable .-pagination input,.ReactTable .-pagination select{border:1px solid rgba(0,0,0,0.1);background:#fff;padding:5px 7px;font-size:inherit;border-radius:3px;font-weight:normal;outline:none}.ReactTable .-pagination .-btn{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;width:100%;height:100%;border:0;border-radius:3px;padding:6px;font-size:1em;color:rgba(0,0,0,0.6);background:rgba(0,0,0,0.1);transition:all .1s ease;cursor:pointer;outline:none;}.ReactTable .-pagination .-btn[disabled]{opacity:.5;cursor:default}.ReactTable .-pagination .-btn:not([disabled]):hover{background:rgba(0,0,0,0.3);color:#fff}.ReactTable .-pagination .-previous,.ReactTable .-pagination .-next{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center}.ReactTable .-pagination .-center{-webkit-box-flex:1.5;-ms-flex:1.5;flex:1.5;text-align:center;margin-bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.ReactTable .-pagination .-pageInfo{display:inline-block;margin:3px 10px;white-space:nowrap}.ReactTable .-pagination .-pageJump{display:inline-block;}.ReactTable .-pagination .-pageJump input{width:70px;text-align:center}.ReactTable .-pagination .-pageSizeOptions{margin:3px 10px}.ReactTable .rt-noData{display:block;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background:rgba(255,255,255,0.8);transition:all .3s ease;z-index:1;pointer-events:none;padding:20px;color:rgba(0,0,0,0.5)}.ReactTable .-loading{display:block;position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(255,255,255,0.8);transition:all .3s ease;z-index:-1;opacity:0;pointer-events:none;}.ReactTable .-loading > div{position:absolute;display:block;text-align:center;width:100%;top:50%;left:0;font-size:15px;color:rgba(0,0,0,0.6);-webkit-transform:translateY(-52%);transform:translateY(-52%);transition:all .3s cubic-bezier(.25,.46,.45,.94)}.ReactTable .-loading.-active{opacity:1;z-index:2;pointer-events:all;}.ReactTable .-loading.-active > div{-webkit-transform:translateY(50%);transform:translateY(50%)}.ReactTable .rt-resizing .rt-th,.ReactTable .rt-resizing .rt-td{transition:none !important;cursor:col-resize;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}", ""]);

// exports


/***/ }),

/***/ 816:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(815);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(707)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../css-loader/index.js!./react-table.css", function() {
			var newContent = require("!!../css-loader/index.js!./react-table.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pagination__ = __webpack_require__(860);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



//



var emptyObj = function emptyObj() {
  return {};
};

/* harmony default export */ __webpack_exports__["a"] = ({
  // General
  data: [],
  loading: false,
  showPagination: true,
  showPaginationTop: false,
  showPaginationBottom: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  defaultPageSize: 20,
  showPageJump: true,
  collapseOnSortingChange: true,
  collapseOnPageChange: true,
  collapseOnDataChange: true,
  freezeWhenExpanded: false,
  sortable: true,
  multiSort: true,
  resizable: true,
  filterable: false,
  defaultSortDesc: false,
  defaultSorted: [],
  defaultFiltered: [],
  defaultResized: [],
  defaultExpanded: {},
  // eslint-disable-next-line no-unused-vars
  defaultFilterMethod: function defaultFilterMethod(filter, row, column) {
    var id = filter.pivotId || filter.id;
    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
  },
  // eslint-disable-next-line no-unused-vars
  defaultSortMethod: function defaultSortMethod(a, b, desc) {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? '' : a;
    b = b === null || b === undefined ? '' : b;
    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    // returning 0, undefined or any falsey value will use subsequent sorts or
    // the index as a tiebreaker
    return 0;
  },

  // Controlled State Props
  // page: undefined,
  // pageSize: undefined,
  // sorted: [],
  // filtered: [],
  // resized: [],
  // expanded: {},

  // Controlled State Callbacks
  onPageChange: undefined,
  onPageSizeChange: undefined,
  onSortedChange: undefined,
  onFilteredChange: undefined,
  onResizedChange: undefined,
  onExpandedChange: undefined,

  // Pivoting
  pivotBy: undefined,

  // Key Constants
  pivotValKey: '_pivotVal',
  pivotIDKey: '_pivotID',
  subRowsKey: '_subRows',
  aggregatedKey: '_aggregated',
  nestingLevelKey: '_nestingLevel',
  originalKey: '_original',
  indexKey: '_index',
  groupedByPivotKey: '_groupedByPivot',

  // Server-side Callbacks
  onFetchData: function onFetchData() {
    return null;
  },

  // Classes
  className: '',
  style: {},

  // Component decorators
  getProps: emptyObj,
  getTableProps: emptyObj,
  getTheadGroupProps: emptyObj,
  getTheadGroupTrProps: emptyObj,
  getTheadGroupThProps: emptyObj,
  getTheadProps: emptyObj,
  getTheadTrProps: emptyObj,
  getTheadThProps: emptyObj,
  getTheadFilterProps: emptyObj,
  getTheadFilterTrProps: emptyObj,
  getTheadFilterThProps: emptyObj,
  getTbodyProps: emptyObj,
  getTrGroupProps: emptyObj,
  getTrProps: emptyObj,
  getTdProps: emptyObj,
  getTfootProps: emptyObj,
  getTfootTrProps: emptyObj,
  getTfootTdProps: emptyObj,
  getPaginationProps: emptyObj,
  getLoadingProps: emptyObj,
  getNoDataProps: emptyObj,
  getResizerProps: emptyObj,

  // Global Column Defaults
  column: {
    // Renderers
    Cell: undefined,
    Header: undefined,
    Footer: undefined,
    Aggregated: undefined,
    Pivot: undefined,
    PivotValue: undefined,
    Expander: undefined,
    Filter: undefined,
    // All Columns
    sortable: undefined, // use table default
    resizable: undefined, // use table default
    filterable: undefined, // use table default
    show: true,
    minWidth: 100,
    // Cells only
    className: '',
    style: {},
    getProps: emptyObj,
    // Pivot only
    aggregate: undefined,
    // Headers only
    headerClassName: '',
    headerStyle: {},
    getHeaderProps: emptyObj,
    // Footers only
    footerClassName: '',
    footerStyle: {},
    getFooterProps: emptyObj,
    filterMethod: undefined,
    filterAll: false,
    sortMethod: undefined
  },

  // Global Expander Column Defaults
  expanderDefaults: {
    sortable: false,
    resizable: false,
    filterable: false,
    width: 35
  },

  pivotDefaults: {
    // extend the defaults for pivoted columns here
  },

  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  noDataText: 'No rows found',
  pageText: 'Page',
  ofText: 'of',
  rowsText: 'rows',

  // Components
  TableComponent: function TableComponent(_ref) {
    var children = _ref.children,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      _extends({
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('rt-table', className),
        role: 'grid'
        // tabIndex='0'
      }, rest),
      children
    );
  },
  TheadComponent: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].makeTemplateComponent('rt-thead', 'Thead'),
  TbodyComponent: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].makeTemplateComponent('rt-tbody', 'Tbody'),
  TrGroupComponent: function TrGroupComponent(_ref2) {
    var children = _ref2.children,
        className = _ref2.className,
        rest = _objectWithoutProperties(_ref2, ['children', 'className']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      _extends({
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('rt-tr-group', className),
        role: 'rowgroup'
      }, rest),
      children
    );
  },
  TrComponent: function TrComponent(_ref3) {
    var children = _ref3.children,
        className = _ref3.className,
        rest = _objectWithoutProperties(_ref3, ['children', 'className']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      _extends({
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('rt-tr', className),
        role: 'row'
      }, rest),
      children
    );
  },
  ThComponent: function ThComponent(_ref4) {
    var toggleSort = _ref4.toggleSort,
        className = _ref4.className,
        children = _ref4.children,
        rest = _objectWithoutProperties(_ref4, ['toggleSort', 'className', 'children']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      _extends({
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('rt-th', className),
        onClick: function onClick(e) {
          return toggleSort && toggleSort(e);
        },
        role: 'columnheader',
        tabIndex: '-1' // Resolves eslint issues without implementing keyboard navigation incorrectly
      }, rest),
      children
    );
  },
  TdComponent: function TdComponent(_ref5) {
    var toggleSort = _ref5.toggleSort,
        className = _ref5.className,
        children = _ref5.children,
        rest = _objectWithoutProperties(_ref5, ['toggleSort', 'className', 'children']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      _extends({
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('rt-td', className),
        role: 'gridcell'
      }, rest),
      children
    );
  },
  TfootComponent: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].makeTemplateComponent('rt-tfoot', 'Tfoot'),
  FilterComponent: function FilterComponent(_ref6) {
    var filter = _ref6.filter,
        _onChange = _ref6.onChange;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
      type: 'text',
      style: {
        width: '100%'
      },
      value: filter ? filter.value : '',
      onChange: function onChange(event) {
        return _onChange(event.target.value);
      }
    });
  },
  ExpanderComponent: function ExpanderComponent(_ref7) {
    var isExpanded = _ref7.isExpanded;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('rt-expander', isExpanded && '-open') },
      '\u2022'
    );
  },
  PivotValueComponent: function PivotValueComponent(_ref8) {
    var subRows = _ref8.subRows,
        value = _ref8.value;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      value,
      ' ',
      subRows && '(' + subRows.length + ')'
    );
  },
  AggregatedComponent: function AggregatedComponent(_ref9) {
    var subRows = _ref9.subRows,
        column = _ref9.column;

    var previewValues = subRows.filter(function (d) {
      return typeof d[column.id] !== 'undefined';
    }).map(function (row, i) {
      return (
        // eslint-disable-next-line react/no-array-index-key
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { key: i },
          row[column.id],
          i < subRows.length - 1 ? ', ' : ''
        )
      );
    });
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      previewValues
    );
  },
  PivotComponent: undefined, // this is a computed default generated using
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: __WEBPACK_IMPORTED_MODULE_3__pagination__["a" /* default */],
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: function LoadingComponent(_ref10) {
    var className = _ref10.className,
        loading = _ref10.loading,
        loadingText = _ref10.loadingText,
        rest = _objectWithoutProperties(_ref10, ['className', 'loading', 'loadingText']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      _extends({
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('-loading', { '-active': loading }, className)
      }, rest),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: '-loading-inner' },
        loadingText
      )
    );
  },
  NoDataComponent: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].makeTemplateComponent('rt-noData', 'NoData'),
  ResizerComponent: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].makeTemplateComponent('rt-resizer', 'Resizer'),
  PadRowComponent: function PadRowComponent() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      null,
      '\xA0'
    );
  }
});


/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactTableDefaults", function() { return ReactTableDefaults; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lifecycle__ = __webpack_require__(858);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__methods__ = __webpack_require__(859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__defaultProps__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__propTypes__ = __webpack_require__(861);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



//






var ReactTableDefaults = __WEBPACK_IMPORTED_MODULE_5__defaultProps__["a" /* default */];

var ReactTable = function (_Methods) {
  _inherits(ReactTable, _Methods);

  function ReactTable(props) {
    _classCallCheck(this, ReactTable);

    var _this = _possibleConstructorReturn(this, (ReactTable.__proto__ || Object.getPrototypeOf(ReactTable)).call(this));

    _this.getResolvedState = _this.getResolvedState.bind(_this);
    _this.getDataModel = _this.getDataModel.bind(_this);
    _this.getSortedData = _this.getSortedData.bind(_this);
    _this.fireFetchData = _this.fireFetchData.bind(_this);
    _this.getPropOrState = _this.getPropOrState.bind(_this);
    _this.getStateOrProp = _this.getStateOrProp.bind(_this);
    _this.filterData = _this.filterData.bind(_this);
    _this.sortData = _this.sortData.bind(_this);
    _this.getMinRows = _this.getMinRows.bind(_this);
    _this.onPageChange = _this.onPageChange.bind(_this);
    _this.onPageSizeChange = _this.onPageSizeChange.bind(_this);
    _this.sortColumn = _this.sortColumn.bind(_this);
    _this.filterColumn = _this.filterColumn.bind(_this);
    _this.resizeColumnStart = _this.resizeColumnStart.bind(_this);
    _this.resizeColumnEnd = _this.resizeColumnEnd.bind(_this);
    _this.resizeColumnMoving = _this.resizeColumnMoving.bind(_this);

    _this.state = {
      page: 0,
      pageSize: props.defaultPageSize,
      sorted: props.defaultSorted,
      expanded: props.defaultExpanded,
      filtered: props.defaultFiltered,
      resized: props.defaultResized,
      currentlyResizing: false,
      skipNextSort: false
    };
    return _this;
  }

  _createClass(ReactTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var resolvedState = this.getResolvedState();
      var children = resolvedState.children,
          className = resolvedState.className,
          style = resolvedState.style,
          getProps = resolvedState.getProps,
          getTableProps = resolvedState.getTableProps,
          getTheadGroupProps = resolvedState.getTheadGroupProps,
          getTheadGroupTrProps = resolvedState.getTheadGroupTrProps,
          getTheadGroupThProps = resolvedState.getTheadGroupThProps,
          getTheadProps = resolvedState.getTheadProps,
          getTheadTrProps = resolvedState.getTheadTrProps,
          getTheadThProps = resolvedState.getTheadThProps,
          getTheadFilterProps = resolvedState.getTheadFilterProps,
          getTheadFilterTrProps = resolvedState.getTheadFilterTrProps,
          getTheadFilterThProps = resolvedState.getTheadFilterThProps,
          getTbodyProps = resolvedState.getTbodyProps,
          getTrGroupProps = resolvedState.getTrGroupProps,
          getTrProps = resolvedState.getTrProps,
          getTdProps = resolvedState.getTdProps,
          getTfootProps = resolvedState.getTfootProps,
          getTfootTrProps = resolvedState.getTfootTrProps,
          getTfootTdProps = resolvedState.getTfootTdProps,
          getPaginationProps = resolvedState.getPaginationProps,
          getLoadingProps = resolvedState.getLoadingProps,
          getNoDataProps = resolvedState.getNoDataProps,
          getResizerProps = resolvedState.getResizerProps,
          showPagination = resolvedState.showPagination,
          showPaginationTop = resolvedState.showPaginationTop,
          showPaginationBottom = resolvedState.showPaginationBottom,
          manual = resolvedState.manual,
          loadingText = resolvedState.loadingText,
          noDataText = resolvedState.noDataText,
          sortable = resolvedState.sortable,
          multiSort = resolvedState.multiSort,
          resizable = resolvedState.resizable,
          filterable = resolvedState.filterable,
          pivotIDKey = resolvedState.pivotIDKey,
          pivotValKey = resolvedState.pivotValKey,
          pivotBy = resolvedState.pivotBy,
          subRowsKey = resolvedState.subRowsKey,
          aggregatedKey = resolvedState.aggregatedKey,
          originalKey = resolvedState.originalKey,
          indexKey = resolvedState.indexKey,
          groupedByPivotKey = resolvedState.groupedByPivotKey,
          loading = resolvedState.loading,
          pageSize = resolvedState.pageSize,
          page = resolvedState.page,
          sorted = resolvedState.sorted,
          filtered = resolvedState.filtered,
          resized = resolvedState.resized,
          expanded = resolvedState.expanded,
          pages = resolvedState.pages,
          onExpandedChange = resolvedState.onExpandedChange,
          TableComponent = resolvedState.TableComponent,
          TheadComponent = resolvedState.TheadComponent,
          TbodyComponent = resolvedState.TbodyComponent,
          TrGroupComponent = resolvedState.TrGroupComponent,
          TrComponent = resolvedState.TrComponent,
          ThComponent = resolvedState.ThComponent,
          TdComponent = resolvedState.TdComponent,
          TfootComponent = resolvedState.TfootComponent,
          PaginationComponent = resolvedState.PaginationComponent,
          LoadingComponent = resolvedState.LoadingComponent,
          SubComponent = resolvedState.SubComponent,
          NoDataComponent = resolvedState.NoDataComponent,
          ResizerComponent = resolvedState.ResizerComponent,
          ExpanderComponent = resolvedState.ExpanderComponent,
          PivotValueComponent = resolvedState.PivotValueComponent,
          PivotComponent = resolvedState.PivotComponent,
          AggregatedComponent = resolvedState.AggregatedComponent,
          FilterComponent = resolvedState.FilterComponent,
          PadRowComponent = resolvedState.PadRowComponent,
          resolvedData = resolvedState.resolvedData,
          allVisibleColumns = resolvedState.allVisibleColumns,
          headerGroups = resolvedState.headerGroups,
          hasHeaderGroups = resolvedState.hasHeaderGroups,
          sortedData = resolvedState.sortedData,
          currentlyResizing = resolvedState.currentlyResizing;

      // Pagination

      var startRow = pageSize * page;
      var endRow = startRow + pageSize;
      var pageRows = manual ? resolvedData : sortedData.slice(startRow, endRow);
      var minRows = this.getMinRows();
      var padRows = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].range(Math.max(minRows - pageRows.length, 0));

      var hasColumnFooter = allVisibleColumns.some(function (d) {
        return d.Footer;
      });
      var hasFilters = filterable || allVisibleColumns.some(function (d) {
        return d.filterable;
      });

      var recurseRowsViewIndex = function recurseRowsViewIndex(rows) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
        return [rows.map(function (row, i) {
          index += 1;
          var rowWithViewIndex = _extends({}, row, {
            _viewIndex: index
          });
          var newPath = path.concat([i]);
          if (rowWithViewIndex[subRowsKey] && __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].get(expanded, newPath)) {
            var _recurseRowsViewIndex = recurseRowsViewIndex(rowWithViewIndex[subRowsKey], newPath, index);

            var _recurseRowsViewIndex2 = _slicedToArray(_recurseRowsViewIndex, 2);

            rowWithViewIndex[subRowsKey] = _recurseRowsViewIndex2[0];
            index = _recurseRowsViewIndex2[1];
          }
          return rowWithViewIndex;
        }), index];
      };
      var _recurseRowsViewIndex3 = recurseRowsViewIndex(pageRows);

      var _recurseRowsViewIndex4 = _slicedToArray(_recurseRowsViewIndex3, 1);

      pageRows = _recurseRowsViewIndex4[0];


      var canPrevious = page > 0;
      var canNext = page + 1 < pages;

      var rowMinWidth = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].sum(allVisibleColumns.map(function (d) {
        var resizedColumn = resized.find(function (x) {
          return x.id === d.id;
        }) || {};
        return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedColumn.value, d.width, d.minWidth);
      }));

      var rowIndex = -1;

      var finalState = _extends({}, resolvedState, {
        startRow: startRow,
        endRow: endRow,
        pageRows: pageRows,
        minRows: minRows,
        padRows: padRows,
        hasColumnFooter: hasColumnFooter,
        canPrevious: canPrevious,
        canNext: canNext,
        rowMinWidth: rowMinWidth
      });

      var rootProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getProps(finalState, undefined, undefined, this));
      var tableProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTableProps(finalState, undefined, undefined, this));
      var tBodyProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTbodyProps(finalState, undefined, undefined, this));
      var loadingProps = getLoadingProps(finalState, undefined, undefined, this);
      var noDataProps = getNoDataProps(finalState, undefined, undefined, this);

      // Visual Components

      var makeHeaderGroup = function makeHeaderGroup(column, i) {
        var resizedValue = function resizedValue(col) {
          return (resized.find(function (x) {
            return x.id === col.id;
          }) || {}).value;
        };
        var flex = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].sum(column.columns.map(function (col) {
          return col.width || resizedValue(col) ? 0 : col.minWidth;
        }));
        var width = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].sum(column.columns.map(function (col) {
          return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedValue(col), col.width, col.minWidth);
        }));
        var maxWidth = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].sum(column.columns.map(function (col) {
          return __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedValue(col), col.width, col.maxWidth);
        }));

        var theadGroupThProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTheadGroupThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadGroupThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadGroupThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadGroupThProps.rest, columnHeaderProps.rest);

        var flexStyles = {
          flex: flex + ' 0 auto',
          width: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(width),
          maxWidth: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(maxWidth)
        };

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(classes),
            style: _extends({}, styles, flexStyles)
          }, rest),
          __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(column.Header, {
            data: sortedData,
            column: column
          })
        );
      };

      var makeHeaderGroups = function makeHeaderGroups() {
        var theadGroupProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTheadGroupProps(finalState, undefined, undefined, _this2));
        var theadGroupTrProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTheadGroupTrProps(finalState, undefined, undefined, _this2));
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          TheadComponent,
          _extends({
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('-headerGroups', theadGroupProps.className),
            style: _extends({}, theadGroupProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, theadGroupProps.rest),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            TrComponent,
            _extends({
              className: theadGroupTrProps.className,
              style: theadGroupTrProps.style
            }, theadGroupTrProps.rest),
            headerGroups.map(makeHeaderGroup)
          )
        );
      };

      var makeHeader = function makeHeader(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var sort = sorted.find(function (d) {
          return d.id === column.id;
        });
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var theadThProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTheadThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadThProps.rest, columnHeaderProps.rest);

        var isResizable = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(column.resizable, resizable, false);
        var resizer = isResizable ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ResizerComponent, _extends({
          onMouseDown: function onMouseDown(e) {
            return _this2.resizeColumnStart(e, column, false);
          },
          onTouchStart: function onTouchStart(e) {
            return _this2.resizeColumnStart(e, column, true);
          }
        }, getResizerProps('finalState', undefined, column, _this2))) : null;

        var isSortable = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(column.sortable, sortable, false);

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(classes, isResizable && 'rt-resizable-header', sort ? sort.desc ? '-sort-desc' : '-sort-asc' : '', isSortable && '-cursor-pointer', !show && '-hidden', pivotBy && pivotBy.slice(0, -1).includes(column.id) && 'rt-header-pivot'),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(width),
              maxWidth: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(maxWidth)
            }),
            toggleSort: function toggleSort(e) {
              if (isSortable) _this2.sortColumn(column, multiSort ? e.shiftKey : false);
            }
          }, rest),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(isResizable && 'rt-resizable-header-content') },
            __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(column.Header, {
              data: sortedData,
              column: column
            })
          ),
          resizer
        );
      };

      var makeHeaders = function makeHeaders() {
        var theadProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTheadProps(finalState, undefined, undefined, _this2));
        var theadTrProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTheadTrProps(finalState, undefined, undefined, _this2));
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          TheadComponent,
          _extends({
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('-header', theadProps.className),
            style: _extends({}, theadProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, theadProps.rest),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            TrComponent,
            _extends({
              className: theadTrProps.className,
              style: theadTrProps.style
            }, theadTrProps.rest),
            allVisibleColumns.map(makeHeader)
          )
        );
      };

      var makeFilter = function makeFilter(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var width = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var theadFilterThProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTheadFilterThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadFilterThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadFilterThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadFilterThProps.rest, columnHeaderProps.rest);

        var filter = filtered.find(function (filter) {
          return filter.id === column.id;
        });

        var ResolvedFilterComponent = column.Filter || FilterComponent;

        var isFilterable = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(column.filterable, filterable, false);

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(classes),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(width),
              maxWidth: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(maxWidth)
            })
          }, rest),
          isFilterable ? __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(ResolvedFilterComponent, {
            column: column,
            filter: filter,
            onChange: function onChange(value) {
              return _this2.filterColumn(column, value);
            }
          }, __WEBPACK_IMPORTED_MODULE_5__defaultProps__["a" /* default */].column.Filter) : null
        );
      };

      var makeFilters = function makeFilters() {
        var theadFilterProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTheadFilterProps(finalState, undefined, undefined, _this2));
        var theadFilterTrProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTheadFilterTrProps(finalState, undefined, undefined, _this2));
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          TheadComponent,
          _extends({
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('-filters', theadFilterProps.className),
            style: _extends({}, theadFilterProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, theadFilterProps.rest),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            TrComponent,
            _extends({
              className: theadFilterTrProps.className,
              style: theadFilterTrProps.style
            }, theadFilterTrProps.rest),
            allVisibleColumns.map(makeFilter)
          )
        );
      };

      var makePageRow = function makePageRow(row, i) {
        var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        var rowInfo = {
          original: row[originalKey],
          row: row,
          index: row[indexKey],
          viewIndex: rowIndex += 1,
          pageSize: pageSize,
          page: page,
          level: path.length,
          nestingPath: path.concat([i]),
          aggregated: row[aggregatedKey],
          groupedByPivot: row[groupedByPivotKey],
          subRows: row[subRowsKey]
        };
        var isExpanded = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].get(expanded, rowInfo.nestingPath);
        var trGroupProps = getTrGroupProps(finalState, rowInfo, undefined, _this2);
        var trProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTrProps(finalState, rowInfo, undefined, _this2));
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          TrGroupComponent,
          _extends({ key: rowInfo.nestingPath.join('_') }, trGroupProps),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            TrComponent,
            _extends({
              className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(trProps.className, row._viewIndex % 2 ? '-even' : '-odd'),
              style: trProps.style
            }, trProps.rest),
            allVisibleColumns.map(function (column, i2) {
              var resizedCol = resized.find(function (x) {
                return x.id === column.id;
              }) || {};
              var show = typeof column.show === 'function' ? column.show() : column.show;
              var width = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedCol.value, column.width, column.minWidth);
              var maxWidth = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedCol.value, column.width, column.maxWidth);
              var tdProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTdProps(finalState, rowInfo, column, _this2));
              var columnProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(column.getProps(finalState, rowInfo, column, _this2));

              var classes = [tdProps.className, column.className, columnProps.className];

              var styles = _extends({}, tdProps.style, column.style, columnProps.style);

              var cellInfo = _extends({}, rowInfo, {
                isExpanded: isExpanded,
                column: _extends({}, column),
                value: rowInfo.row[column.id],
                pivoted: column.pivoted,
                expander: column.expander,
                resized: resized,
                show: show,
                width: width,
                maxWidth: maxWidth,
                tdProps: tdProps,
                columnProps: columnProps,
                classes: classes,
                styles: styles
              });

              var value = cellInfo.value;

              var useOnExpanderClick = void 0;
              var isBranch = void 0;
              var isPreview = void 0;

              var onExpanderClick = function onExpanderClick(e) {
                var newExpanded = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].clone(expanded);
                if (isExpanded) {
                  newExpanded = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].set(newExpanded, cellInfo.nestingPath, false);
                } else {
                  newExpanded = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].set(newExpanded, cellInfo.nestingPath, {});
                }

                return _this2.setStateWithData({
                  expanded: newExpanded
                }, function () {
                  return onExpandedChange && onExpandedChange(newExpanded, cellInfo.nestingPath, e);
                });
              };

              // Default to a standard cell
              var resolvedCell = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(column.Cell, cellInfo, value);

              // Resolve Renderers
              var ResolvedAggregatedComponent = column.Aggregated || (!column.aggregate ? AggregatedComponent : column.Cell);
              var ResolvedExpanderComponent = column.Expander || ExpanderComponent;
              var ResolvedPivotValueComponent = column.PivotValue || PivotValueComponent;
              var DefaultResolvedPivotComponent = PivotComponent || function (props) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ResolvedExpanderComponent, props),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ResolvedPivotValueComponent, props)
                );
              };
              var ResolvedPivotComponent = column.Pivot || DefaultResolvedPivotComponent;

              // Is this cell expandable?
              if (cellInfo.pivoted || cellInfo.expander) {
                // Make it expandable by defualt
                cellInfo.expandable = true;
                useOnExpanderClick = true;
                // If pivoted, has no subRows, and does not have a subComponent,
                // do not make expandable
                if (cellInfo.pivoted && !cellInfo.subRows && !SubComponent) {
                  cellInfo.expandable = false;
                }
              }

              if (cellInfo.pivoted) {
                // Is this column a branch?
                isBranch = rowInfo.row[pivotIDKey] === column.id && cellInfo.subRows;
                // Should this column be blank?
                isPreview = pivotBy.indexOf(column.id) > pivotBy.indexOf(rowInfo.row[pivotIDKey]) && cellInfo.subRows;
                // Pivot Cell Render Override
                if (isBranch) {
                  // isPivot
                  resolvedCell = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(ResolvedPivotComponent, _extends({}, cellInfo, {
                    value: row[pivotValKey]
                  }), row[pivotValKey]);
                } else if (isPreview) {
                  // Show the pivot preview
                  resolvedCell = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(ResolvedAggregatedComponent, cellInfo, value);
                } else {
                  resolvedCell = null;
                }
              } else if (cellInfo.aggregated) {
                resolvedCell = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(ResolvedAggregatedComponent, cellInfo, value);
              }

              if (cellInfo.expander) {
                resolvedCell = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(ResolvedExpanderComponent, cellInfo, row[pivotValKey]);
                if (pivotBy) {
                  if (cellInfo.groupedByPivot) {
                    resolvedCell = null;
                  }
                  if (!cellInfo.subRows && !SubComponent) {
                    resolvedCell = null;
                  }
                }
              }

              var resolvedOnExpanderClick = useOnExpanderClick ? onExpanderClick : function () {};

              // If there are multiple onClick events, make sure they don't
              // override eachother. This should maybe be expanded to handle all
              // function attributes
              var interactionProps = {
                onClick: resolvedOnExpanderClick
              };

              if (tdProps.rest.onClick) {
                interactionProps.onClick = function (e) {
                  tdProps.rest.onClick(e, function () {
                    return resolvedOnExpanderClick(e);
                  });
                };
              }

              if (columnProps.rest.onClick) {
                interactionProps.onClick = function (e) {
                  columnProps.rest.onClick(e, function () {
                    return resolvedOnExpanderClick(e);
                  });
                };
              }

              // Return the cell
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                TdComponent
                // eslint-disable-next-line react/no-array-index-key
                ,
                _extends({ key: i2 + '-' + column.id,
                  className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(classes, !show && 'hidden', cellInfo.expandable && 'rt-expandable', (isBranch || isPreview) && 'rt-pivot'),
                  style: _extends({}, styles, {
                    flex: width + ' 0 auto',
                    width: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(width),
                    maxWidth: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(maxWidth)
                  })
                }, tdProps.rest, columnProps.rest, interactionProps),
                resolvedCell
              );
            })
          ),
          rowInfo.subRows && isExpanded && rowInfo.subRows.map(function (d, i) {
            return makePageRow(d, i, rowInfo.nestingPath);
          }),
          SubComponent && !rowInfo.subRows && isExpanded && SubComponent(rowInfo)
        );
      };

      var makePadColumn = function makePadColumn(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var flex = width;
        var maxWidth = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var tdProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTdProps(finalState, undefined, column, _this2));
        var columnProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(column.getProps(finalState, undefined, column, _this2));

        var classes = [tdProps.className, column.className, columnProps.className];

        var styles = _extends({}, tdProps.style, column.style, columnProps.style);

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          TdComponent,
          _extends({
            key: i + '-' + column.id,
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(classes, !show && 'hidden'),
            style: _extends({}, styles, {
              flex: flex + ' 0 auto',
              width: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(width),
              maxWidth: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(maxWidth)
            })
          }, tdProps.rest),
          __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(PadRowComponent)
        );
      };

      var makePadRow = function makePadRow(row, i) {
        var trGroupProps = getTrGroupProps(finalState, undefined, undefined, _this2);
        var trProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTrProps(finalState, undefined, undefined, _this2));
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          TrGroupComponent,
          _extends({ key: i }, trGroupProps),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            TrComponent,
            {
              className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('-padRow', (pageRows.length + i) % 2 ? '-even' : '-odd', trProps.className),
              style: trProps.style || {}
            },
            allVisibleColumns.map(makePadColumn)
          )
        );
      };

      var makeColumnFooter = function makeColumnFooter(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var tFootTdProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTfootTdProps(finalState, undefined, undefined, _this2));
        var columnProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(column.getProps(finalState, undefined, column, _this2));
        var columnFooterProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(column.getFooterProps(finalState, undefined, column, _this2));

        var classes = [tFootTdProps.className, column.className, columnProps.className, columnFooterProps.className];

        var styles = _extends({}, tFootTdProps.style, column.style, columnProps.style, columnFooterProps.style);

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          TdComponent,
          _extends({
            key: i + '-' + column.id,
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(classes, !show && 'hidden'),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(width),
              maxWidth: __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].asPx(maxWidth)
            })
          }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest),
          __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(column.Footer, {
            data: sortedData,
            column: column
          })
        );
      };

      var makeColumnFooters = function makeColumnFooters() {
        var tFootProps = getTfootProps(finalState, undefined, undefined, _this2);
        var tFootTrProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getTfootTrProps(finalState, undefined, undefined, _this2));
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          TfootComponent,
          _extends({
            className: tFootProps.className,
            style: _extends({}, tFootProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, tFootProps.rest),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            TrComponent,
            _extends({
              className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(tFootTrProps.className),
              style: tFootTrProps.style
            }, tFootTrProps.rest),
            allVisibleColumns.map(makeColumnFooter)
          )
        );
      };

      var makePagination = function makePagination() {
        var paginationProps = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].splitProps(getPaginationProps(finalState, undefined, undefined, _this2));
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(PaginationComponent, _extends({}, resolvedState, {
          pages: pages,
          canPrevious: canPrevious,
          canNext: canNext,
          onPageChange: _this2.onPageChange,
          onPageSizeChange: _this2.onPageSizeChange,
          className: paginationProps.className,
          style: paginationProps.style
        }, paginationProps.rest));
      };

      var makeTable = function makeTable() {
        var pagination = makePagination();
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          _extends({
            className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('ReactTable', className, rootProps.className),
            style: _extends({}, style, rootProps.style)
          }, rootProps.rest),
          showPagination && showPaginationTop ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'pagination-top' },
            pagination
          ) : null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            TableComponent,
            _extends({
              className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(tableProps.className, currentlyResizing ? 'rt-resizing' : ''),
              style: tableProps.style
            }, tableProps.rest),
            hasHeaderGroups ? makeHeaderGroups() : null,
            makeHeaders(),
            hasFilters ? makeFilters() : null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              TbodyComponent,
              _extends({
                className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(tBodyProps.className),
                style: _extends({}, tBodyProps.style, {
                  minWidth: rowMinWidth + 'px'
                })
              }, tBodyProps.rest),
              pageRows.map(function (d, i) {
                return makePageRow(d, i);
              }),
              padRows.map(makePadRow)
            ),
            hasColumnFooter ? makeColumnFooters() : null
          ),
          showPagination && showPaginationBottom ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'pagination-bottom' },
            pagination
          ) : null,
          !pageRows.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            NoDataComponent,
            noDataProps,
            __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].normalizeComponent(noDataText)
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(LoadingComponent, _extends({
            loading: loading,
            loadingText: loadingText
          }, loadingProps))
        );
      };

      // childProps are optionally passed to a function-as-a-child
      return children ? children(finalState, makeTable, this) : makeTable();
    }
  }]);

  return ReactTable;
}(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__methods__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lifecycle__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_react__["Component"])));

ReactTable.propTypes = __WEBPACK_IMPORTED_MODULE_6__propTypes__["a" /* default */];
ReactTable.defaultProps = __WEBPACK_IMPORTED_MODULE_5__defaultProps__["a" /* default */];
/* harmony default export */ __webpack_exports__["default"] = (ReactTable);


/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* harmony default export */ __webpack_exports__["a"] = (function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setStateWithData(this.getDataModel(this.getResolvedState()));
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.fireFetchData();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextState) {
        var oldState = this.getResolvedState();
        var newState = this.getResolvedState(nextProps, nextState);

        // Do a deep compare of new and old `defaultOption` and
        // if they are different reset `option = defaultOption`
        var defaultableOptions = ['sorted', 'filtered', 'resized', 'expanded'];
        defaultableOptions.forEach(function (x) {
          var defaultName = 'default' + (x.charAt(0).toUpperCase() + x.slice(1));
          if (JSON.stringify(oldState[defaultName]) !== JSON.stringify(newState[defaultName])) {
            newState[x] = newState[defaultName];
          }
        });

        // If they change these table options, we need to reset defaults
        // or else we could get into a state where the user has changed the UI
        // and then disabled the ability to change it back.
        // e.g. If `filterable` has changed, set `filtered = defaultFiltered`
        var resettableOptions = ['sortable', 'filterable', 'resizable'];
        resettableOptions.forEach(function (x) {
          if (oldState[x] !== newState[x]) {
            var baseName = x.replace('able', '');
            var optionName = baseName + 'ed';
            var defaultName = 'default' + (optionName.charAt(0).toUpperCase() + optionName.slice(1));
            newState[optionName] = newState[defaultName];
          }
        });

        // Props that trigger a data update
        if (oldState.data !== newState.data || oldState.columns !== newState.columns || oldState.pivotBy !== newState.pivotBy || oldState.sorted !== newState.sorted || oldState.filtered !== newState.filtered) {
          this.setStateWithData(this.getDataModel(newState));
        }
      }
    }, {
      key: 'setStateWithData',
      value: function setStateWithData(newState, cb) {
        var _this2 = this;

        var oldState = this.getResolvedState();
        var newResolvedState = this.getResolvedState({}, newState);
        var freezeWhenExpanded = newResolvedState.freezeWhenExpanded;

        // Default to unfrozen state

        newResolvedState.frozen = false;

        // If freezeWhenExpanded is set, check for frozen conditions
        if (freezeWhenExpanded) {
          // if any rows are expanded, freeze the existing data and sorting
          var keys = Object.keys(newResolvedState.expanded);
          for (var i = 0; i < keys.length; i += 1) {
            if (newResolvedState.expanded[keys[i]]) {
              newResolvedState.frozen = true;
              break;
            }
          }
        }

        // If the data isn't frozen and either the data or
        // sorting model has changed, update the data
        if (oldState.frozen && !newResolvedState.frozen || oldState.sorted !== newResolvedState.sorted || oldState.filtered !== newResolvedState.filtered || oldState.showFilters !== newResolvedState.showFilters || !newResolvedState.frozen && oldState.resolvedData !== newResolvedState.resolvedData) {
          // Handle collapseOnsortedChange & collapseOnDataChange
          if (oldState.sorted !== newResolvedState.sorted && this.props.collapseOnSortingChange || oldState.filtered !== newResolvedState.filtered || oldState.showFilters !== newResolvedState.showFilters || oldState.sortedData && !newResolvedState.frozen && oldState.resolvedData !== newResolvedState.resolvedData && this.props.collapseOnDataChange) {
            newResolvedState.expanded = {};
          }

          Object.assign(newResolvedState, this.getSortedData(newResolvedState));
        }

        // Set page to 0 if filters change
        if (oldState.filtered !== newResolvedState.filtered) {
          newResolvedState.page = 0;
        }

        // Calculate pageSize all the time
        if (newResolvedState.sortedData) {
          newResolvedState.pages = newResolvedState.manual ? newResolvedState.pages : Math.ceil(newResolvedState.sortedData.length / newResolvedState.pageSize);
          newResolvedState.page = Math.max(newResolvedState.page >= newResolvedState.pages ? newResolvedState.pages - 1 : newResolvedState.page, 0);
        }

        return this.setState(newResolvedState, function () {
          if (cb) {
            cb();
          }
          if (oldState.page !== newResolvedState.page || oldState.pageSize !== newResolvedState.pageSize || oldState.sorted !== newResolvedState.sorted || oldState.filtered !== newResolvedState.filtered) {
            _this2.fireFetchData();
          }
        });
      }
    }]);

    return _class;
  }(Base);
});


/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(752);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/* harmony default export */ __webpack_exports__["a"] = (function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'getResolvedState',
      value: function getResolvedState(props, state) {
        var resolvedState = _extends({}, __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].compactObject(this.state), __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].compactObject(this.props), __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].compactObject(state), __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].compactObject(props));
        return resolvedState;
      }
    }, {
      key: 'getDataModel',
      value: function getDataModel(newState) {
        var _this2 = this;

        var columns = newState.columns,
            _newState$pivotBy = newState.pivotBy,
            pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy,
            data = newState.data,
            pivotIDKey = newState.pivotIDKey,
            pivotValKey = newState.pivotValKey,
            subRowsKey = newState.subRowsKey,
            aggregatedKey = newState.aggregatedKey,
            nestingLevelKey = newState.nestingLevelKey,
            originalKey = newState.originalKey,
            indexKey = newState.indexKey,
            groupedByPivotKey = newState.groupedByPivotKey,
            SubComponent = newState.SubComponent;

        // Determine Header Groups

        var hasHeaderGroups = false;
        columns.forEach(function (column) {
          if (column.columns) {
            hasHeaderGroups = true;
          }
        });

        var columnsWithExpander = [].concat(_toConsumableArray(columns));

        var expanderColumn = columns.find(function (col) {
          return col.expander || col.columns && col.columns.some(function (col2) {
            return col2.expander;
          });
        });
        // The actual expander might be in the columns field of a group column
        if (expanderColumn && !expanderColumn.expander) {
          expanderColumn = expanderColumn.columns.find(function (col) {
            return col.expander;
          });
        }

        // If we have SubComponent's we need to make sure we have an expander column
        if (SubComponent && !expanderColumn) {
          expanderColumn = { expander: true };
          columnsWithExpander = [expanderColumn].concat(_toConsumableArray(columnsWithExpander));
        }

        var makeDecoratedColumn = function makeDecoratedColumn(column, parentColumn) {
          var dcol = void 0;
          if (column.expander) {
            dcol = _extends({}, _this2.props.column, _this2.props.expanderDefaults, column);
          } else {
            dcol = _extends({}, _this2.props.column, column);
          }

          // Ensure minWidth is not greater than maxWidth if set
          if (dcol.maxWidth < dcol.minWidth) {
            dcol.minWidth = dcol.maxWidth;
          }

          if (parentColumn) {
            dcol.parentColumn = parentColumn;
          }

          // First check for string accessor
          if (typeof dcol.accessor === 'string') {
            dcol.id = dcol.id || dcol.accessor;
            var accessorString = dcol.accessor;
            dcol.accessor = function (row) {
              return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].get(row, accessorString);
            };
            return dcol;
          }

          // Fall back to functional accessor (but require an ID)
          if (dcol.accessor && !dcol.id) {
            console.warn(dcol);
            throw new Error('A column id is required if using a non-string accessor for column above.');
          }

          // Fall back to an undefined accessor
          if (!dcol.accessor) {
            dcol.accessor = function () {
              return undefined;
            };
          }

          return dcol;
        };

        var allDecoratedColumns = [];

        // Decorate the columns
        var decorateAndAddToAll = function decorateAndAddToAll(column, parentColumn) {
          var decoratedColumn = makeDecoratedColumn(column, parentColumn);
          allDecoratedColumns.push(decoratedColumn);
          return decoratedColumn;
        };

        var decoratedColumns = columnsWithExpander.map(function (column) {
          if (column.columns) {
            return _extends({}, column, {
              columns: column.columns.map(function (d) {
                return decorateAndAddToAll(d, column);
              })
            });
          }
          return decorateAndAddToAll(column);
        });

        // Build the visible columns, headers and flat column list
        var visibleColumns = decoratedColumns.slice();
        var allVisibleColumns = [];

        visibleColumns = visibleColumns.map(function (column) {
          if (column.columns) {
            var visibleSubColumns = column.columns.filter(function (d) {
              return pivotBy.indexOf(d.id) > -1 ? false : __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getFirstDefined(d.show, true);
            });
            return _extends({}, column, {
              columns: visibleSubColumns
            });
          }
          return column;
        });

        visibleColumns = visibleColumns.filter(function (column) {
          return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getFirstDefined(column.show, true);
        });

        // Find any custom pivot location
        var pivotIndex = visibleColumns.findIndex(function (col) {
          return col.pivot;
        });

        // Handle Pivot Columns
        if (pivotBy.length) {
          // Retrieve the pivot columns in the correct pivot order
          var pivotColumns = [];
          pivotBy.forEach(function (pivotID) {
            var found = allDecoratedColumns.find(function (d) {
              return d.id === pivotID;
            });
            if (found) {
              pivotColumns.push(found);
            }
          });

          var PivotParentColumn = pivotColumns.reduce(function (prev, current) {
            return prev && prev === current.parentColumn && current.parentColumn;
          }, pivotColumns[0].parentColumn);

          var PivotGroupHeader = hasHeaderGroups && PivotParentColumn.Header;
          PivotGroupHeader = PivotGroupHeader || function () {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'strong',
              null,
              'Pivoted'
            );
          };

          var pivotColumnGroup = {
            Header: PivotGroupHeader,
            columns: pivotColumns.map(function (col) {
              return _extends({}, _this2.props.pivotDefaults, col, {
                pivoted: true
              });
            })
          };

          // Place the pivotColumns back into the visibleColumns
          if (pivotIndex >= 0) {
            pivotColumnGroup = _extends({}, visibleColumns[pivotIndex], pivotColumnGroup);
            visibleColumns.splice(pivotIndex, 1, pivotColumnGroup);
          } else {
            visibleColumns.unshift(pivotColumnGroup);
          }
        }

        // Build Header Groups
        var headerGroups = [];
        var currentSpan = [];

        // A convenience function to add a header and reset the currentSpan
        var addHeader = function addHeader(columns, column) {
          headerGroups.push(_extends({}, _this2.props.column, column, {
            columns: columns
          }));
          currentSpan = [];
        };

        // Build flast list of allVisibleColumns and HeaderGroups
        visibleColumns.forEach(function (column) {
          if (column.columns) {
            allVisibleColumns = allVisibleColumns.concat(column.columns);
            if (currentSpan.length > 0) {
              addHeader(currentSpan);
            }
            addHeader(column.columns, column);
            return;
          }
          allVisibleColumns.push(column);
          currentSpan.push(column);
        });
        if (hasHeaderGroups && currentSpan.length > 0) {
          addHeader(currentSpan);
        }

        // Access the data
        var accessRow = function accessRow(d, i) {
          var _row;

          var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          var row = (_row = {}, _defineProperty(_row, originalKey, d), _defineProperty(_row, indexKey, i), _defineProperty(_row, subRowsKey, d[subRowsKey]), _defineProperty(_row, nestingLevelKey, level), _row);
          allDecoratedColumns.forEach(function (column) {
            if (column.expander) return;
            row[column.id] = column.accessor(d);
          });
          if (row[subRowsKey]) {
            row[subRowsKey] = row[subRowsKey].map(function (d, i) {
              return accessRow(d, i, level + 1);
            });
          }
          return row;
        };
        var resolvedData = data.map(function (d, i) {
          return accessRow(d, i);
        });

        // TODO: Make it possible to fabricate nested rows without pivoting
        var aggregatingColumns = allVisibleColumns.filter(function (d) {
          return !d.expander && d.aggregate;
        });

        // If pivoting, recursively group the data
        var aggregate = function aggregate(rows) {
          var aggregationValues = {};
          aggregatingColumns.forEach(function (column) {
            var values = rows.map(function (d) {
              return d[column.id];
            });
            aggregationValues[column.id] = column.aggregate(values, rows);
          });
          return aggregationValues;
        };
        if (pivotBy.length) {
          var groupRecursively = function groupRecursively(rows, keys) {
            var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            // This is the last level, just return the rows
            if (i === keys.length) {
              return rows;
            }
            // Group the rows together for this level
            var groupedRows = Object.entries(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].groupBy(rows, keys[i])).map(function (_ref) {
              var _ref3;

              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _defineProperty(_ref3, nestingLevelKey, i), _defineProperty(_ref3, groupedByPivotKey, true), _ref3;
            });
            // Recurse into the subRows
            groupedRows = groupedRows.map(function (rowGroup) {
              var _extends2;

              var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
              return _extends({}, rowGroup, (_extends2 = {}, _defineProperty(_extends2, subRowsKey, subRows), _defineProperty(_extends2, aggregatedKey, true), _extends2), aggregate(subRows));
            });
            return groupedRows;
          };
          resolvedData = groupRecursively(resolvedData, pivotBy);
        }

        return _extends({}, newState, {
          resolvedData: resolvedData,
          allVisibleColumns: allVisibleColumns,
          headerGroups: headerGroups,
          allDecoratedColumns: allDecoratedColumns,
          hasHeaderGroups: hasHeaderGroups
        });
      }
    }, {
      key: 'getSortedData',
      value: function getSortedData(resolvedState) {
        var manual = resolvedState.manual,
            sorted = resolvedState.sorted,
            filtered = resolvedState.filtered,
            defaultFilterMethod = resolvedState.defaultFilterMethod,
            resolvedData = resolvedState.resolvedData,
            allVisibleColumns = resolvedState.allVisibleColumns,
            allDecoratedColumns = resolvedState.allDecoratedColumns;


        var sortMethodsByColumnID = {};

        allDecoratedColumns.filter(function (col) {
          return col.sortMethod;
        }).forEach(function (col) {
          sortMethodsByColumnID[col.id] = col.sortMethod;
        });

        // Resolve the data from either manual data or sorted data
        return {
          sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, filtered, defaultFilterMethod, allVisibleColumns), sorted, sortMethodsByColumnID)
        };
      }
    }, {
      key: 'fireFetchData',
      value: function fireFetchData() {
        this.props.onFetchData(this.getResolvedState(), this);
      }
    }, {
      key: 'getPropOrState',
      value: function getPropOrState(key) {
        return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getFirstDefined(this.props[key], this.state[key]);
      }
    }, {
      key: 'getStateOrProp',
      value: function getStateOrProp(key) {
        return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getFirstDefined(this.state[key], this.props[key]);
      }
    }, {
      key: 'filterData',
      value: function filterData(data, filtered, defaultFilterMethod, allVisibleColumns) {
        var _this3 = this;

        var filteredData = data;

        if (filtered.length) {
          filteredData = filtered.reduce(function (filteredSoFar, nextFilter) {
            var column = allVisibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });

            // Don't filter hidden columns or columns that have had their filters disabled
            if (!column || column.filterable === false) {
              return filteredSoFar;
            }

            var filterMethod = column.filterMethod || defaultFilterMethod;

            // If 'filterAll' is set to true, pass the entire dataset to the filter method
            if (column.filterAll) {
              return filterMethod(nextFilter, filteredSoFar, column);
            }
            return filteredSoFar.filter(function (row) {
              return filterMethod(nextFilter, row, column);
            });
          }, filteredData);

          // Apply the filter to the subrows if we are pivoting, and then
          // filter any rows without subcolumns because it would be strange to show
          filteredData = filteredData.map(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return row;
            }
            return _extends({}, row, _defineProperty({}, _this3.props.subRowsKey, _this3.filterData(row[_this3.props.subRowsKey], filtered, defaultFilterMethod, allVisibleColumns)));
          }).filter(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return true;
            }
            return row[_this3.props.subRowsKey].length > 0;
          });
        }

        return filteredData;
      }
    }, {
      key: 'sortData',
      value: function sortData(data, sorted) {
        var _this4 = this;

        var sortMethodsByColumnID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!sorted.length) {
          return data;
        }

        var sortedData = (this.props.orderByMethod || __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].orderBy)(data, sorted.map(function (sort) {
          // Support custom sorting methods for each column
          if (sortMethodsByColumnID[sort.id]) {
            return function (a, b) {
              return sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id], sort.desc);
            };
          }
          return function (a, b) {
            return _this4.props.defaultSortMethod(a[sort.id], b[sort.id], sort.desc);
          };
        }), sorted.map(function (d) {
          return !d.desc;
        }), this.props.indexKey);

        sortedData.forEach(function (row) {
          if (!row[_this4.props.subRowsKey]) {
            return;
          }
          row[_this4.props.subRowsKey] = _this4.sortData(row[_this4.props.subRowsKey], sorted, sortMethodsByColumnID);
        });

        return sortedData;
      }
    }, {
      key: 'getMinRows',
      value: function getMinRows() {
        return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
      }

      // User actions

    }, {
      key: 'onPageChange',
      value: function onPageChange(page) {
        var _props = this.props,
            onPageChange = _props.onPageChange,
            collapseOnPageChange = _props.collapseOnPageChange;


        var newState = { page: page };
        if (collapseOnPageChange) {
          newState.expanded = {};
        }
        this.setStateWithData(newState, function () {
          return onPageChange && onPageChange(page);
        });
      }
    }, {
      key: 'onPageSizeChange',
      value: function onPageSizeChange(newPageSize) {
        var onPageSizeChange = this.props.onPageSizeChange;

        var _getResolvedState = this.getResolvedState(),
            pageSize = _getResolvedState.pageSize,
            page = _getResolvedState.page;

        // Normalize the page to display


        var currentRow = pageSize * page;
        var newPage = Math.floor(currentRow / newPageSize);

        this.setStateWithData({
          pageSize: newPageSize,
          page: newPage
        }, function () {
          return onPageSizeChange && onPageSizeChange(newPageSize, newPage);
        });
      }
    }, {
      key: 'sortColumn',
      value: function sortColumn(column, additive) {
        var _getResolvedState2 = this.getResolvedState(),
            sorted = _getResolvedState2.sorted,
            skipNextSort = _getResolvedState2.skipNextSort,
            defaultSortDesc = _getResolvedState2.defaultSortDesc;

        var firstSortDirection = Object.prototype.hasOwnProperty.call(column, 'defaultSortDesc') ? column.defaultSortDesc : defaultSortDesc;
        var secondSortDirection = !firstSortDirection;

        // we can't stop event propagation from the column resize move handlers
        // attached to the document because of react's synthetic events
        // so we have to prevent the sort function from actually sorting
        // if we click on the column resize element within a header.
        if (skipNextSort) {
          this.setStateWithData({
            skipNextSort: false
          });
          return;
        }

        var onSortedChange = this.props.onSortedChange;


        var newSorted = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].clone(sorted || []).map(function (d) {
          d.desc = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].isSortingDesc(d);
          return d;
        });
        if (!__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].isArray(column)) {
          // Single-Sort
          var existingIndex = newSorted.findIndex(function (d) {
            return d.id === column.id;
          });
          if (existingIndex > -1) {
            var existing = newSorted[existingIndex];
            if (existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(existingIndex, 1);
              } else {
                existing.desc = firstSortDirection;
                newSorted = [existing];
              }
            } else {
              existing.desc = secondSortDirection;
              if (!additive) {
                newSorted = [existing];
              }
            }
          } else if (additive) {
            newSorted.push({
              id: column.id,
              desc: firstSortDirection
            });
          } else {
            newSorted = [{
              id: column.id,
              desc: firstSortDirection
            }];
          }
        } else {
          // Multi-Sort
          var _existingIndex = newSorted.findIndex(function (d) {
            return d.id === column[0].id;
          });
          // Existing Sorted Column
          if (_existingIndex > -1) {
            var _existing = newSorted[_existingIndex];
            if (_existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(_existingIndex, column.length);
              } else {
                column.forEach(function (d, i) {
                  newSorted[_existingIndex + i].desc = firstSortDirection;
                });
              }
            } else {
              column.forEach(function (d, i) {
                newSorted[_existingIndex + i].desc = secondSortDirection;
              });
            }
            if (!additive) {
              newSorted = newSorted.slice(_existingIndex, column.length);
            }
            // New Sort Column
          } else if (additive) {
            newSorted = newSorted.concat(column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            }));
          } else {
            newSorted = column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            });
          }
        }

        this.setStateWithData({
          page: !sorted.length && newSorted.length || !additive ? 0 : this.state.page,
          sorted: newSorted
        }, function () {
          return onSortedChange && onSortedChange(newSorted, column, additive);
        });
      }
    }, {
      key: 'filterColumn',
      value: function filterColumn(column, value) {
        var _getResolvedState3 = this.getResolvedState(),
            filtered = _getResolvedState3.filtered;

        var onFilteredChange = this.props.onFilteredChange;

        // Remove old filter first if it exists

        var newFiltering = (filtered || []).filter(function (x) {
          return x.id !== column.id;
        });

        if (value !== '') {
          newFiltering.push({
            id: column.id,
            value: value
          });
        }

        this.setStateWithData({
          filtered: newFiltering
        }, function () {
          return onFilteredChange && onFilteredChange(newFiltering, column, value);
        });
      }
    }, {
      key: 'resizeColumnStart',
      value: function resizeColumnStart(event, column, isTouch) {
        var _this5 = this;

        event.stopPropagation();
        var parentWidth = event.target.parentElement.getBoundingClientRect().width;

        var pageX = void 0;
        if (isTouch) {
          pageX = event.changedTouches[0].pageX;
        } else {
          pageX = event.pageX;
        }

        this.trapEvents = true;
        this.setStateWithData({
          currentlyResizing: {
            id: column.id,
            startX: pageX,
            parentWidth: parentWidth
          }
        }, function () {
          if (isTouch) {
            document.addEventListener('touchmove', _this5.resizeColumnMoving);
            document.addEventListener('touchcancel', _this5.resizeColumnEnd);
            document.addEventListener('touchend', _this5.resizeColumnEnd);
          } else {
            document.addEventListener('mousemove', _this5.resizeColumnMoving);
            document.addEventListener('mouseup', _this5.resizeColumnEnd);
            document.addEventListener('mouseleave', _this5.resizeColumnEnd);
          }
        });
      }
    }, {
      key: 'resizeColumnMoving',
      value: function resizeColumnMoving(event) {
        event.stopPropagation();
        var onResizedChange = this.props.onResizedChange;

        var _getResolvedState4 = this.getResolvedState(),
            resized = _getResolvedState4.resized,
            currentlyResizing = _getResolvedState4.currentlyResizing;

        // Delete old value


        var newResized = resized.filter(function (x) {
          return x.id !== currentlyResizing.id;
        });

        var pageX = void 0;

        if (event.type === 'touchmove') {
          pageX = event.changedTouches[0].pageX;
        } else if (event.type === 'mousemove') {
          pageX = event.pageX;
        }

        // Set the min size to 10 to account for margin and border or else the
        // group headers don't line up correctly
        var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, 11);

        newResized.push({
          id: currentlyResizing.id,
          value: newWidth
        });

        this.setStateWithData({
          resized: newResized
        }, function () {
          return onResizedChange && onResizedChange(newResized, event);
        });
      }
    }, {
      key: 'resizeColumnEnd',
      value: function resizeColumnEnd(event) {
        event.stopPropagation();
        var isTouch = event.type === 'touchend' || event.type === 'touchcancel';

        if (isTouch) {
          document.removeEventListener('touchmove', this.resizeColumnMoving);
          document.removeEventListener('touchcancel', this.resizeColumnEnd);
          document.removeEventListener('touchend', this.resizeColumnEnd);
        }

        // If its a touch event clear the mouse one's as well because sometimes
        // the mouseDown event gets called as well, but the mouseUp event doesn't
        document.removeEventListener('mousemove', this.resizeColumnMoving);
        document.removeEventListener('mouseup', this.resizeColumnEnd);
        document.removeEventListener('mouseleave', this.resizeColumnEnd);

        // The touch events don't propagate up to the sorting's onMouseDown event so
        // no need to prevent it from happening or else the first click after a touch
        // event resize will not sort the column.
        if (!isTouch) {
          this.setStateWithData({
            skipNextSort: true,
            currentlyResizing: false
          });
        }
      }
    }]);

    return _class;
  }(Base);
});


/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



//
// import _ from './utils'

var defaultButton = function defaultButton(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'button',
    _extends({ type: 'button' }, props, { className: '-btn' }),
    props.children
  );
};

var ReactTablePagination = function (_Component) {
  _inherits(ReactTablePagination, _Component);

  function ReactTablePagination(props) {
    _classCallCheck(this, ReactTablePagination);

    var _this = _possibleConstructorReturn(this, (ReactTablePagination.__proto__ || Object.getPrototypeOf(ReactTablePagination)).call(this));

    _this.getSafePage = _this.getSafePage.bind(_this);
    _this.changePage = _this.changePage.bind(_this);
    _this.applyPage = _this.applyPage.bind(_this);

    _this.state = {
      page: props.page
    };
    return _this;
  }

  _createClass(ReactTablePagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ page: nextProps.page });
    }
  }, {
    key: 'getSafePage',
    value: function getSafePage(page) {
      if (isNaN(page)) {
        page = this.props.page;
      }
      return Math.min(Math.max(page, 0), this.props.pages - 1);
    }
  }, {
    key: 'changePage',
    value: function changePage(page) {
      page = this.getSafePage(page);
      this.setState({ page: page });
      if (this.props.page !== page) {
        this.props.onPageChange(page);
      }
    }
  }, {
    key: 'applyPage',
    value: function applyPage(e) {
      if (e) {
        e.preventDefault();
      }
      var page = this.state.page;
      this.changePage(page === '' ? this.props.page : page);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          pages = _props.pages,
          page = _props.page,
          showPageSizeOptions = _props.showPageSizeOptions,
          pageSizeOptions = _props.pageSizeOptions,
          pageSize = _props.pageSize,
          showPageJump = _props.showPageJump,
          canPrevious = _props.canPrevious,
          canNext = _props.canNext,
          onPageSizeChange = _props.onPageSizeChange,
          className = _props.className,
          _props$PreviousCompon = _props.PreviousComponent,
          PreviousComponent = _props$PreviousCompon === undefined ? defaultButton : _props$PreviousCompon,
          _props$NextComponent = _props.NextComponent,
          NextComponent = _props$NextComponent === undefined ? defaultButton : _props$NextComponent;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(className, '-pagination'),
          style: this.props.style
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: '-previous' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            PreviousComponent,
            {
              onClick: function onClick() {
                if (!canPrevious) return;
                _this2.changePage(page - 1);
              },
              disabled: !canPrevious
            },
            this.props.previousText
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: '-center' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: '-pageInfo' },
            this.props.pageText,
            ' ',
            showPageJump ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: '-pageJump' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                type: this.state.page === '' ? 'text' : 'number',
                onChange: function onChange(e) {
                  var val = e.target.value;
                  var page = val - 1;
                  if (val === '') {
                    return _this2.setState({ page: val });
                  }
                  _this2.setState({ page: _this2.getSafePage(page) });
                },
                value: this.state.page === '' ? '' : this.state.page + 1,
                onBlur: this.applyPage,
                onKeyPress: function onKeyPress(e) {
                  if (e.which === 13 || e.keyCode === 13) {
                    _this2.applyPage();
                  }
                }
              })
            ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: '-currentPage' },
              page + 1
            ),
            ' ',
            this.props.ofText,
            ' ',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: '-totalPages' },
              pages || 1
            )
          ),
          showPageSizeOptions && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'select-wrap -pageSizeOptions' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              {
                onChange: function onChange(e) {
                  return onPageSizeChange(Number(e.target.value));
                },
                value: pageSize
              },
              pageSizeOptions.map(function (option, i) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'option',
                    { key: i, value: option },
                    option,
                    ' ',
                    _this2.props.rowsText
                  )
                );
              })
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: '-next' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            NextComponent,
            {
              onClick: function onClick() {
                if (!canNext) return;
                _this2.changePage(page + 1);
              },
              disabled: !canNext
            },
            this.props.nextText
          )
        )
      );
    }
  }]);

  return ReactTablePagination;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (ReactTablePagination);


/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


/* harmony default export */ __webpack_exports__["a"] = ({
  // General
  data: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.array,
  loading: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  showPagination: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  showPaginationTop: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  showPaginationBottom: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  showPageSizeOptions: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  pageSizeOptions: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.array,
  defaultPageSize: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
  showPageJump: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  collapseOnSortingChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  collapseOnPageChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  collapseOnDataChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  freezeWhenExpanded: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  sortable: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  resizable: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  filterable: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  defaultSortDesc: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  defaultSorted: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.array,
  defaultFiltered: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.array,
  defaultResized: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.array,
  defaultExpanded: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,
  defaultFilterMethod: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  defaultSortMethod: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,

  // Controlled State Callbacks
  onPageChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onPageSizeChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onSortedChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onFilteredChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onResizedChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onExpandedChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,

  // Pivoting
  pivotBy: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.array,

  // Key Constants
  pivotValKey: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  pivotIDKey: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  subRowsKey: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  aggregatedKey: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  nestingLevelKey: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  originalKey: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  indexKey: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  groupedByPivotKey: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,

  // Server-side Callbacks
  onFetchData: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,

  // Classes
  className: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  style: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,

  // Component decorators
  getProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTableProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTheadGroupProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTheadGroupTrProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTheadGroupThProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTheadProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTheadTrProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTheadThProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTheadFilterProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTheadFilterTrProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTheadFilterThProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTbodyProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTrGroupProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTrProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTdProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTfootProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTfootTrProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getTfootTdProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getPaginationProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getLoadingProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getNoDataProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  getResizerProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,

  // Global Column Defaults
  columns: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
    // Renderers
    Cell: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func]),
    Header: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func]),
    Footer: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func]),
    Aggregated: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func]),
    Pivot: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func]),
    PivotValue: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func]),
    Expander: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func]),
    Filter: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func]),

    // All Columns
    sortable: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool, // use table default
    resizable: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool, // use table default
    filterable: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool, // use table default
    show: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
    minWidth: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,

    // Cells only
    className: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
    style: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,
    getProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,

    // Pivot only
    aggregate: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,

    // Headers only
    headerClassName: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
    headerStyle: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,
    getHeaderProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,

    // Footers only
    footerClassName: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
    footerStyle: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,
    getFooterProps: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,
    filterMethod: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
    filterAll: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
    sortMethod: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func
  })),

  // Global Expander Column Defaults
  expanderDefaults: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
    sortable: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
    resizable: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
    filterable: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
    width: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number
  }),

  pivotDefaults: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,

  // Text
  previousText: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.node,
  nextText: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.node,
  loadingText: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.node,
  noDataText: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.node,
  pageText: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.node,
  ofText: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.node,
  rowsText: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.node,

  // Components
  TableComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  TheadComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  TbodyComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  TrGroupComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  TrComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  ThComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  TdComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  TfootComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  FilterComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  ExpanderComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  PivotValueComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  AggregatedComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  // this is a computed default generated using
  PivotComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  PreviousComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  NextComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  LoadingComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  NoDataComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  ResizerComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element]),
  PadRowComponent: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element])
});


/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var CheckboxList = /** @class */ (function (_super) {
    __extends(CheckboxList, _super);
    function CheckboxList(props) {
        var _this = _super.call(this, props) || this;
        // set initial state
        //console.log('in constructor');
        _this.state = Object.assign({}, _this.getInitialState(), __assign({}, _this.getSelectionProps(props.values)));
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    CheckboxList.prototype.componentWillMount = function () {
        var _this = this;
        //console.log('am in component will mount');
        this.props.getResource().then(function (res) {
            if (res && res.data) {
                _this.setState(function (state) { return ({
                    options: Object.assign([], state.options, res.data)
                }); });
                // this.setState({options: res.data});        
            }
        });
    };
    CheckboxList.prototype.componentDidMount = function () {
    };
    CheckboxList.prototype.componentWillReceiveProps = function (nextProps) {
    };
    CheckboxList.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            options: [],
            checkAll: false
        };
    };
    CheckboxList.prototype.render = function () {
        var _a = this.props, id = _a.id, name = _a.name, options = _a.options, values = _a.values, valueField = _a.valueField, labelField = _a.labelField, inputRef = _a.inputRef, required = _a.required;
        var _b = this.state, selected = _b.selected, checkAll = _b.checkAll;
        var handleChange = this.handleChange;
        var soptions = this.state.options.map(function (o, i) {
            var value = o[valueField];
            return (React.createElement("div", { className: "custom-control custom-checkbox", key: i },
                React.createElement("input", { type: "checkbox", className: "custom-control-input", id: value, name: name, value: value, checked: checkAll || selected.indexOf(value) >= 0 ? true : false, onChange: handleChange, formNoValidate: true }),
                React.createElement("label", { className: "custom-control-label", htmlFor: value }, o[labelField])));
        });
        return (React.createElement("div", { id: id, className: "form-control check-box-list", "data-name": name, ref: inputRef, "data-required": required }, soptions));
    };
    /*    getSelectedFromProps(props) {
             if(props.values != null && props.values.length > 0){
               return props.values;
             }
             return [];
        }*/
    CheckboxList.prototype.getSelectionProps = function (values, change) {
        values = values ? values : [];
        var selected = [], checkAll = false;
        //check for target related change
        if (change) {
            var key = change.dataset.key;
            var index = values.indexOf(change.value);
            var _a = this.props, valueField_1 = _a.valueField, checkAllValue_1 = _a.checkAllValue;
            if (change.checked === true)
                values.splice(key, 0, change.value);
            else if (change.value == checkAllValue_1)
                values = [];
            else if (this.state.checkAll) {
                //return all values except the check all value && the current target value
                values = this.state.options.filter(function (o) {
                    return (o[valueField_1] != checkAllValue_1) &&
                        (o[valueField_1] != change.value);
                }).map(function (o) {
                    return o[valueField_1];
                });
            }
            else if (index >= 0)
                values.splice(index, 1);
        }
        if (this.props.checkAllValue && //if checkall option is available
            (values.indexOf(this.props.checkAllValue) >= 0 ||
                (this.state && values.length == this.state.options.length - 1))) //if all options are checked
         {
            selected = [this.props.checkAllValue];
            checkAll = true;
        }
        else
            selected = values;
        return { selected: selected, checkAll: checkAll };
    };
    CheckboxList.prototype.handleChange = function (e) {
        e.stopPropagation();
        var selected = this.state.selected;
        var sProps = this.getSelectionProps(selected, e.target);
        if (this.props.onChange) {
            var change = {
                oldValue: selected,
                newValue: sProps.selected,
                name: e.target.name,
                type: 'checkboxlist',
                required: this.props.required
            };
            this.props.onChange(change);
        }
        //console.log(selected);
        this.setState(__assign({}, sProps));
    };
    return CheckboxList;
}(React.Component));
exports.CheckboxList = CheckboxList;


/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var common_1 = __webpack_require__(77);
var SelectBox = /** @class */ (function (_super) {
    __extends(SelectBox, _super);
    function SelectBox(props) {
        var _this = _super.call(this, props) || this;
        // set initial state
        //console.log('in constructor');
        _this.state = Object.assign({}, _this.getInitialState(), __assign({}, _this.getSelectionProps(props.values)));
        _this.handleChange = _this.handleChange.bind(_this);
        _this.removeSelection = _this.removeSelection.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    SelectBox.prototype.componentDidMount = function () {
        window.addEventListener('click', this.handleClick);
    };
    SelectBox.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.handleClick);
    };
    SelectBox.prototype.componentWillMount = function () {
        var _this = this;
        //console.log('am in component will mount');
        this.props.getResource().then(function (res) {
            if (res && res.data) {
                _this.setState(function (state) { return ({
                    options: Object.assign([], state.options, res.data)
                }); });
                // this.setState({options: res.data});        
            }
        });
    };
    SelectBox.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            options: []
        };
    };
    SelectBox.prototype.render = function () {
        var _a = this.props, id = _a.id, name = _a.name, options = _a.options, values = _a.values, inputRef = _a.inputRef, valueField = _a.valueField, labelField = _a.labelField, defaultOption = _a.defaultOption, required = _a.required;
        var selected = this.state.selected;
        var handleChange = this.handleChange;
        var removeSelection = this.removeSelection;
        var soptions = function (o, i) {
            var value = o[valueField];
            return (React.createElement("div", { className: "custom-control custom-checkbox", key: i, "data-name": name },
                React.createElement("input", { type: "checkbox", className: "custom-control-input", id: value, name: name, value: value, checked: selected.indexOf(value) >= 0 ? true : false, onChange: handleChange, formNoValidate: true }),
                React.createElement("label", { className: "custom-control-label", htmlFor: value }, o[labelField])));
        };
        var sboxes = this.state.options.map(function (o, i) {
            var children = o.children;
            return React.createElement("div", { className: "card", key: i },
                React.createElement("h6", null, o[labelField]),
                React.createElement("div", { className: "custom-controls-stacked" }, children.map(soptions)));
        });
        var selectlabel = function () {
            var tags;
            if (selected.length > 0) {
                tags = selected.map(function (o, i) {
                    return React.createElement("div", { className: "token token-removeable", key: 'tag-' + i },
                        o,
                        React.createElement("span", { className: "close-button", onClick: function (e) {
                                e.nativeEvent.stopImmediatePropagation();
                                e.stopPropagation();
                                return removeSelection(o);
                            } }, "x"));
                });
            }
            else {
                tags = React.createElement("div", { className: "token" }, defaultOption);
            }
            return React.createElement("div", { className: "dropdown-label bootstrap-tokenizer" }, tags);
        };
        return React.createElement("div", { className: "form-control select-box-list", "data-name": name, ref: inputRef, "data-required": required },
            React.createElement("div", { className: "dropdown" },
                React.createElement("div", { className: "dropdown-toggle" }, selectlabel()),
                React.createElement("div", { className: "dropdown-menu" },
                    React.createElement("div", { className: "card-columns" }, sboxes))));
    };
    SelectBox.prototype.handleClick = function (e) {
        e.stopPropagation();
        var target = e.target, parent = common_1.functions.findAncestor(target, 'dropdown');
        if (!parent) {
            var dds = document.getElementsByClassName('dropdown dropdown-menu');
            for (var i = 0; i <= dds.length - 1; i++)
                dds[i].classList.remove('show');
        }
        else if (target.classList.contains('dropdown-toggle')) {
            var parent = common_1.functions.findAncestor(target, 'dropdown'), children = parent.getElementsByClassName('dropdown-menu');
            parent.classList.toggle('show');
            for (var i = 0; i <= children.length - 1; i++)
                children[i].classList.toggle('show');
        }
        return false;
    };
    SelectBox.prototype.getSelectionProps = function (values, change) {
        values = values ? values : [];
        var selected = [];
        if (change) {
            var key = change.dataset.key;
            var index = values.indexOf(change.value);
            var valueField = this.props.valueField;
            if (change.checked === true)
                values.splice(key, 0, change.value);
            else if (index >= 0)
                values.splice(index, 1);
        }
        return { selected: values };
    };
    SelectBox.prototype.removeSelection = function (v) {
        var input = document.querySelectorAll('input[type=checkbox][value="' + v + '"]:checked'), selected = this.state.selected;
        //console.log(input);
        //console.log(v);
        if (input.length > 0) {
            selected.splice(selected.indexOf(v), 1);
            if (this.props.onChange) {
                var change = {
                    oldValue: this.state.selected,
                    newValue: selected,
                    name: input[0].getAttribute('name'),
                    type: 'selectboxlist',
                    required: this.props.required
                };
                this.props.onChange(change);
            }
            this.setState({ selected: selected });
        }
        return true;
    };
    SelectBox.prototype.handleChange = function (e) {
        // e.preventDefault();
        e.stopPropagation();
        var selected = this.state.selected;
        var sProps = this.getSelectionProps(selected, e.target);
        if (this.props.onChange) {
            var change = {
                oldValue: selected,
                newValue: sProps.selected,
                name: e.target.name,
                type: 'selectboxlist',
                required: this.props.required
            };
            this.props.onChange(change);
        }
        //console.log(selected);
        this.setState(__assign({}, sProps));
    };
    return SelectBox;
}(React.Component));
exports.SelectBox = SelectBox;


/***/ }),

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(1);
var TextArea = /** @class */ (function (_super) {
    __extends(TextArea, _super);
    function TextArea(props) {
        var _this = _super.call(this, props) || this;
        var val = props.value ? props.value : '';
        _this.state = Object.assign({}, _this.getInitialState(), { value: val });
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    TextArea.prototype.componentWillMount = function () {
    };
    TextArea.prototype.getInitialState = function () {
        //console.log('in initial state');
        return {
            value: ''
        };
    };
    TextArea.prototype.render = function () {
        var _a = this.props, id = _a.id, name = _a.name, rows = _a.rows, maxlength = _a.maxlength, defaultMessage = _a.defaultMessage, inputRef = _a.inputRef, required = _a.required;
        var value = this.state.value;
        return (React.createElement("div", { className: "form-group", key: 'text-area-' + name },
            React.createElement("textarea", { className: "form-control", id: id, name: name, value: value, ref: inputRef, maxLength: maxlength, rows: rows, placeholder: defaultMessage, onChange: this.handleChange, required: required }),
            React.createElement("span", { className: "badge badge-info pull-right" }, value.length + '/' + maxlength)));
    };
    TextArea.prototype.handleChange = function (e) {
        // e.preventDefault();
        e.stopPropagation();
        if (e.target.value.length > this.props.maxlength)
            return;
        this.setState({ value: e.target.value });
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };
    return TextArea;
}(React.Component));
exports.TextArea = TextArea;


/***/ })

});
//# sourceMappingURL=bundle.1.js.map