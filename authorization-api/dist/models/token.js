"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.TokenSchema = new mongoose_1.Schema({
    value: { type: String, required: true },
    clientid: { type: String, required: true },
    userid: { type: String, required: true }
});
exports.TokenSchema.pre('save', function (next) {
    //do something
    next();
});
exports.Token = mongoose_1.model('Token', exports.TokenSchema);
//# sourceMappingURL=token.js.map