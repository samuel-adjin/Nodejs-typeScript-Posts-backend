import { checkSchema } from "express-validator";

const imageValidator = checkSchema({
    image:{
        notEmpty:{
            errorMessage:"No file Selected"
        }
    }
})

export default imageValidator;
