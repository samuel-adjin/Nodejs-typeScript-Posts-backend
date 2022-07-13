"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("./BaseError"));
const http_status_codes_1 = require("http-status-codes");
class BadRequest extends BaseError_1.default {
    constructor(message = "Bad request", statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST, isOperational = true, name) {
        super(message, statusCode, isOperational, name);
    }
}
exports.default = BadRequest;
//# sourceMappingURL=BadRequest.js.map