import * as express from 'express';
import * as PATH from 'path';
import * as fs from 'fs';
import {getApiRequest, postApiRequest} from './commons/apiservice';

let url = require('url');

let apiRouter = express.Router();
const ROOT = '../';


apiRouter.get('/data/json/:resource', function(req, res, next){
    const resource = req.params.resource;
    let file;
    switch(resource){
       case 'states.us':
           file = 'data/states_us.json';
           break;  
       default:
           file = 'data/' + resource + '.json';
           break; 
    }

    res.json(JSON.parse(fs.readFileSync(PATH.resolve(__dirname, ROOT, file), 'utf8')));
});


apiRouter.get('/external/:api/:resource', function(req, res, next){
   const api = req.params.api;
   const resource = req.params.resource;
   const query = url.parse(req.url).query;   

   getApiRequest(req, res, api, resource, query);
});


apiRouter.post('/external/:api/:resource', function(req, res, done){
    var body = req.body;
    const resource = req.params.resource;
    const api = req.params.api;
    
    if(!api || !resource || !body || !body.recaptcha)
      return res.status(500).json('invalid response')!

    postApiRequest(req, res, api, resource, body);
});

export = apiRouter;