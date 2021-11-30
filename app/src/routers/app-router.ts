import * as express from 'express';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as request from 'request';
import {renderToString,renderToStaticMarkup} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from '../routes';
import DataWrapper from '../components/datawrapper';
import {Statics} from './commons/statics';

let appRouter = express.Router();

appRouter.get('/*', (req, res) => {
        let {ispopup} = req.query;

        let props = Object.assign({}, {banner: Statics.get('banner'), 
                                       socials: Statics.get('socials'),
                                       metatags: Statics.get('metatags'),
                                       hidenavigation : ispopup}) ;
        match({routes, location: req.originalUrl}, (err, redirectLocation, renderProps) => {
            let {type} = renderProps ? renderProps.params : {type: null};
            const data = {session:{
                                   isAuthenticated: req.isAuthenticated(), 
                                   user: req.user && req.user.profile ? req.user.profile : null
                                  }
                           , ...props
                         };  

            const html = render(renderProps, data);


            if(props.metatags && props.metatags.length > 0)
                res.locals.metaTags = type && props.metatags.filter(mt => {
                    return type.toLowerCase() == mt.type.toLowerCase();
                })[0] || props.metatags[0];
        
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

function render(renderProps: any, data: object) :string {
        const additionalProps = {context: data};
        const elem = React.createElement(RouterContext, {...renderProps});       
        const wrapper = React.createElement(DataWrapper, {...additionalProps}, elem);
        const html = renderToStaticMarkup(wrapper);
        return html;
}  

export = appRouter;