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
var prop_types_1 = require("prop-types");
var interceptors_1 = require("../helpers/interceptors");
var seo_1 = require("./main/seo");
var header_1 = require("./main/header");
var footer_1 = require("./main/footer");
var scrolltotop_1 = require("./commons/scrolltotop");
require('../assets/libs/sweetalert/sweetalert.css');
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = Object.assign({}, _this.getInitialProps(), props.params);
        interceptors_1.interceptors.init();
        return _this;
    }
    App.prototype.getInitialProps = function () {
        return {
            hidenavigation: false,
            banner: null,
            socials: null,
            metatags: null
        };
    };
    /*     componentWillMount(){
            // console.log('am getting into component will mount');
            if(!this.context.data){
                //console.log('this is in....');
                if(typeof(window) !== 'undefined'){
                    // console.log(window['_INITIAL_STATE']);
                    this.context.data = window['_INITIAL_STATE'] || {session:{}};
                   //console.log(this.context.data);
                }
                else
                    this.context.data = {session:{}};
           }
                    
        }
     */
    App.prototype.componentDidMount = function () {
        window.sweetalert = require('../assets/libs/sweetalert/sweetalert.min.js');
        var data = this.getContext().data;
        if (data) {
            if (data.banner || data.metatags) {
                this.setState(data);
            }
        }
    };
    App.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.params)
            this.setState(nextProps.params);
    };
    App.prototype.render = function () {
        var _a = this.state, hidenavigation = _a.hidenavigation, banner = _a.banner, socials = _a.socials, metatags = _a.metatags, type = _a.type;
        var data = this.getContext().data;
        return (React.createElement("div", null,
            React.createElement(seo_1.SEO, { metatags: metatags, type: type }),
            React.createElement(scrolltotop_1.ScrollToTop, null),
            !hidenavigation ?
                React.createElement(header_1.Header, { root: this.props.route.path, session: data && data.session ? data.session : 'undefined', collapseshow: false })
                : '',
            this.props.children != null ? this.props.children : React.createElement("div", { className: 'main-page' }),
            !hidenavigation ?
                React.createElement(footer_1.Footer, { banner: banner, socials: socials }) : ''));
    };
    App.prototype.getContext = function () {
        //console.log('in get context');
        if (!this.context.data) {
            if (typeof (window) !== 'undefined') {
                // console.log(window['_INITIAL_STATE']);            
                this.context.data = window['_INITIAL_STATE'] || { session: {} };
                //console.log('in window defined');
                //console.log(this.context.data);
            }
        }
        return this.context;
    };
    App.contextTypes = {
        data: prop_types_1.PropTypes.oneOfType([prop_types_1.PropTypes.object, prop_types_1.PropTypes.array])
    };
    return App;
}(React.Component));
exports.App = App;
//# sourceMappingURL=app.js.map