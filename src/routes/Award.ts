import { Router } from 'express';
import bestEditForCurrentMonth from "../controllers/Award/Award"
import middleware from "../middleware/authMiddleware"

const router = Router();


router.route('/').get(middleware.verifyToken, bestEditForCurrentMonth);


export default router