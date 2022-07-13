import {Router} from 'express';
import auth from '../controllers/Auth/Auth'
import userRules from "../validators/UserRequestRules"
import validation from "../validators/UserRequestValidation"

const router = Router();

router.route('/register').post(userRules.UserRequestRules,validation.UserRequestValidation,auth.register);
router.route('/login').post(auth.login);
router.route('verify-email').post(auth.verifyEmail);
router.route('/reset-link').post(auth.resetLink);
router.route('/reset-password').post(auth.resetPassword);
router.route('/refresh-token').get(auth.token);

export default router;