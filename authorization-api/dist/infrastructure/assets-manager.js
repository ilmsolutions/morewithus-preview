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
var express = require("express");
var nconf = require("nconf");
var base_manager_1 = require("./base-manager");
var ROOT = '../';
var _assetsManager = /** @class */ (function (_super) {
    __extends(_assetsManager, _super);
    function _assetsManager() {
        return _super.call(this) || this;
    }
    _assetsManager.prototype.configureCommon = function (app) {
        var staticFolders = nconf.get('staticFolders');
        var adjustedFolders = this.adjustStaticFolders(staticFolders, app.get('root'));
        adjustedFolders.forEach(function (folder) {
            app.use(nconf.get('staticFolderMount'), express.static(folder, {
                maxAge: nconf.get('maxAge')
            }));
        });
    };
    _assetsManager.prototype.adjustStaticFolders = function (folders, root) {
        var adjustedFolders = folders.map(function (folder) {
            return PATH.resolve(__dirname, ROOT, folder);
        });
        return adjustedFolders;
    };
    return _assetsManager;
}(base_manager_1.baseManager));
;
exports.assetsManager = new _assetsManager();
//# sourceMappingURL=assets-manager.js.map