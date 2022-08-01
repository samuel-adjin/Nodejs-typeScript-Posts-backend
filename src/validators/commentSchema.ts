import { checkSchema } from "express-validator";


const commentValidator = checkSchema({
    comment:{
        notEmpty:{
            errorMessage:"Empty field"
        },
        trim:{}
    }
})


export default commentValidator;
