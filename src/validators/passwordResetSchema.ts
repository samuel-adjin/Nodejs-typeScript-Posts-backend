import { checkSchema } from "express-validator";


const passwordResetSchema = checkSchema({
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
})


export default passwordResetSchema;