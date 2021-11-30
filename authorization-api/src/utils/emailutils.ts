import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as nconf from 'nconf';
import {EmailRenderer} from '../components/main/emailrenderer';
import {Config} from '../models/admin/config';


const nodeMailer = require('nodemailer');
const path = new RegExp('^,EmailNotifications,', 'i');


export function getEmailTemplate(key: string){
    return Config.findOne({path: path, value: key}, (err, config) => {
        if(err)
           return null;
        return config;
    })
}

export function sendEmail(email, cb){
    console.log('am in email');

    //check if environment is development
    if(nconf.get('development') == true)
       email.to = nconf.get('accounts')['testemail'];

       let elem = React.createElement(EmailRenderer, {body: email.body});
    let transporter =  nodeMailer.createTransport(nconf.get('accounts')['email']);
    let mailOptions = {...email,
        from: nconf.get('accounts')['email.from'],
       //text: emailHtml,
       html: ReactDOMServer.renderToStaticMarkup(elem)
    };
    // verify connection configuration
    // transporter.verify(function(error, success) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Server is ready to take our messages');
    //     }
    // });
    transporter.sendMail(mailOptions, (err, info) => {
        if(err)
          cb(err);
        cb(null, info);
    });

}


export function transformEmailTemplate(config, data){
    data = Object.assign({}, data, {app: nconf.get('domain')});
    let email = {to: data.to};
    Object.keys(config.custom).forEach(prop => {
        switch(true){
            case /^(cc|bcc|body|subject)$/.test(prop):
                email = Object.assign(email, {[prop] : config.custom[prop]})
                break;
        }
    });
    Object.keys(data).forEach(key => {
        var rex = new RegExp('{' + key + '}', 'ig');
        email['subject'] = email['subject'].replace(rex, data[key]);
        email['body'] = email['body'].replace(rex, data[key]);
    });
    return email;

}
