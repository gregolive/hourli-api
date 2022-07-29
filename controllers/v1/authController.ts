import express from 'express';
import passport from 'passport';
import { body, validationResult } from 'express-validator';
import User from '../../models/user';

export const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account',
});

export const googleCallback = [
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: express.Request, res: express.Response) => {
    res.redirect(process.env.CLIENT_URL || '');
  }
];
