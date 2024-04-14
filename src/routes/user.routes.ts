import { Router } from 'express';
import userController from '../controllers/user.controller';
import AuthGuard from '../guards/auth.guard';

const router: Router = Router();

router.get('/', AuthGuard, userController.getAllUsers);
router.get('/:id', AuthGuard, userController.getOneUser);
router.get('/image/:imageID', userController.getUserImage);

export default router;