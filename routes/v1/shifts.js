import express from 'express';
import upload from '../../config/multerConfig.js';
import * as shiftsController from '../../controllers/v1/shiftsController.js';

const shiftsRouterV1 = express.Router();
shiftsRouterV1.post('/create', upload.none(), shiftsController.create);

export default shiftsRouterV1;