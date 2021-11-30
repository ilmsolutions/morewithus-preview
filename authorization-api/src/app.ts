import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as nconf from 'nconf';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import * as passport from 'passport';
import {configManager} from './infrastructure/config-manager';
import {assetsManager} from './infrastructure/assets-manager';
import {routeManager} from './infrastructure/route-manager';
import flash = require('connect-flash');
import {helpers} from './utils/helpers';



// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: number = process.env.PORT || nconf.get('port');

app.use(cookieParser());
app.use(session({
                  secret: nconf.get('session').secret, resave: true, saveUninitialized: true
                  //,cookie: {maxAge: nconf.get('session').maxage}
                }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.locals = helpers;

// Mongoose backend db connect 
mongoose.connect(nconf.get('db').connect, nconf.get('db').options);

configManager.handle(app);
assetsManager.handle(app);
routeManager.handle(app);
/*app.get('/', (req, res) => {
  res.send('Bismillah! Work with me Authorization API!');

});*/


/// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
