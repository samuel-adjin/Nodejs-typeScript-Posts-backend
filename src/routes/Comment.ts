import { Router } from 'express';
import comment from "../controllers/Comment/Comment"

const router = Router();


router.route('/').post(comment.addComment);
router.route('/:id').delete(comment.deleteComment);
router.route('/:id').get(comment.getAPostComments);