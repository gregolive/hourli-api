import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mongodb/mongoose connection set up
import initializeMongo from './config/mongoConfig.js';
initializeMongo();

// routes
import payPeriodsRouterV1 from './routes/v1/payPeriods.js';
import shiftsRouterV1 from './routes/v1/shifts.js';

app.use('/pay-period', payPeriodsRouterV1);
//app.use('/pay-period/:payPeriodId/shifts', shiftRouterV1);
app.use('/shifts', shiftsRouterV1);

export default app;
