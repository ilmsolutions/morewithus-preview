import * as PATH from 'path';
import * as HBS from 'express-handlebars';
import * as nconf from 'nconf';
import {helpers} from '../helpers/handlebars';
import {baseManager} from './base-manager';

require('css-modules-require-hook/preset');

const ROOT = '../';
const defaultConfig = PATH.resolve(__dirname, ROOT, 'config/default.json');
nconf.argv().env().file({file: defaultConfig}).defaults({ENV: 'development'});

class _configManager extends baseManager{
   configureCommon(app){
        app.set('x-powered-by', false); 

        app.set('views', PATH.resolve(__dirname, ROOT, nconf.get('templateRoot')));
        app.engine('hbs', HBS({
            extname:'hbs', 
            defaultLayout:'main.' + process.env.NODE_ENV + '.hbs', 
            helpers: helpers,
            layoutsDir: PATH.resolve(__dirname, ROOT, nconf.get('templateLayouts'))
        }));

        app.set('view engine', 'hbs');

   }
    constructor(){
        super();
    }
};

export let configManager = new _configManager();