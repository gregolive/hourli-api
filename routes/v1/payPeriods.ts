import express from 'express';
import upload from '../../config/multerConfig';
import * as payPeriodsController from '../../controllers/v1/payPeriodsController';

const payPeriodsRouterV1 = express.Router();
payPeriodsRouterV1.post('/create', upload.none(), payPeriodsController.create);

export default payPeriodsRouterV1;