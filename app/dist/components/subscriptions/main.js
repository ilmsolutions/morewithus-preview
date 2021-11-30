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
var authbasecomponent_1 = require("../commons/authbasecomponent");
var plans_1 = require("./steps/plans");
var confirm_1 = require("./steps/confirm");
require("../../helpers/string");
var transforms_1 = require("../../helpers/transforms");
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
//# sourceMappingURL=main.js.map