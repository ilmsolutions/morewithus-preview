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
var PATH = require("path");
var HBS = require("express-handlebars");
var nconf = require("nconf");
var handlebars_1 = require("../helpers/handlebars");
var base_manager_1 = require("./base-manager");
require('css-modules-require-hook/preset');
var ROOT = '../';
var defaultConfig = PATH.resolve(__dirname, ROOT, 'config/default.json');
nconf.argv().env().file({ file: defaultConfig }).defaults({ ENV: 'development' });
var _configManager = /** @class */ (function (_super) {
    __extends(_configManager, _super);
    function _configManager() {
        return _super.call(this) || this;
    }
    _configManager.prototype.configureCommon = function (app) {
        app.set('x-powered-by', false);
        app.set('views', PATH.resolve(__dirname, ROOT, nconf.get('templateRoot')));
        app.engine('hbs', HBS({
            extname: 'hbs',
            defaultLayout: 'main.' + process.env.NODE_ENV + '.hbs',
            helpers: handlebars_1.helpers,
            layoutsDir: PATH.resolve(__dirname, ROOT, nconf.get('templateLayouts'))
        }));
        app.set('view engine', 'hbs');
    };
    return _configManager;
}(base_manager_1.baseManager));
;
exports.configManager = new _configManager();
//# sourceMappingURL=config-manager.js.map