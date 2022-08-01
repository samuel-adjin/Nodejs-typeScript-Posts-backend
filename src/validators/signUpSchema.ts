import { checkSchema } from "express-validator";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()


const signUpValidator = checkSchema({
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

    plainPassword: {
        isString: {
            errorMessage: "Error in password"
        },
        isLength: {
            options: {
                min: 4,
                max: 25
            }
        },

    },

    passwordConfirmation: {
        custom: {
            options(value, { req }) {
                if (value === req.body.plainPassword) {
                    return true
                }
                throw new Error('Password confirmation does not match password');
            }
        }
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



})


export default signUpValidator