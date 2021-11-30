import * as FS from 'fs';
import * as express from 'express';
import {baseManager} from './base-manager';
import * as appRouter from '../routers/app-router';
import * as authRouter from '../routers/auth-router';
import * as apiRouter from '../routers/api-router';
import * as authApiRouter from '../routers/authapi-router';

class _routeManager extends baseManager{
    configureCommon(app) {
        app.use('/api/auth', authApiRouter);
        app.use('/api', apiRouter);
        app.use('/auth', authRouter);
        app.use('/', appRouter);  

    };
  
    constructor(){
        super();
    }
}

export let routeManager = new _routeManager();