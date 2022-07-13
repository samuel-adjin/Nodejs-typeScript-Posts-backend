import { body } from "express-validator";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const UserRequestRules =
    [
        body('email').isEmail().normalizeEmail().toLowerCase().trim(),
        body('username').isLength({ min: 5, max: 15 }).trim().notEmpty(),
        body('firstName').trim().isLength({ min: 1, max: 25 }).notEmpty(),
        body('middleName').trim().isLength({ min: 1, max: 25 }),
        body('lastName').trim().isLength({ min: 1, max: 25 }).notEmpty(),
        body('plainPassword').trim().notEmpty(),
        body('passwordConfirmation').custom((value, { req }) => {
            if (value !== req.body.plainPassword) {
                throw new Error('Password confirmation does not match password');
            }
            return true
        }),

        body('email').custom(async value => {
            const user = await prisma.user.findUnique({
                where: {
                    email: value
                }
            });
            if (user) {
                
                return Promise.reject('Email already in use');
            }
        }),

        body('username').custom(async value => {
            const user = await prisma.user.findUnique({
                where: {
                    username: value
                }
            });
            if (user) {
                return Promise.reject('Username already in use');
            }
        }),

    ]


export default { UserRequestRules }