import {User, IUserModel} from '../models/user';
import {getConfigs} from '../routers/handlers/config';
import {EventLog} from '../models/eventlog';
import * as moment from 'moment';
import * as utils from '../utils/emailutils';
import '../helpers/date';

const path = new RegExp('^,EmailNotifications,', 'i');

export function schedulejobs(){
    //console.log('running schedule jobs....');
    //run hourly - 60*60*1000
   runOps(60*60*1000, [User.expireSubscriptions, inactiveEmployees]);
   //run daily - 60*60*1000*24
   //runOps(60*60*24*1000, [expiringSubscription, expiredSubscription, expiredPromotion]);
   //midnight jobs
   runOps(moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds'),
           [expiringSubscription, expiredSubscription, expiredPromotion]);
}


function runOps(duration, ops){
    setInterval(function(){
        ops.forEach(op => {
            op();
        });
    }, duration);
}

function expiringSubscription(){
   var re = new RegExp('^Expiring.*', 'i');
   getConfigs(path, {value: re, active: true}).then(configs => {
       configs.forEach(config => {     
//            console.log('expiring subscription');
            let type = 'Event.' + config.value;
            let emailtemplate = utils.getEmailTemplate(config.value);
            //get all users whose organization subscription is expiring 
            //past the trigger date (calculated from now + duration)
            //filter for each user if the last notification date
            //is prior to the frequency date
            let currdate = new Date();
            let triggerdate = currdate.addDuration(config.custom['duration']);
            //let frequencydate = currdate.addDuration(config.custom['frequency']);
            let lastsentcutoff = currdate.addDuration('-'+config.custom['frequency']);
            EventLog.find({
                           type: type 
                           //,timestamp:{$lt: frequencydate}
                           ,timestamp:{$gte: lastsentcutoff}
                         }, (err, events) => {
                 if(err)
                    return;
 
                 User.find({usertype: config.custom['usertype']
                            , isblocked: false 
                            , 'subscriptions':{
                                $elemMatch:{
                                   'usercontext': config.custom['usercontext']
                                   ,'isexpired':false
                                   ,'expirationdate': {$gt: triggerdate, $lte: currdate}        
                                }
                            }
                            , '_id' : {$nin: events.map(event => {
                                return event.user;
                            })} }, function(err, users){
                     //users whose organization subscription is within the expiry notification window
                     //record in event log
                     if(err)
                       return;

                     users.forEach(user => {
                         
                         var expsub = user.subscriptions.filter(sub => {
                               return sub.usercontext == config.custom['usercontext'] &&
                                      sub.isexpired == false && 
                                      sub.expirationdate > triggerdate && sub.expirationdate <= currdate;
                         }),
                         expdate = expsub && expsub[0] ? 
                                     expsub[0].expirationdate.toDisplay() : null,
                         duration = expsub && expsub[0] ? 
                                     currdate.daysBetween(expsub[0].expirationdate) + ' days' : '';

                         //console.log('expiring....');
                         //console.log(expsub);
                         emailtemplate.then(etemplate => {
                             var email = utils.transformEmailTemplate(etemplate, {
                                 to: user.email,
                                 firstname: user.firstname,
                                 lastname: user.lastname,
                                 duration: duration,
                                 expirydate: expdate
                             });
                             utils.sendEmail(email, (err, info) => {
                                 if(err)
                                    return;

                                var elog = new EventLog({type: type,  user: user._id});
                                elog.save();  
                             });//send email
                         }); //email template
                     });
                 });
              });
           });
           
       });
}

function expiredSubscription(){
    var re = new RegExp('^Expired.*', 'i');
    getConfigs(path, {value: re, active: true}).then(configs => {
        configs.forEach(config => {
            //console.log('expired subscription');
           
            //get all users whose organization subscription is expiring 
            //past the trigger date (calculated from now + duration)
            //filter for each user if the last notification date
            //is prior to the frequency date
            let type = 'Event.' + config.value;
            let emailtemplate = utils.getEmailTemplate(config.value);

            let currdate = new Date();
            let triggerdate = currdate.addDuration(config.custom['duration']);
            //let frequencydate = currdate.addDuration(config.custom['frequency']);
            let lastsentcutoff = currdate.addDuration('-' + config.custom['frequency']);
            //console.log(triggerdate);
            //console.log(frequencydate);
            EventLog.find({
                           type: type 
                         //  , timestamp:{$lt: frequencydate}
                          ,timestamp:{$gte: lastsentcutoff}
                         }, (err, events) => {
                 //console.log(err);
                 if(err)
                    return;
              
                 User.find({usertype: config.custom['usertype']
                            ,isblocked: false
                            , 'subscriptions':{
                                $elemMatch:{
                                'usercontext': config.custom['usercontext']
                                ,'expirationdate': {$lt: currdate}        
                                }
                            }     
                            , '_id' : {$nin: events.map(event => {
                                return event.user;
                            })} }, function(err, users){
                     //users whose organization subscription is within the expiry notification window
                     //record in event log
                   //  console.log(err);
                     if(err)
                       return;

                     users.forEach(user => {
                        emailtemplate.then(etemplate => {
                            var email = utils.transformEmailTemplate(etemplate, {
                                to: user.email,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                duration: config.custom['duration'] 
                            });
                            utils.sendEmail(email, (err, info) => {
                                if(err)
                                   return;

                               var elog = new EventLog({type: type,  user: user._id});
                               elog.save();  
                            });//send email
                        });//email template
                     });
                 });
             });
         });
    });
}

function inactiveEmployees(){
    var re = new RegExp('^Inactive.*', 'i');
    getConfigs(path, {value: re, active: true}).then(configs => {
        configs.forEach(config => {     
 //            console.log('inactive employee');
             let type = 'Event.' + config.value;
             let emailtemplate = utils.getEmailTemplate(config.value);
             //get all users who are registered as employees but have not logged in 
             //past the trigger date (calculated from now - duration)
             //filter for each user if the last notification date
             //is prior to the frequency date
             let currdate = new Date();
             let triggerdate = currdate.addDuration('-' + config.custom['duration']);
             //let frequencydate = currdate.addDuration(config.custom['frequency']);
             let lastsentcutoff = currdate.addDuration('-' + config.custom['frequency']);

             EventLog.find({
                type: type 
              //  , timestamp:{$lt: frequencydate}
               ,timestamp:{$gt: lastsentcutoff}
              }, (err, events) => {
                    //console.log(err);
                    if(err)
                        return;
                    User.find({
                        usertype: config.custom['usertype']
                        ,isregisteredemployee: true
                        ,isblocked: false 
                        ,lastlogin:{$lt: triggerdate}
                        , '_id' : {$nin: events.map(event => {
                        return event.user;
                    })} }, function(err, users){
                    //users who have been inactive for the duration
                    //record in event log
                //  console.log(err);
                    if(err)
                    return;
         //           console.log(users.length);
         //           console.log(users);
                    users.forEach(user => {
                        emailtemplate.then(etemplate => {
                            var email = utils.transformEmailTemplate(etemplate, {
                                to: user.email,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                duration: config.custom['duration'] 
                            });
                            utils.sendEmail(email, (err, info) => {
                                if(err)
                                   return;

                               var elog = new EventLog({type: type,  user: user._id});
                               elog.save();  
                            });//send email
                        });//email template
                    });
                });
                    
             });//event log  
        });
    }); 
}

function expiredPromotion(){
    var re = new RegExp('^,Subscriptions,', 'i');
    getConfigs(re, 
                    {'custom.ispromoted': true}
                  ).then(configs =>{
         configs.forEach(config => {
             if(config.custom['promotionexpireson'] != null){
                var expiry = new Date(config.custom['promotionexpireson']);
            if(expiry < new Date()){
                    config.update({'custom.ispromoted': false}, (err, res) => {
                    });       
                }
   
             }
         }) ;  
    });

}