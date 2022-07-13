"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("loggers/logger");
const BaseError_1 = __importDefault(require("./BaseError"));
class ErrorHandler {
    handleError(err) {
        return __awaiter(this, void 0, void 0, function* () {
            yield logger_1.logger.error('Error message from the centralized error-handling component', err);
        });
    }
    isTrustedError(error) {
        if (error instanceof BaseError_1.default) {
            return error.isOperational;
        }
        return false;
    }
}
exports.errorHandler = new ErrorHandler();
//# sourceMappingURL=errorHandler.js.map