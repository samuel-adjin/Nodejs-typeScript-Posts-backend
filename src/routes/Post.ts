import { Router } from 'express';
import post from "../controllers/Post/Post"
import postRules from "../validators/PostRequestRules"
import PostImageRule from "../validators/PostImageRule"
import PostUpdateRule from "../validators/PostUpdateRules"





const router = Router();

router.route('/').get(post.fetchAllPosts).post(postRules.PostRequestRules,post.createPost)
router.route('/:id').get(post.getAPost).patch(PostUpdateRule.postUpdateRules,post.updatePost)
router.route('all-published').get(post.fetchAllPublishedPosts)
router.route('').get(post.fetchAllunPublishedPosts)
router.route('change-image/:id').post(PostImageRule.postUpdateImageRules,post.changeImage)
router.route('publish').patch(post.publishOrUnpublishPost)
router.route('post-paginate').get(post.fetchAllPostPaginated)
router.route('user-posts').get(post.getUserSpecificPost)

export default router;