import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import initializeMongo from './config/mongoConfig';
import initializePassport from './config/passportConfig';
import authRouterV1 from './routes/v1/auth';
import usersRouterV1 from './routes/v1/users';
import shiftsRouterV1 from './routes/v1/shifts';

const app = express();

// middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || '',
    resave: true,
    saveUninitialized: true,
  })
);

// mongodb/mongoose connection set up
initializeMongo();

// passport setup
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/api/v1/auth', authRouterV1);
app.use('/api/v1/users', usersRouterV1);
app.use('/api/v1/shifts', shiftsRouterV1);

export default app;
