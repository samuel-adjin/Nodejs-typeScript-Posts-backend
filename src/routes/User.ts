import { Router } from 'express';
import user from "../controllers/User/User"
import validation from "../validators/UserRequestValidation"
// import UserUpdateRules from "../validators/UserUpdateRequestRules"
import middleware from "../middleware/authMiddleware"
import multer from '../utils/multer';



const router = Router();
router.route('/multer').get(multer.upload.single('image'),user.multerTest);
router.route('/').get(user.fetchAllNormalUsers);
router.route('/all-users-paginate').get(middleware.verifyToken, user.fetchAllUsersPaginated);
router.route('/not-users').get(middleware.verifyToken, user.fetchAllNotUser);
router.route('/all-users').get(middleware.verifyToken, user.fetchAllUsers);

router.route('/update-record').put(middleware.verifyToken, user.updateUserRecord);
router.route('/delete-many-users').delete(middleware.verifyToken, user.deleteManyUsers)
router.route('/search-users').get(middleware.verifyToken, user.searchUserByEmailOrUsername)
router.route('/update-description').patch(middleware.verifyToken, user.UpdateUserDescription)
router.route('/update-profile-pic').post(middleware.verifyToken, multer.upload.single('image'),user.updateProfileImage)
router.route('/delete-profile-pic').delete(middleware.verifyToken, user.deleteManyUsers)
router.route('/editor-users-paginate').get(middleware.verifyToken, user.fetchAllEditorsPaginated)
router.route('/all-normal-users-paginate').get(middleware.verifyToken, user.fetchAllNormalUsersPaginated)
router.route('/user-role/:id').patch(middleware.verifyToken, user.addRole);
router.route('/:id').get(middleware.verifyToken, user.findUser);
router.route('/delete-user/:id').delete(middleware.verifyToken, user.deleteUser)
router.route('/account-status/:id').patch(middleware.verifyToken, user.lockUserAccountStatus)
router.route('/delete-all').delete(middleware.verifyToken, user.deleteManyUsers);








export default router