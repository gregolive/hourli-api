import express from 'express';
import upload from '../../config/multerConfig';
import * as authController from '../../controllers/v1/authController';

const authRouterV1 = express.Router();
authRouterV1.get('/google', authController.googleLogin);
authRouterV1.get('/google/callback', authController.googleCallback);

export default authRouterV1;