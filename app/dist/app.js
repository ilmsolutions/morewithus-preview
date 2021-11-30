"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var nconf = require("nconf");
var passport = require("passport");
var session = require("express-session");
var compression = require("compression");
var config_manager_1 = require("./infrastructure/config-manager");
var route_manager_1 = require("./infrastructure/route-manager");
var assets_manager_1 = require("./infrastructure/assets-manager");
// Create a new express application instance
var app = express();
// The port the express app will listen on
var port = process.env.PORT || 3000;
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
app.use(bodyParser.json({ limit: '2000kb' }));
app.use(passport.initialize());
app.use(passport.session());
config_manager_1.configManager.handle(app);
assets_manager_1.assetsManager.handle(app);
route_manager_1.routeManager.handle(app);
app.locals = {
    paypal: nconf.get('payments.paypal')['clientid.' + process.env.NODE_ENV]
};
/*app.get('/', (req, res) => {
  res.send('Bismillah! Work with me App!');

});*/
// Serve the application at the given port
app.listen(port, function () {
    // Success callback
    console.log("Listening at http://localhost:" + port + "/");
});
//# sourceMappingURL=app.js.map