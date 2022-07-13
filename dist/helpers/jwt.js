"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwt = (userData, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(userData, secret, { expiresIn: expiresIn });
};
exports.default = { generateJwt };
//# sourceMappingURL=jwt.js.map