"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
const app_1 = __importDefault(require("./app"));
const Debug = (0, debug_1.default)('farad:server');
const server = http_1.default.createServer(app_1.default);
server.on('listening', () => {
    Debug('Connection running');
});
server.on('close', () => {
    Debug('Server shutting down');
    process.exit(0);
});
exports.default = server;
//# sourceMappingURL=server.js.map