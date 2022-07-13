"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const ErrorHandlerMiddleware_1 = __importDefault(require("middleware/ErrorHandlerMiddleware"));
const node_process_1 = __importDefault(require("node:process"));
const errorHandler_1 = require("errors/errorHandler");
const morganMiddleware_1 = __importDefault(require("middleware/morganMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use((0, express_1.urlencoded)({ extended: false }));
app.use(express_1.default.json());
app.use(ErrorHandlerMiddleware_1.default);
app.use(morganMiddleware_1.default);
// healthCheck
app.get('/health', (req, res) => {
    res.status(200).json("Application health is good");
});
// const eventEmitter = new EventEmitter();
node_process_1.default.on('uncaughtException', (error) => {
    errorHandler_1.errorHandler.handleError(error);
    if (!errorHandler_1.errorHandler.isTrustedError(error)) {
        node_process_1.default.exit(1);
    }
});
node_process_1.default.on('unhandledRejection', (reason, promise) => {
    throw reason;
});
exports.default = app;
//# sourceMappingURL=app.js.map