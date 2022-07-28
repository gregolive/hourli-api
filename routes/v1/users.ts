import express from 'express';
import upload from '../../config/multerConfig';
import * as usersController from '../../controllers/v1/usersController';

const usersRouterV1 = express.Router();

export default usersRouterV1;