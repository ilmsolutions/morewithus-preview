import * as express from 'express';
import * as fs from 'fs';
import * as nconf from 'nconf';
import {resolve} from 'path';
import {authorizedApiRequest, getApiRequest, postApiRequest, deleteApiRequest} from './commons/authservice';
import * as oauth2 from '../policies/oauth2';

let url = require('url');
const URL = require('url').Url;

let authApiRouter = express.Router();

authApiRouter.get('/locals/:resource', oauth2.ensureAuthenticatedAPI, (req, res) => {
     var resource = req.params.resource,
         resp = null;
     switch(true){
         case /paypal/.test(resource):              
              resp = {
                       env: process.env.NODE_ENV == 'development' ? 'sandbox' : process.env.NODE_ENV
                      , apikey: req.app.locals.paypal
                    };
              break;
     }

     console.log(resp);
     res.json(resp);
});


authApiRouter.get('/external/:api/:resource/:id?', oauth2.ensureAuthenticatedAPI, function(req, res, next){
    //console.log('am i getting in here - get api');
   getApiRequest(req, res, req.params.api, req.params.resource
                 ,req.params.id, url.parse(req.url).query);
});

authApiRouter.post('/external/:api/:resource', oauth2.ensureAuthenticatedAPI, (req, res) =>{
   postApiRequest(req, res, req.params.api, req.params.resource, req.body);
});

authApiRouter.delete('/external/:api/:resource', oauth2.ensureAuthenticatedAPI, (req, res) => {
   deleteApiRequest(req, res, req.params.api, req.params.resource, {params: req.query});
});

authApiRouter.post('/upload/:type', oauth2.ensureAuthenticatedAPI, (req, res, done) =>{
    var data = req.body;
    var type = req.params.type;
    if(!data[type] || !data.file)
       return done(new Error('Invalid request body'));

    let path = '/assets/images/' + data.file;
    let content = data[type].split(',')[1];
    
    fs.writeFile(resolve(__dirname, '..' + path), content, 'base64', err => {
        if(err)
            return done(err);
        return res.json({[type]: path, file: data.file});
    });
});

authApiRouter.use(function(err, req, res, next){
    if(err){
     delete err.stack;
     //console.log('am i getting in this error handler');
     //console.log(err.message);
     res.status(err.statusCode || 500).json(err.message);
    }
});

export = authApiRouter;