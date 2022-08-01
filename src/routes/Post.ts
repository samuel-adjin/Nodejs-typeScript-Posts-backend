import { Router } from 'express';
import post from "../controllers/Post/Post"

import validation from "../validators/UserRequestValidation"
import middleware from "../middleware/authMiddleware"
import multer from '../utils/multer';
import postImageValidator from '../validators/postImageSchema';
import postUpdateValidator from '../validators/postUpdateSchema';
import postValidator from "../validators/postImageSchema"






//TODO:  add middleware to check Role on some routes


const router = Router();

router.route('/').get(post.fetchAllPosts).post(middleware.verifyToken, postValidator, validation, multer.upload.single('image'), post.createPost)
router.route('/all-published').get(middleware.verifyToken, post.fetchAllPublishedPosts)
router.route('/all-unpublished').get(middleware.verifyToken, post.fetchAllunPublishedPosts)
router.route('/publish-unpublish/:id').patch(middleware.verifyToken, post.publishOrUnpublishPost)
router.route('/post-paginate').get(post.fetchAllPostPaginated)
router.route('/user-posts').get(middleware.verifyToken, post.getUserSpecificPost)
router.route('/:id').get(middleware.verifyToken, post.getAPost).patch(middleware.verifyToken, postUpdateValidator, validation, post.updatePost)
router.route('/change-image/:id').post(middleware.verifyToken, postImageValidator, validation, multer.upload.single('image'), post.changeImage)




export default router;