import { body } from "express-validator";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


const passwordResetRule = [

    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.plainPassword) {
            throw new Error('Password confirmation does not match password');
        }
        return true
    }),
];

export default passwordResetRule;