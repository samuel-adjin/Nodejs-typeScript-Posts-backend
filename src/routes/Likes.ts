import { Router } from 'express';
import likes from "../controllers/Likes/Likes"

const router = Router();


router.route('/').post(likes.likeOrUnlikePost)
router.route('/:id').get(likes.getAPostComments)

export default router;