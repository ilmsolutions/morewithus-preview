import * as express from 'express';
import {Client, IClientModel} from '../models/client';
import {Library} from '../utils/library';
import {App} from '../components/App';
import {Login} from '../components/login';
import {Signup} from '../components/signup';
import {Verify} from '../components/verify';
import {Forgot} from '../components/forgot';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {renderToString,renderToStaticMarkup} from 'react-dom/server';


let appRouter = express.Router();

appRouter.get('/login', function(req, res){
    getClient(getClientId(req), (props) => {
        const status = req.app.locals.getFlashStatus(req);
        let params = Object.assign({}, {status: status}, props);
        const elem = React.createElement(App, params, 
                                              React.createElement(Login));

        res.locals.metaTags = {
            title: Library.META_DEFAULT_TITLE
        }; 
                                   
        res.render('index', {
             content: renderToString(elem),
             context: {}
         });
    
    });
});

appRouter.get('/signup', function(req, res){
    getClient(getClientId(req), (props) => {
        let params = Object.assign({}, {status: req.app.locals.getFlashStatus(req)}
                                     , props);
        const elem = React.createElement(App, params, 
                                            React.createElement(Signup));

        res.locals.metaTags = {
             title: Library.META_SIGNUP_TITLE
            ,description: Library.META_SIGNUP_DESCRIPTION
            ,keywords: Library.META_SIGNUP_KEYWORDS
        }; 

        res.render('index', {
            content: renderToString(elem),
            context:{}
        });

    });    
});

appRouter.get('/forgot', function(req, res){
    getClient(getClientId(req), (props) => {
        let params = Object.assign({}, {status: req.app.locals.getFlashStatus(req)}
                                     , {context: req.query}, props);
        const elem = React.createElement(App, params, 
                                            React.createElement(Forgot));

        res.locals.metaTags = {
            title: Library.META_DEFAULT_TITLE
        }; 
                                    
        res.render('index', {
            content: renderToString(elem),
            context:{}
        });

    });    
});
appRouter.get('/verify', function(req, res){

    if(req.session.orgReturnTo)
       {
           req.session.returnTo = req.session.orgReturnTo;
           req.flash('redirect', req.session.message);
           delete req.session.message;
           delete req.session.orgReturnTo;

       }

    getClient(getClientId(req), (props) => {
        let params = Object.assign({}, {status: req.app.locals.getFlashStatus(req)
                                       ,context: req.query}
                                     , props);
        const elem = React.createElement(App, params, 
                                            React.createElement(Verify));

        res.locals.metaTags = {
            title: Library.META_DEFAULT_TITLE
        }; 

        res.render('index', {
            content: renderToString(elem),
            context:{}
        });

    });    
    
})

export = appRouter;

/* function getClient(returnTo, next){

    if(!returnTo) return next({});
    var query = require('url').parse(returnTo, true).query;
    if(!query || !query.client_id)
       return next({});

    return Client.findOne({id: query.client_id}, {userid: 0, secret: 0}, function(err, client) {
        if (err || !client) { return null; }
        return next({client: client.toJSON()});
    });    
} */

function getClientId(req){
    if(req.session.returnTo){
        var query = require('url').parse(req.session.returnTo, true).query;
        if(query && query.client_id)
          return query.client_id;
    }
    else if(req.query && req.query.client_id)
         return req.query.client_id;
    return null;
}

function getClient(clientid, next){
    if(!clientid || clientid.length <= 0)
       return next({});
       return Client.findOne({id: clientid}, {userid: 0, secret: 0}, function(err, client) {
        if (err || !client) { return null; }
        return next({client: client.toJSON()});
    });         
}