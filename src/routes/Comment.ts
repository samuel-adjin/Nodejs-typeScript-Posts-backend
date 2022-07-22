import { Router } from 'express';
import comment from "../controllers/Comment/Comment"
// import commentRules from "../validators/CommentRequestRules"
// import validation from "../validators/UserRequestValidation"
import middleware from "../middleware/authMiddleware"

const router = Router();


router.route('/:id').post(middleware.verifyToken,comment.addComment);
router.route('/:id/:postId').delete(middleware.verifyToken,comment.deleteComment);
router.route('/:id').get(middleware.verifyToken,comment.getAPostComments);

export default router