import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as nconf from 'nconf';
import * as passport from 'passport';
import * as session from 'express-session';
import * as compression from 'compression';
import {configManager} from './infrastructure/config-manager';
import {routeManager} from './infrastructure/route-manager';
import {assetsManager} from './infrastructure/assets-manager';

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port = process.env.PORT || 3000;
process.env.NODE_ENV = nconf.get('development') ? 'development' : 'production';

app.use(compression());
app.use(cookieParser(nconf.get('cookie').secret));
app.use(session({
                  secret: nconf.get('session').secret, resave: true, saveUninitialized: false
                  //,cookie: {maxAge: nconf.get('session').maxage}
                }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({limit: '2000kb'}));
app.use(passport.initialize());
app.use(passport.session());

configManager.handle(app);
assetsManager.handle(app);
routeManager.handle(app);

app.locals = {
  paypal : nconf.get('payments.paypal')['clientid.' + process.env.NODE_ENV]
};
/*app.get('/', (req, res) => {
  res.send('Bismillah! Work with me App!');

});*/
// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
