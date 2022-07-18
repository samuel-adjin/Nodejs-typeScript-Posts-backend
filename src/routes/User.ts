import { Router } from 'express';
import user from "../controllers/User/User"
import validation from "../validators/UserRequestValidation"
// import UserUpdateRules from "../validators/UserUpdateRequestRules"


const router = Router();

router.route('/').get(user.fetchAllNormalUsers);
router.route('/all-users-paginate').get(user.fetchAllUsersPaginated);
router.route('/not-users').get(user.fetchAllNotUser);
router.route('/all-users').get(user.fetchAllUsers);

router.route('/update-record').put(user.updateUserRecord);
router.route('/delete-many-users').delete(user.deleteManyUsers)
router.route('/search-users').get(user.searchUserByEmailOrUsername)
router.route('/update-description').patch(user.UpdateUserDescription)
router.route('/update-profile-pic').post(user.updateProfileImage)
router.route('/delete-profile-pic').delete(user.deleteManyUsers)
router.route('/editor-users-paginate').get(user.fetchAllEditorsPaginated)
router.route('/all-normal-users-paginate').get(user.fetchAllNormalUsersPaginated)
// router.route('/all-paginate').get(user.fetchAllUsersPaginated)
router.route('/user/:id').get(user.findUser);
router.route('/user-role/:id').post(user.addRole);
router.route('/delete-user/:id').delete(user.deleteUser)
router.route('/account-status/:id').patch(user.lockUserAccountStatus)
router.route('/delete-all').delete(user.deleteManyUsers);





export default router