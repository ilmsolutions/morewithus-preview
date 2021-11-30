"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.EventLogSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    user: { type: String, required: true }
});
exports.EventLog = mongoose_1.model('EventLog', exports.EventLogSchema);
//# sourceMappingURL=eventlog.js.map