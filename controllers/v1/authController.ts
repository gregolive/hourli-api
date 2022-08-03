import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import User from '../../models/user';

export const getUser = (req: express.Request, res: express.Response) => {
  res.send(req.user);
};

export const logout = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    res.sendStatus(200);
  });
};

export const login = (req: express.Request, res: express.Response) => {
  passport.authenticate('local', { session: true }, (err, user, msg) => {
    if (err || !user) return res.status(400).json({ msg });

    req.login(user, (error) => {
      if (error) res.status(400).json({ error });
      res.sendStatus(200);
    });
  })(req, res);
};

export const register = [
  // Validate and sanitize
  body('email').trim().escape().isEmail().withMessage('Please enter a valid email').custom(async (email) => {
    return User.findOne({ email }).then((user) => {
      if (user) return Promise.reject('Email already in use');
    });
  }),
  body('password').trim().escape().matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,}')
    .withMessage('Entered password must be at least 6 characters long and contain an uppercase letter, number, and special character'),
  
  // Process request
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      bcrypt.hash(req.body.password, 16, (err, hashedPassword) => {
        if (err) return next(err);
        const user = new User({
          email: req.body.email,
          password: hashedPassword,
        });

        user.save((error) => {
          if (error) return next(error);
          passport.authenticate('local')(req, res, () => {
            res.sendStatus(200);
          });
        });
      });
    }
  }
];

export const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account',
});

export const googleCallback = [
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: true }),
  (req: express.Request, res: express.Response) => {
    res.redirect(process.env.CLIENT_URL || '/');
  }
];

export const githubLogin = passport.authenticate('github');

export const githubCallback = [
  passport.authenticate('github', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: true }),
  (req: express.Request, res: express.Response) => {
    res.redirect(process.env.CLIENT_URL || '/');
  }
];

export const twitterLogin = passport.authenticate('twitter');

export const twitterCallback = [
  passport.authenticate('twitterCallback', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: true }),
  (req: express.Request, res: express.Response) => {
    res.redirect(process.env.CLIENT_URL || '/');
  }
];