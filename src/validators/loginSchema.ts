import { checkSchema } from "express-validator";

const loginValidator = checkSchema({
  username: {
    isString: {
      errorMessage: "Error in username",
    },
    notEmpty: {
      errorMessage: "username is empty",
    },
    trim: {
    },
  },

  password: {
    isString: {
      errorMessage: "Error in password"
    },
    notEmpty: {
      errorMessage: "Password is empty"
    },
    trim: {

    }
  }
})


export default loginValidator;