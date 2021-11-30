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
var common_1 = require("../../helpers/common");
var Results = /** @class */ (function (_super) {
    __extends(Results, _super);
    function Results(props) {
        var _this = _super.call(this, props) || this;
        _this.renderBadges = _this.renderBadges.bind(_this);
        _this.renderUserType = _this.renderUserType.bind(_this);
        _this.switchViewHandler = _this.switchViewHandler.bind(_this);
        _this.redirectToAuthorized = _this.redirectToAuthorized.bind(_this);
        _this.renderCard = _this.renderCard.bind(_this);
        _this.renderCardDetails = _this.renderCardDetails.bind(_this);
        _this.renderPrivateInformation = _this.renderPrivateInformation.bind(_this);
        _this.redirectToSubScriptions = _this.redirectToSubScriptions.bind(_this);
        _this.state = Object.assign({}, { users: props.users });
        return _this;
    }
    Results.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (!nextProps.hidePrivate && nextProps.isAuthenticated &&
            nextProps.view == 'detail' && nextProps.detailid) {
            //get user details and update the users
            //console.log('in component');
            this.props.getProtectedResource('users/' + nextProps.detailid).then(function (res) {
                var u = JSON.parse(res.data.toString());
                _this.setState(function (state) {
                    state.users = state.users.map(function (user) {
                        if (user._id == u._id)
                            return Object.assign({}, user, u);
                        return user;
                    });
                    return state;
                });
            });
        }
        else {
            this.setState({
                users: nextProps.users
            });
        }
    };
    Results.prototype.render = function () {
        var _a = this.props, hidePrivate = _a.hidePrivate, isAuthenticated = _a.isAuthenticated, view = _a.view, detailid = _a.detailid;
        var users = this.state.users;
        var renderCard = this.renderCard;
        var renderCardDetails = this.renderCardDetails;
        var cards = users ? (view == 'detail') ? renderCardDetails(users.filter(function (user) {
            return user._id == detailid;
        })[0], isAuthenticated, hidePrivate) : users.map(renderCard) : '';
        return React.createElement("div", { className: view == 'detail' ? 'right' : 'left', key: view + '-view' }, cards);
    };
    Results.prototype.renderBadges = function (badges, opts) {
        return badges.map(function (badge, i) {
            return React.createElement("span", { className: "badge " + opts.className, key: i }, badge);
        });
    };
    Results.prototype.renderOptionalPropertyBadges = function (label, className, badges, opts) {
        return (badges != null && badges.length > 0) ?
            React.createElement("dl", { className: className },
                React.createElement("dt", { className: className == 'row' ? 'col-sm-3' : '' }, label),
                React.createElement("dd", { className: (className == 'row' ? 'col-sm-9' : '') }, this.renderBadges(badges, opts)))
            : '';
    };
    Results.prototype.renderOptionalProperty = function (label, className, value) {
        return (value) ? React.createElement("dl", { className: className },
            React.createElement("dt", null, label),
            React.createElement("dd", null, value)) : '';
    };
    Results.prototype.renderUserType = function (userType) {
        var iclass = '';
        switch (userType) {
            case 'Individual':
                iclass = 'fa-user';
                break;
            case 'Organization':
                iclass = 'fa-users';
                break;
        }
        return React.createElement("i", { className: 'fa ' + iclass });
    };
    Results.prototype.renderPrivateInformation = function (user, isAuthenticated, hidePrivate) {
        var cc = (user.usertype == 'Organization' ? 'col-md-4 col-sm-12' : 'col-md-6 col-sm-12');
        return (React.createElement("div", { className: 'card bg-dark text-white private-information ' + (hidePrivate ? 'hide' : 'show'), key: 'user-detail-' + user._id },
            React.createElement("div", { className: 'card-body row' },
                React.createElement("dl", { className: cc },
                    React.createElement("dt", null, "Email"),
                    React.createElement("dd", null, user.email ? user.email : 'xxx@xxx.com')),
                React.createElement("dl", { className: cc },
                    React.createElement("dt", null, "Phone"),
                    React.createElement("dd", null, user.contact && user.contact.phone ? user.contact.phone : 'xxx-xxx-xxxx')),
                (user.usertype == 'Organization') ?
                    React.createElement("dl", { className: cc },
                        React.createElement("dt", null, "Website"),
                        React.createElement("dd", null, !hidePrivate ? (user.website ? user.website : 'Not specified') : 'https://www.xxxxx.xxx'))
                    : ''),
            React.createElement("div", { className: 'card-footer' },
                React.createElement("button", { className: "btn btn-sm btn-primary", onClick: isAuthenticated ? this.redirectToSubScriptions :
                        this.redirectToAuthorized }, isAuthenticated ? 'Subscribe to view contact information' :
                    'Signup to view contact information'))));
    };
    Results.prototype.renderCard = function (user, i) {
        return React.createElement("div", { className: 'user-card card', key: 'user-' + i, "data-user-id": user._id },
            React.createElement("div", { className: "card-header" },
                React.createElement("small", { className: "pull-right text-muted" },
                    [user.mailingAddress.city + ', ' +
                            user.mailingAddress.state],
                    " ",
                    React.createElement("br", { key: "break" }),
                    (user.dist && user.dist.calculated ? common_1.functions.toDisplayNumber(Math.round(user.dist.calculated * 10) / 10) + ' miles' : '')),
                React.createElement("h5", null,
                    this.renderUserType(user.usertype),
                    "\u00A0",
                    common_1.functions.toProperCase(user.lastname),
                    ", ",
                    common_1.functions.toProperCase(user.firstname)),
                React.createElement("span", { className: "text-muted" }, user.organizationname)),
            React.createElement("div", { className: "card-body" },
                React.createElement("p", { className: "text-truncate" }, user.description),
                React.createElement("span", { className: "row" },
                    React.createElement("dl", { className: "col" },
                        React.createElement("dt", null, "Work Experience"),
                        React.createElement("dd", null, user.workExperience ? user.workExperience + ' years' : 'Not specified')),
                    this.renderOptionalProperty('Education Level', 'col', user.educationLevel),
                    this.renderOptionalPropertyBadges('Employment Type', 'col', user.employmentTypes, { className: 'badge-secondary' }),
                    React.createElement("dl", { className: "col" },
                        React.createElement("dt", null, "Available Times"),
                        React.createElement("dd", null, user.availableTimes != null && user.availableTimes.length > 0 ? this.renderBadges(user.availableTimes, { className: 'badge-warning' }) : 'Not specified'))),
                React.createElement("dl", { className: "row" },
                    React.createElement("dt", { className: "col-sm-3" }, "Looking for jobs in:"),
                    React.createElement("dd", { className: "col-sm-9 text-truncate" }, this.renderBadges(user.jobTypes.length > 0 ? user.jobTypes : ['Any Job'], { className: 'badge-info' }))),
                this.renderOptionalPropertyBadges('Skills', 'row', user.skills, { className: 'badge-secondary text-truncate' }),
                React.createElement("dl", { className: "row" },
                    React.createElement("dt", { className: "col-sm-3" }, "Worked in:"),
                    React.createElement("dd", { className: "col-sm-9 text-truncate" }, user.workAreas != null && user.workAreas.length > 0 ? this.renderBadges(user.workAreas, { className: 'badge-success' }) : 'Not specified')),
                React.createElement("a", { href: '#user-' + user._id, className: "btn btn-sm btn-primary pull-right", "data-view": "detail", onClick: this.switchViewHandler },
                    React.createElement("span", null,
                        "View Details ",
                        React.createElement("i", { className: "fa fa-chevron-right" })))),
            React.createElement("div", { className: "card-footer" },
                React.createElement("strong", { className: "float-right" },
                    "Last active: ",
                    common_1.functions.toProperDate(user.lastlogin))));
    };
    Results.prototype.renderCardDetails = function (user, isAuthenticated, hidePrivate) {
        return React.createElement("div", { className: 'user-card card', key: 'user-detail', "data-name": 'user-' + user._id, "data-user-id": user._id },
            React.createElement("div", { className: "card-header" },
                React.createElement("small", { className: "pull-right text-muted" },
                    [user.mailingAddress.city + ', ' +
                            user.mailingAddress.state],
                    " ",
                    React.createElement("br", { key: "break" }),
                    (user.dist && user.dist.calculated ? common_1.functions.toDisplayNumber(Math.round(user.dist.calculated * 10) / 10) + ' miles' : '')),
                React.createElement("h5", null,
                    this.renderUserType(user.usertype),
                    "\u00A0",
                    common_1.functions.toProperCase(user.lastname),
                    ", ",
                    common_1.functions.toProperCase(user.firstname)),
                React.createElement("span", { className: "text-muted" }, user.organizationname)),
            React.createElement("div", { className: "card-body" },
                React.createElement("p", { className: "lead" }, user.description),
                this.renderPrivateInformation(user, isAuthenticated, hidePrivate),
                React.createElement("span", { className: "row" },
                    React.createElement("dl", { className: "col" },
                        React.createElement("dt", null, "Work Experience"),
                        React.createElement("dd", null, user.workExperience ? user.workExperience + ' years' : 'Not specified')),
                    (user.usertype != 'Organization') ?
                        React.createElement("dl", { className: "col" },
                            React.createElement("dt", null, "Education Level"),
                            React.createElement("dd", null, user.educationLevel != null && user.educationLevel ? user.educationLevel : 'Not specified'))
                        : '',
                    (user.usertype != 'Organization') ?
                        React.createElement("dl", { className: "col" },
                            React.createElement("dt", null, "Employment Type"),
                            React.createElement("dd", null, user.employmentTypes != null && user.employmentTypes.length > 0 ? this.renderBadges(user.employmentTypes, { className: 'badge-secondary' }) : 'Not specified'))
                        : '',
                    React.createElement("dl", { className: "col" },
                        React.createElement("dt", null, "Available Times"),
                        React.createElement("dd", null, user.availableTimes != null && user.availableTimes.length > 0 ? this.renderBadges(user.availableTimes, { className: 'badge-warning' }) : 'Not specified'))),
                React.createElement("dl", { className: "row" },
                    React.createElement("dt", { className: "col-sm-3" }, "Looking for jobs in:"),
                    React.createElement("dd", { className: "col-sm-9" }, this.renderBadges(user.jobTypes.length > 0 ? user.jobTypes : ['Any Job'], { className: 'badge-info' }))),
                this.renderOptionalPropertyBadges('Skills', 'row', user.skills, { className: 'badge-secondary' }),
                React.createElement("dl", { className: "row" },
                    React.createElement("dt", { className: "col-sm-3" }, "Worked in:"),
                    React.createElement("dd", { className: "col-sm-9" }, user.workAreas != null && user.workAreas.length > 0 ? this.renderBadges(user.workAreas, { className: 'badge-success' }) : 'Not specified')),
                this.renderOptionalPropertyBadges('Awards:', 'row', user.awards, { className: 'badge-warning' }),
                this.renderOptionalPropertyBadges('Certificates/ Licenses:', 'row', user.certifications, { className: 'badge-warning' }),
                user.hasReferences ? React.createElement("span", { className: "card-text" },
                    React.createElement("i", { className: "fa fa-check-square mr-2" }),
                    "References available on request") : null),
            React.createElement("div", { className: "card-footer" },
                React.createElement("strong", { className: "float-right" },
                    "Last active: ",
                    common_1.functions.toProperDate(user.lastlogin))));
    };
    Results.prototype.switchViewHandler = function (e) {
        var target = e.target.tagName.toLowerCase() == 'a' ? e.target : e.target.parentNode, view = target.dataset.view, detailid = (view == 'detail') ? target.getAttribute('href').replace('#user-', '') : '';
        this.props.triggerSwitch({ view: view, detailid: detailid });
    };
    Results.prototype.redirectToAuthorized = function (e) {
        e.stopPropagation();
        var st = window.location.href.indexOf(window.location.pathname);
        console.log(st);
        var redirecturl = '/auth' + window.location.href.substring(st);
        window.location.href = redirecturl;
    };
    Results.prototype.redirectToSubScriptions = function (e) {
        e.stopPropagation();
        var redirecturl = '/auth/profile/subscriptions?usercontext=employer';
        window.location.href = redirecturl;
    };
    return Results;
}(React.Component));
exports.Results = Results;
//# sourceMappingURL=results.js.map