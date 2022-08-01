import { checkSchema } from "express-validator";

const postUpdateValidator = checkSchema({
    title: {
        isString: {
            errorMessage: "Error in title"
        },
        isLength: {
            options: {
                min: 3,

            }
        },
        notEmpty: {
            errorMessage: "title field is empty"
        },
        trim: {}
    },
    content: {
        isString: {
            errorMessage: "Error in content"
        },
        isLength: {
            options: {
                min: 5
            }
        }
    },
})

export default postUpdateValidator


