"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_manager_1 = require("./base-manager");
var clientRouter = require("../routers/ClientRouter");
var appRouter = require("../routers/AppRouter");
var authAppRouter = require("../routers/AuthAppRouter");
var apiRouter = require("../routers/ApiRouter");
var authApiRouter = require("../routers/AuthApiRouter");
var settingsApiRouter = require("../routers/SettingsApiRouter");
var adminApiRouter = require("../routers/AdminApiRouter");
var _routeManager = /** @class */ (function (_super) {
    __extends(_routeManager, _super);
    function _routeManager() {
        return _super.call(this) || this;
    }
    _routeManager.prototype.configureCommon = function (app) {
        this.configureApiRoutes(app);
        this.configureAppRoutes(app);
    };
    ;
    _routeManager.prototype.configureApiRoutes = function (app) {
        app.use('/api/client', clientRouter);
        app.use('/api/settings', settingsApiRouter);
        app.use('/api/admin', adminApiRouter);
        app.use('/api/auth', authApiRouter);
        app.use('/api', apiRouter);
    };
    _routeManager.prototype.configureAppRoutes = function (app) {
        app.use('/auth', authAppRouter);
        app.use('/', appRouter);
    };
    return _routeManager;
}(base_manager_1.baseManager));
exports.routeManager = new _routeManager();
//# sourceMappingURL=route-manager.js.map