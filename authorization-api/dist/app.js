"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var nconf = require("nconf");
var express = require("express");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var config_manager_1 = require("./infrastructure/config-manager");
var assets_manager_1 = require("./infrastructure/assets-manager");
var route_manager_1 = require("./infrastructure/route-manager");
var flash = require("connect-flash");
var helpers_1 = require("./utils/helpers");
// Create a new express application instance
var app = express();
// The port the express app will listen on
var port = process.env.PORT || nconf.get('port');
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
app.locals = helpers_1.helpers;
// Mongoose backend db connect 
mongoose.connect(nconf.get('db').connect, nconf.get('db').options);
config_manager_1.configManager.handle(app);
assets_manager_1.assetsManager.handle(app);
route_manager_1.routeManager.handle(app);
/*app.get('/', (req, res) => {
  res.send('Bismillah! Work with me Authorization API!');

});*/
/// Serve the application at the given port
app.listen(port, function () {
    // Success callback
    console.log("Listening at http://localhost:" + port + "/");
});
//# sourceMappingURL=app.js.map