import { Router } from 'express';
import auth from '../controllers/Auth/Auth'
import UserRequestValidation from "../validators/UserRequestValidation"
import middleware from "../middleware/authMiddleware"
import loginValidator from "../validators/loginSchema"
import signUpValidator from "../validators/signUpSchema"
import passwordResetValidator from "../validators/passwordResetSchema"
import passwordResetLinkValidator from "../validators/passwordResetLinkSchema"
import AdminUserValidator from '../validators/Admin-createSchema';
import authorizeMiddleware from '../middleware/authorizeMiddleware';
import { Request,Response,NextFunction } from 'express';



//TODO: validating routes

const router = Router();

router.route('/register').post(signUpValidator,UserRequestValidation,auth.register);
router.route('/login').post(loginValidator,UserRequestValidation,auth.login);
router.route('/verify-email').post(auth.verifyEmail);
router.route('/reset-link').post(passwordResetLinkValidator,UserRequestValidation,auth.resetLink);
router.route('/reset-password').post(passwordResetValidator,UserRequestValidation,auth.resetPassword);
router.route('/refresh-token').get(middleware.verifyRefreshToken, auth.token);
router.route('/admin-register').post(middleware.verifyToken, (req:Request,res:Response,next:NextFunction)=>authorizeMiddleware.checkRole("ADMIN",req,res,next) ,
AdminUserValidator,UserRequestValidation,auth.adminCreateUser);


export default router;
