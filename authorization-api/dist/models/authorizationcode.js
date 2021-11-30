"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.AuthorizationCodeSchema = new mongoose_1.Schema({
    code: { type: String, unique: true, required: true },
    clientid: { type: String, required: true },
    redirecturi: { type: String, required: true },
    userid: { type: String, required: true },
    scope: { type: String, required: true }
});
exports.AuthorizationCodeSchema.pre('save', function (next) {
    //do something
    next();
});
exports.AuthorizationCode = mongoose_1.model('AuthorizationCode', exports.AuthorizationCodeSchema);
//# sourceMappingURL=authorizationcode.js.map