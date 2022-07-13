"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
'../helpers/email';
const emailQueue = new bullmq_1.Queue('emailJob', {
    connection: {
        port: 6379
    }
});
exports.default = emailQueue;
//# sourceMappingURL=emailJob.js.map