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
var renderers = [];
var injectScript = function (locale) {
    window['GoogleRecaptchaLoaded'] = function () {
        while (renderers.length) {
            var renderer = renderers.pop();
            renderer();
        }
    };
    var script = document.createElement('script');
    script.id = 'recaptcha';
    script.src = "https://www.google.com/recaptcha/api.js?hl=" + locale + "&onload=GoogleRecaptchaLoaded&render=explicit";
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.onerror = function (error) { throw error; };
    document.body.appendChild(script);
};
var grecaptcha = 'grecaptcha';
var GoogleRecaptcha = /** @class */ (function (_super) {
    __extends(GoogleRecaptcha, _super);
    function GoogleRecaptcha(props) {
        var _this = _super.call(this, props) || this;
        _this.callbackName = 'GoogleRecaptchaResolved-' + Date.now();
        return _this;
    }
    GoogleRecaptcha.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, sitekey = _a.sitekey, locale = _a.locale, badge = _a.badge, onResolved = _a.onResolved;
        window[this.callbackName] = onResolved;
        var loaded = function () {
            if (_this.container) {
                var recaptchaId_1 = window[grecaptcha].render(_this.container, {
                    sitekey: sitekey,
                    size: 'invisible',
                    badge: badge,
                    callback: _this.callbackName
                });
                _this['execute'] = function () { return window[grecaptcha].execute(recaptchaId_1); };
                _this['reset'] = function () { return window[grecaptcha].reset(recaptchaId_1); };
                _this['getResponse'] = function () { return window[grecaptcha].getResponse(recaptchaId_1); };
            }
        };
        if (window[grecaptcha]) {
            loaded();
        }
        else {
            renderers.push(loaded);
            if (!document.querySelector('#recaptcha')) {
                injectScript('en');
            }
        }
    };
    GoogleRecaptcha.prototype.componentWillUnmount = function () {
        //console.log('am in component will unmount');
        delete window[this.callbackName];
        delete this.container;
    };
    GoogleRecaptcha.prototype.render = function () {
        var _this = this;
        var style = __assign({ display: 'none' }, this.props.style);
        return (React.createElement("div", { ref: function (ref) { _this.container = ref; }, style: style }));
    };
    return GoogleRecaptcha;
}(React.Component));
exports.GoogleRecaptcha = GoogleRecaptcha;
//# sourceMappingURL=googlerecaptcha.js.map