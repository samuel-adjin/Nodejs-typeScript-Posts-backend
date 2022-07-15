import { body } from "express-validator";


const postUpdateImageRules = 
[
    body('image').trim().notEmpty(),
]


export default { postUpdateImageRules }