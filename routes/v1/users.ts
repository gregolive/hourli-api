import express from 'express';
import upload from '../../config/multerConfig';
import * as usersController from '../../controllers/v1/usersController';

const usersRouterV1 = express.Router();
usersRouterV1.post('/:id/updatePayPeriod', upload.none(), usersController.updatePayPeriod);
usersRouterV1.post('/:id/update', upload.none(), usersController.update);

export default usersRouterV1;