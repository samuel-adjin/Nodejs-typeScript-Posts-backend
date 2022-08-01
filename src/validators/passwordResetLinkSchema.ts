import { checkSchema } from "express-validator";


const passwordResetLinkValidator = checkSchema({
    email:{
        isEmail: {
            bail: true,
          },
          normalizeEmail: {
            options: {
              all_lowercase: true,
            },
          },
        notEmpty:{
            errorMessage:"Email field is "
        },
    }
})


export default passwordResetLinkValidator;