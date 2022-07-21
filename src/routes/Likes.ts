import { Router } from 'express';
import likes from "../controllers/Likes/Likes"
import middleware from "../middleware/authMiddleware"

const router = Router();


router.route('/').post(middleware.verifyToken,likes.likePost)
router.route('/').delete(middleware.verifyToken,likes.unLikePost)

router.route('/:id').get(likes.getAPostLikes)

export default router;