"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const customLevels_1 = __importDefault(require("./customLevels"));
class Logger {
    constructor() {
        const prodTransport = new winston_1.default.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        });
        const transport = new winston_1.default.transports.Console({
            format: customLevels_1.default.formatter,
        });
        this.logger = winston_1.default.createLogger({
            level: this.isDevEnvironment() ? 'debug' : 'warn',
            levels: customLevels_1.default.customLevels.levels,
            transports: [this.isDevEnvironment() ? transport : prodTransport],
        });
        winston_1.default.addColors(customLevels_1.default.customLevels.colors);
    }
    http(msg, meta) {
        this.logger.log('trace', msg, meta);
    }
    debug(msg, meta) {
        this.logger.debug(msg, meta);
    }
    info(msg, meta) {
        this.logger.info(msg, meta);
    }
    warn(msg, meta) {
        this.logger.warn(msg, meta);
    }
    error(msg, meta) {
        this.logger.error(msg, meta);
    }
    // fatal(msg: any, meta?: any) {
    //   this.logger.log('fatal', msg, meta);
    // }
    isDevEnvironment() {
        const env = process.env.NODE_ENV || 'development';
        return env === 'development';
    }
}
exports.logger = new Logger();
//# sourceMappingURL=logger.js.map