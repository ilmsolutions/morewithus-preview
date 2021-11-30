"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.ConfigSchema = new mongoose_1.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    path: { type: String },
    custom: { type: mongoose_1.Schema.Types.Mixed }
});
exports.Config = mongoose_1.model('Config', exports.ConfigSchema);
//# sourceMappingURL=config.js.map