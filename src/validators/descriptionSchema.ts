import { checkSchema } from "express-validator";

const descriptionValidator = checkSchema({
    description:{
        isString:{
            errorMessage:"Error in Description"
        },
        notEmpty:{
            errorMessage:"Field is empty"
        }
    }
})


export default descriptionValidator;