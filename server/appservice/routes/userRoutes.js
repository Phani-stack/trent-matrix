import express from 'express';
import { getProfile, updateProfile, searchUsers, getPublicProfile } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })

const userRouter = express.Router();

userRouter.get('/profile', isAuthenticated, getProfile);
userRouter.get('/public/:id', getPublicProfile);
userRouter.get('/search', isAuthenticated, searchUsers);
userRouter.put('/profile', isAuthenticated, upload.single('image'), updateProfile);

export default userRouter;
