import { Router } from 'express';
import bestEditForCurrentMonth from "../controllers/Award/Award"
// import commentRules from "../validators/CommentRequestRules"
// import validation from "../validators/UserRequestValidation"
import middleware from "../middleware/authMiddleware"

const router = Router();


router.route('/').get(bestEditForCurrentMonth);


export default router