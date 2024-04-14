import { Router } from 'express';
import profileController from '../controllers/profile.controller';
import AuthGuard from '../guards/auth.guard';
import uploadFile from '../middlewares/fileUpload.middleware';

const router: Router = Router();
const upload: any = uploadFile('profile');

router.get('/me', AuthGuard, profileController.getProfile);
router.patch('/update', AuthGuard, upload, profileController.updateProfile);
router.patch('/update-password', AuthGuard, profileController.updatePassword);
router.delete('/delete', AuthGuard, profileController.deleteProfile);

export default router;