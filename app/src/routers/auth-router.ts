import * as express from 'express';
import * as oauth2 from '../policies/oauth2';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {renderToString,renderToStaticMarkup} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from '../routes';
import DataWrapper from '../components/datawrapper';
import {encrypt, decrypt} from '../helpers/encryptutils';
import {postApiRequest} from './commons/authservice';
import {Statics} from './commons/statics';


let authRouter = express.Router();

authRouter.get('/login', oauth2.login);

authRouter.get('/callback', oauth2.authorizationCallback);

/*authRouter.get('/profile', oauth2.ensureAuthenticated, function(req, res, next){
   console.log(req.user);
   console.log(req.session);
});*/

authRouter.get('/logout', oauth2.logout);

authRouter.get('/*', oauth2.ensureAuthenticated, (req, res) => {
       let props = Object.assign({}, {
                                      banner: Statics.get('banner')
                                      ,socials: Statics.get('socials')
                                      , metatags: Statics.get('metatags')
                                    }) ;
        match({routes, location: req.originalUrl}, (err, redirectLocation, renderProps) => {
            //console.log(req.user);
            let {type} = renderProps ? renderProps.params : {type: null};

            const data = {session:{isAuthenticated: req.isAuthenticated(), 
                                   user: req.user && req.user.profile ? req.user.profile : null}
                          ,...props};  
            const html = render(renderProps, data);

            if(props.metatags && props.metatags.length > 0)
                res.locals.metaTags = type && props.metatags.filter(mt => {
                    return type.toLowerCase() == mt.type.toLowerCase();
                })[0] || props.metatags[0];
                
            //res.locals.metaTags = Statics.get('metatags')[0];

            res.render('index', {
                        content: html,
                        context: data
            });

            
            /*this.retrieveLatestBills((err, data) => {
                if(!err) {
                    const html = this.render(renderProps, data);

                    res.render('index', {
                        content: html,
                        context: data
                    });
                } else {
                    res.status(500).send();
                }
            });*/
        });
 });

 authRouter.post('/profile/:tab', oauth2.ensureAuthenticated, (req, res) =>{
     let tab = req.params.tab;
     let pdata = {};
     switch(tab){
         case 'changepassword':
            if(req.body.currentPassword && req.body.password &&
               req.body.passwordConfirm && req.body.password == req.body.passwordConfirm)
                pdata = (Object.assign({}, {
                'current': encrypt(req.body.currentPassword),
                'password': encrypt(req.body.password)
                }));
            break;
     };
     //console.log(pdata);
     postApiRequest(req, res, 'authorization', tab, pdata, (err, response) => {
        var status = null;
        var message = '';
        if(err){
          status = false;
          message = 'Failed to update password.';
        }
        else{
          status = true;
          message = 'Password updated.';
        }

        res.redirect(req.originalUrl.split('?')[0] + 
                         '?status=' + status + '&message=' + message);
    });
});

function render(renderProps: any, data: object) :string {
        const additionalProps = {context: data};
        const elem = React.createElement(RouterContext, {...renderProps});       
        const wrapper = React.createElement(DataWrapper, {...additionalProps}, elem);
        const html = renderToStaticMarkup(wrapper);
        return html;
}  


export = authRouter;