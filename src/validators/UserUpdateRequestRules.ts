// import { body,check } from "express-validator";
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient()

// const UserUpdateRequestRules =
//     [
//         check('email').isEmail().normalizeEmail().toLowerCase().trim().notEmpty,
//         body('username').isLength({ min: 5, max: 15 }).trim().notEmpty(),
//         body('firstName').trim().isLength({ min: 1, max: 25 }).notEmpty(),
//         body('middleName').trim().isLength({ min: 1, max: 25 }),
//         body('lastName').trim().isLength({ min: 1, max: 25 }).notEmpty(),
//         body('username').custom(async value => {
//             const user = await prisma.user.findUnique({
//                 where: {
//                     username: value
//                 }
//             });
//             if (user) {
//                 return Promise.reject('Username already in use');
//             }

//         }),

//     ]


// export default { UserUpdateRequestRules }