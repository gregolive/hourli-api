import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mongodb/mongoose connection set up
import initializeMongo from './config/mongoConfig.js';
initializeMongo(mongoose);

// routes
import shiftRouterV1 from './routes/v1/shifts.js';
app.use('/pay-period/:payPeriodId/shifts', shiftRouterV1);

export default app;
