import { Router } from 'express';
import auth from '../controllers/Auth/Auth'
import UserRequestRules from "../validators/UserRequestRules"
import UserRequestValidation from "../validators/UserRequestValidation"
// import loginRequestRules from '../validators/LoginRequestRules'
import middleware from "../middleware/authMiddleware"

const router = Router();

router.route('/register').post( auth.register);
router.route('/login').post(auth.login);
router.route('/verify-email').post(auth.verifyEmail);
router.route('/reset-link').post(auth.resetLink);
router.route('/reset-password').post(auth.resetPassword);
router.route('/refresh-token').get(middleware.verifyRefreshToken, auth.token);

export default router;
