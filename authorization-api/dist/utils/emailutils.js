"use strict";
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
var ReactDOMServer = require("react-dom/server");
var nconf = require("nconf");
var emailrenderer_1 = require("../components/main/emailrenderer");
var config_1 = require("../models/admin/config");
var nodeMailer = require('nodemailer');
var path = new RegExp('^,EmailNotifications,', 'i');
function getEmailTemplate(key) {
    return config_1.Config.findOne({ path: path, value: key }, function (err, config) {
        if (err)
            return null;
        return config;
    });
}
exports.getEmailTemplate = getEmailTemplate;
function sendEmail(email, cb) {
    console.log('am in email');
    //check if environment is development
    if (nconf.get('development') == true)
        email.to = nconf.get('accounts')['testemail'];
    var elem = React.createElement(emailrenderer_1.EmailRenderer, { body: email.body });
    var transporter = nodeMailer.createTransport(nconf.get('accounts')['email']);
    var mailOptions = __assign({}, email, { from: nconf.get('accounts')['email.from'], 
        //text: emailHtml,
        html: ReactDOMServer.renderToStaticMarkup(elem) });
    // verify connection configuration
    // transporter.verify(function(error, success) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Server is ready to take our messages');
    //     }
    // });
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            cb(err);
        cb(null, info);
    });
}
exports.sendEmail = sendEmail;
function transformEmailTemplate(config, data) {
    data = Object.assign({}, data, { app: nconf.get('domain') });
    var email = { to: data.to };
    Object.keys(config.custom).forEach(function (prop) {
        var _a;
        switch (true) {
            case /^(cc|bcc|body|subject)$/.test(prop):
                email = Object.assign(email, (_a = {}, _a[prop] = config.custom[prop], _a));
                break;
        }
    });
    Object.keys(data).forEach(function (key) {
        var rex = new RegExp('{' + key + '}', 'ig');
        email['subject'] = email['subject'].replace(rex, data[key]);
        email['body'] = email['body'].replace(rex, data[key]);
    });
    return email;
}
exports.transformEmailTemplate = transformEmailTemplate;
//# sourceMappingURL=emailutils.js.map