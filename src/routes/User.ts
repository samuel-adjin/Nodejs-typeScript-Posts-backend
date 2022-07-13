import { Router } from 'express';
import user from "../controllers/User/User"

const router = Router();

router.route('/').get(user.fetchAllNormalUsers);
router.route('/testing').get(user.deleteManyUsers);



export default router