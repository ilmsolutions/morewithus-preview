import * as PATH from 'path';
import * as HBS from 'express-handlebars';
import * as nconf from 'nconf';

import {baseManager} from './base-manager';
import {schedulejobs} from '../policies/schedulejobs';

const ROOT = '../';
const defaultConfig = PATH.resolve(__dirname, ROOT, 'config/default.json');
nconf.argv().env().file({file: defaultConfig}).defaults({ENV: 'development'});

class _configManager extends baseManager{
   configureCommon(app) {
        schedulejobs();
        app.set('x-powered-by', false); 

        app.set('views', PATH.resolve(__dirname, ROOT, nconf.get('templateRoot')));

        app.engine('hbs', HBS({
            extname:'hbs', 
            defaultLayout:'main.hbs', 
            layoutsDir: PATH.resolve(__dirname, ROOT, nconf.get('templateLayouts'))
        }));

        app.set('view engine', 'hbs');
    }    
    constructor(){
        super();
    }
};

export let configManager = new _configManager();