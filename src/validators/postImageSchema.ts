import { checkSchema } from "express-validator";

const postImageValidator = checkSchema({
    image: {
        notEmpty: {
            errorMessage: "No image selected"
        },
        trim: {}
    }
})

export default postImageValidator;