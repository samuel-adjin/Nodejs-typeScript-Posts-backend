import { checkSchema } from "express-validator";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()



const AdminUserValidator = checkSchema({
    firstName: {
        isString: {
            errorMessage: "Error in firstName",
        },
        isLength: {
            options: {
                min: 5,
                max: 25
            }
        },
        notEmpty: {
            errorMessage: "first name is empty"
        },
        trim: {}
    },
    mobile: {
        isString: {
            errorMessage: "Error in firstName",
        },
        isLength: {
            options: {
                min: 10,
                max: 10
            }
        },
        notEmpty: {
            errorMessage: "first name is empty"
        },
        trim: {}
    },

    lastName: {
        isString: {
            errorMessage: "Error in firstName",
        },
        isLength: {
            options: {
                min: 5,
                max: 25
            }
        },
        notEmpty: {
            errorMessage: "last name is empty"
        },
        trim: {}
    },

    email: {
        isEmail: {
            bail: true,
        },
        normalizeEmail: {
            options: {
                all_lowercase: true,
            },
        },
        notEmpty: {
            errorMessage: "Email field is "
        },

        custom: {
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: {
                        email: value
                    }
                });
                if (user) {
                    return Promise.reject('Email already in use');
                }
                return true;
            }
        }
    },
})


export default AdminUserValidator;