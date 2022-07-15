import { body } from "express-validator";

const loginRequestRules = 
[
    body('email').isEmail().normalizeEmail().toLowerCase().trim().notEmpty,
    body('password').notEmpty
]

export default {loginRequestRules}