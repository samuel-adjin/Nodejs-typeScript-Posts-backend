import { checkSchema } from "express-validator";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

const userUpdateValidator = checkSchema({
    username: {
        isString: {
            errorMessage: "Error In username"
        },
        notEmpty: {
            errorMessage: "Username is empty"
        },
        trim: {},
        custom: {
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: {
                        username: value
                    }
                });
                if (user) {
                    return Promise.reject('Username already in use');
                }
                return true;
            }
        }
    },
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
    middleName: {
        isString: {
            errorMessage: "Error in otherName",
        },
        isLength: {
            options: {
                min: 5,
                max: 25
            }
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



})


export default userUpdateValidator;


