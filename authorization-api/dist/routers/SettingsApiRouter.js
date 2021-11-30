"use strict";
var express = require("express");
var settings_1 = require("./handlers/settings");
var apiRouter = express.Router();
apiRouter.get('/configuration/:key', function (req, res, next) {
    var metaonly = req.query.metaonly ? true : false;
    settings_1.getConfig(req.params.key, metaonly, function (err, result) {
        if (err)
            return next(err);
        return res.json(result);
    });
});
module.exports = apiRouter;
//# sourceMappingURL=SettingsApiRouter.js.map