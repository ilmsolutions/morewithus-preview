"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var config_1 = require("../routers/handlers/config");
var eventlog_1 = require("../models/eventlog");
var moment = require("moment");
var utils = require("../utils/emailutils");
require("../helpers/date");
var path = new RegExp('^,EmailNotifications,', 'i');
function schedulejobs() {
    //console.log('running schedule jobs....');
    //run hourly - 60*60*1000
    runOps(60 * 60 * 1000, [user_1.User.expireSubscriptions, inactiveEmployees]);
    //run daily - 60*60*1000*24
    //runOps(60*60*24*1000, [expiringSubscription, expiredSubscription, expiredPromotion]);
    //midnight jobs
    runOps(moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds'), [expiringSubscription, expiredSubscription, expiredPromotion]);
}
exports.schedulejobs = schedulejobs;
function runOps(duration, ops) {
    setInterval(function () {
        ops.forEach(function (op) {
            op();
        });
    }, duration);
}
function expiringSubscription() {
    var re = new RegExp('^Expiring.*', 'i');
    config_1.getConfigs(path, { value: re, active: true }).then(function (configs) {
        configs.forEach(function (config) {
            //            console.log('expiring subscription');
            var type = 'Event.' + config.value;
            var emailtemplate = utils.getEmailTemplate(config.value);
            //get all users whose organization subscription is expiring 
            //past the trigger date (calculated from now + duration)
            //filter for each user if the last notification date
            //is prior to the frequency date
            var currdate = new Date();
            var triggerdate = currdate.addDuration(config.custom['duration']);
            //let frequencydate = currdate.addDuration(config.custom['frequency']);
            var lastsentcutoff = currdate.addDuration('-' + config.custom['frequency']);
            eventlog_1.EventLog.find({
                type: type
                //,timestamp:{$lt: frequencydate}
                ,
                timestamp: { $gte: lastsentcutoff }
            }, function (err, events) {
                if (err)
                    return;
                user_1.User.find({ usertype: config.custom['usertype'],
                    isblocked: false,
                    'subscriptions': {
                        $elemMatch: {
                            'usercontext': config.custom['usercontext'],
                            'isexpired': false,
                            'expirationdate': { $gt: triggerdate, $lte: currdate }
                        }
                    },
                    '_id': { $nin: events.map(function (event) {
                            return event.user;
                        }) } }, function (err, users) {
                    //users whose organization subscription is within the expiry notification window
                    //record in event log
                    if (err)
                        return;
                    users.forEach(function (user) {
                        var expsub = user.subscriptions.filter(function (sub) {
                            return sub.usercontext == config.custom['usercontext'] &&
                                sub.isexpired == false &&
                                sub.expirationdate > triggerdate && sub.expirationdate <= currdate;
                        }), expdate = expsub && expsub[0] ?
                            expsub[0].expirationdate.toDisplay() : null, duration = expsub && expsub[0] ?
                            currdate.daysBetween(expsub[0].expirationdate) + ' days' : '';
                        //console.log('expiring....');
                        //console.log(expsub);
                        emailtemplate.then(function (etemplate) {
                            var email = utils.transformEmailTemplate(etemplate, {
                                to: user.email,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                duration: duration,
                                expirydate: expdate
                            });
                            utils.sendEmail(email, function (err, info) {
                                if (err)
                                    return;
                                var elog = new eventlog_1.EventLog({ type: type, user: user._id });
                                elog.save();
                            }); //send email
                        }); //email template
                    });
                });
            });
        });
    });
}
function expiredSubscription() {
    var re = new RegExp('^Expired.*', 'i');
    config_1.getConfigs(path, { value: re, active: true }).then(function (configs) {
        configs.forEach(function (config) {
            //console.log('expired subscription');
            //get all users whose organization subscription is expiring 
            //past the trigger date (calculated from now + duration)
            //filter for each user if the last notification date
            //is prior to the frequency date
            var type = 'Event.' + config.value;
            var emailtemplate = utils.getEmailTemplate(config.value);
            var currdate = new Date();
            var triggerdate = currdate.addDuration(config.custom['duration']);
            //let frequencydate = currdate.addDuration(config.custom['frequency']);
            var lastsentcutoff = currdate.addDuration('-' + config.custom['frequency']);
            //console.log(triggerdate);
            //console.log(frequencydate);
            eventlog_1.EventLog.find({
                type: type
                //  , timestamp:{$lt: frequencydate}
                ,
                timestamp: { $gte: lastsentcutoff }
            }, function (err, events) {
                //console.log(err);
                if (err)
                    return;
                user_1.User.find({ usertype: config.custom['usertype'],
                    isblocked: false,
                    'subscriptions': {
                        $elemMatch: {
                            'usercontext': config.custom['usercontext'],
                            'expirationdate': { $lt: currdate }
                        }
                    },
                    '_id': { $nin: events.map(function (event) {
                            return event.user;
                        }) } }, function (err, users) {
                    //users whose organization subscription is within the expiry notification window
                    //record in event log
                    //  console.log(err);
                    if (err)
                        return;
                    users.forEach(function (user) {
                        emailtemplate.then(function (etemplate) {
                            var email = utils.transformEmailTemplate(etemplate, {
                                to: user.email,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                duration: config.custom['duration']
                            });
                            utils.sendEmail(email, function (err, info) {
                                if (err)
                                    return;
                                var elog = new eventlog_1.EventLog({ type: type, user: user._id });
                                elog.save();
                            }); //send email
                        }); //email template
                    });
                });
            });
        });
    });
}
function inactiveEmployees() {
    var re = new RegExp('^Inactive.*', 'i');
    config_1.getConfigs(path, { value: re, active: true }).then(function (configs) {
        configs.forEach(function (config) {
            //            console.log('inactive employee');
            var type = 'Event.' + config.value;
            var emailtemplate = utils.getEmailTemplate(config.value);
            //get all users who are registered as employees but have not logged in 
            //past the trigger date (calculated from now - duration)
            //filter for each user if the last notification date
            //is prior to the frequency date
            var currdate = new Date();
            var triggerdate = currdate.addDuration('-' + config.custom['duration']);
            //let frequencydate = currdate.addDuration(config.custom['frequency']);
            var lastsentcutoff = currdate.addDuration('-' + config.custom['frequency']);
            eventlog_1.EventLog.find({
                type: type
                //  , timestamp:{$lt: frequencydate}
                ,
                timestamp: { $gt: lastsentcutoff }
            }, function (err, events) {
                //console.log(err);
                if (err)
                    return;
                user_1.User.find({
                    usertype: config.custom['usertype'],
                    isregisteredemployee: true,
                    isblocked: false,
                    lastlogin: { $lt: triggerdate },
                    '_id': { $nin: events.map(function (event) {
                            return event.user;
                        }) }
                }, function (err, users) {
                    //users who have been inactive for the duration
                    //record in event log
                    //  console.log(err);
                    if (err)
                        return;
                    //           console.log(users.length);
                    //           console.log(users);
                    users.forEach(function (user) {
                        emailtemplate.then(function (etemplate) {
                            var email = utils.transformEmailTemplate(etemplate, {
                                to: user.email,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                duration: config.custom['duration']
                            });
                            utils.sendEmail(email, function (err, info) {
                                if (err)
                                    return;
                                var elog = new eventlog_1.EventLog({ type: type, user: user._id });
                                elog.save();
                            }); //send email
                        }); //email template
                    });
                });
            }); //event log  
        });
    });
}
function expiredPromotion() {
    var re = new RegExp('^,Subscriptions,', 'i');
    config_1.getConfigs(re, { 'custom.ispromoted': true }).then(function (configs) {
        configs.forEach(function (config) {
            if (config.custom['promotionexpireson'] != null) {
                var expiry = new Date(config.custom['promotionexpireson']);
                if (expiry < new Date()) {
                    config.update({ 'custom.ispromoted': false }, function (err, res) {
                    });
                }
            }
        });
    });
}
//# sourceMappingURL=schedulejobs.js.map