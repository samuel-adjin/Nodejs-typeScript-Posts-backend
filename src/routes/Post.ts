import { Router } from 'express';
import post from "../controllers/Post/Post"
// import postRules from "../validators/PostRequestRules"
// import PostImageRule from "../validators/PostImageRule"
// import PostUpdateRule from "../validators/PostUpdateRules"
// import validation from "../validators/UserRequestValidation"
import middleware from "../middleware/authMiddleware"
import multer from '../utils/multer';





const router = Router();

router.route('/').get(post.fetchAllPosts).post(middleware.verifyToken,multer.upload.single('image'),post.createPost)
router.route('/all-published').get(middleware.verifyToken,post.fetchAllPublishedPosts)
router.route('/all-unpublished').get(middleware.verifyToken,post.fetchAllunPublishedPosts)
router.route('/publish-unpublish/:id').patch(middleware.verifyToken,post.publishOrUnpublishPost)
router.route('/post-paginate').get(post.fetchAllPostPaginated)
router.route('/user-posts').get(middleware.verifyToken,post.getUserSpecificPost)
router.route('/:id').get(middleware.verifyToken,post.getAPost).patch(middleware.verifyToken,post.updatePost)
router.route('/change-image/:id').post(middleware.verifyToken,multer.upload.single('image'),post.changeImage)



export default router;