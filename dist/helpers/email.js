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
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid_1 = __importDefault(require("nodemailer-sendgrid"));
const emailConfirmation = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = nodemailer_1.default.createTransport((0, nodemailer_sendgrid_1.default)({
        apiKey: process.env.SENDGRID_API_KEY
    }));
    yield transport.sendMail(msg);
});
const emailData = (from, to, subject, html) => {
    const msg = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };
    return msg;
};
exports.default = { emailConfirmation, emailData };
//# sourceMappingURL=email.js.map