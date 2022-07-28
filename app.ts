import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';

const app = express();

// middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '',
    resave: true,
    saveUninitialized: true,
  })
);

// mongodb/mongoose connection set up
import initializeMongo from './config/mongoConfig';
initializeMongo();

// routes
import payPeriodsRouterV1 from './routes/v1/payPeriods';
import shiftsRouterV1 from './routes/v1/shifts';

app.use('/pay-period', payPeriodsRouterV1);
//app.use('/pay-period/:payPeriodId/shifts', shiftRouterV1);
app.use('/shifts', shiftsRouterV1);

export default app;
