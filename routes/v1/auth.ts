import express from 'express';
import upload from '../../config/multerConfig.js';
import * as authController from '../../controllers/v1/authController';

const authRouterV1 = express.Router();
authRouterV1.get('/user', authController.getUser);
authRouterV1.post('/logout', authController.logout);
authRouterV1.post('/login', upload.none(), authController.login);
authRouterV1.post('/register', upload.none(), authController.register);
authRouterV1.get('/google', authController.googleLogin);
authRouterV1.get('/google/callback', authController.googleCallback);
authRouterV1.get('/github', authController.githubLogin);
authRouterV1.get('/github/callback', authController.githubCallback);
authRouterV1.get('/twitter', authController.twitterLogin);
authRouterV1.get('/twitter/callback', authController.twitterCallback);

export default authRouterV1;