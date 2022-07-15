import { Router } from 'express';
import post from "../controllers/Post/Post"

const router = Router();

router.route('/').get(post.fetchAllPosts).post(post.createPost)
router.route('/:id').get(post.getAPost).patch(post.updatePost)
router.route('all-published').get(post.fetchAllPublishedPosts)
router.route('').get(post.fetchAllunPublishedPosts)
router.route('change-image/:id').post(post.changeImage)
router.route('publish').patch(post.publishOrUnpublishPost)
router.route('post-paginate').get(post.fetchAllPostPaginated)
router.route('user-posts').get(post.getUserSpecificPost)

export default router;