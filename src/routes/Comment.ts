import { Router } from 'express';
import comment from "../controllers/Comment/Comment"
import commentRules from "../validators/CommentRequestRules"


const router = Router();


router.route('/').post(commentRules.CommentRequestRules,comment.addComment);
router.route('/:id').delete(comment.deleteComment);
router.route('/:id').get(comment.getAPostComments);

export default router