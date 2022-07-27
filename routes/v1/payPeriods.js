import express from 'express';
import upload from '../../config/multerConfig.js';
import * as payPeriodsController from '../../controllers/v1/payPeriodsController.js';

const payPeriodsRouterV1 = express.Router();
payPeriodsRouterV1.post('/create', upload.none(), payPeriodsController.create);

export default payPeriodsRouterV1;