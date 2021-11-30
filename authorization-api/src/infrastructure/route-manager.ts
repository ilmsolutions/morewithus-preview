import * as FS from 'fs';
import * as express from 'express';
import {baseManager} from './base-manager';
import * as clientRouter from '../routers/ClientRouter';
import * as appRouter from '../routers/AppRouter';
import * as authAppRouter from '../routers/AuthAppRouter';
import * as apiRouter from '../routers/ApiRouter';
import * as authApiRouter from '../routers/AuthApiRouter';
import * as settingsApiRouter from '../routers/SettingsApiRouter';
import * as adminApiRouter from '../routers/AdminApiRouter';

class _routeManager extends baseManager{
    configureCommon(app) {
        this.configureApiRoutes(app);     
        this.configureAppRoutes(app);      
    };

    private configureApiRoutes(app){
      app.use('/api/client', clientRouter); 
      app.use('/api/settings', settingsApiRouter);
      app.use('/api/admin', adminApiRouter);
      app.use('/api/auth', authApiRouter);  
      app.use('/api', apiRouter);  
    }

    private configureAppRoutes(app){
        app.use('/auth',  authAppRouter);
        app.use('/', appRouter);
    }    


     constructor(){
        super();
    }
}

export let routeManager = new _routeManager();