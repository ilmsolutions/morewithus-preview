"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.ClientSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true },
    id: { type: String, required: true },
    secret: { type: String, required: true },
    userid: { type: String, required: true },
    baseuri: { type: String, required: true },
    redirecturi: { type: String, required: true }
});
exports.ClientSchema.pre('save', function (next) {
    //do something
    next();
});
exports.Client = mongoose_1.model('Client', exports.ClientSchema);
//# sourceMappingURL=client.js.map