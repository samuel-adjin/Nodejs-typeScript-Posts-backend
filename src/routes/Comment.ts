import { Router } from 'express';
import comment from "../controllers/Comment/Comment"

import middleware from "../middleware/authMiddleware"
import validaton from "../validators/UserRequestValidation"
import commentValidator from '../validators/commentSchema';

const router = Router();



router.route('/:id').post(middleware.verifyToken,commentValidator,validaton,comment.addComment);
router.route('/:id/:postId').delete(middleware.verifyToken,comment.deleteComment);
router.route('/:id').get(middleware.verifyToken,comment.getAPostComments);

export default router