import express from 'express';
import upload from '../../config/multerConfig';
import * as shiftsController from '../../controllers/v1/shiftsController';

const shiftsRouterV1 = express.Router();
shiftsRouterV1.get('/index', upload.none(), shiftsController.index);
shiftsRouterV1.post('/create', upload.none(), shiftsController.create);

export default shiftsRouterV1;