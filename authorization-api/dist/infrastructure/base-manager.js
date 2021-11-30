"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nconf = require("nconf");
var baseManager = /** @class */ (function () {
    function baseManager() {
    }
    baseManager.prototype.configureCommon = function (app) { };
    ;
    baseManager.prototype.configureDevelopmentEnv = function (app) { };
    ;
    baseManager.prototype.configureProductionEnv = function (app) { };
    ;
    baseManager.prototype.handle = function (app) {
        this.configureCommon(app);
        //console.log(nconf.get('development'));
        if (nconf.get('development')) {
            this.configureDevelopmentEnv(app);
        }
        else {
            this.configureProductionEnv(app);
        }
    };
    return baseManager;
}());
exports.baseManager = baseManager;
;
//# sourceMappingURL=base-manager.js.map