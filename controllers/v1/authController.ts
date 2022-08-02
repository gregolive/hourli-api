import express from 'express';
import passport from 'passport';
import { body, validationResult } from 'express-validator';
import User from '../../models/user';

export const getUser = (req: express.Request, res: express.Response) => {
  res.send(req.user);
};

export const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account',
});

export const googleCallback = [
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: true }),
  (req: express.Request, res: express.Response) => {
    res.redirect(process.env.CLIENT_URL || '');
  }
];

export const githubLogin = passport.authenticate('github');

export const githubCallback = [
  passport.authenticate('github', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: true }),
  (req: express.Request, res: express.Response) => {
    res.redirect(process.env.CLIENT_URL || '');
  }
];

export const twitterLogin = passport.authenticate('twitter');

export const twitterCallback = [
  passport.authenticate('twitterCallback', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: true }),
  (req: express.Request, res: express.Response) => {
    res.redirect(process.env.CLIENT_URL || '');
  }
];