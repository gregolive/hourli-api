import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../../models/user';

export const updatePayPeriod = [
  // Validate and sanitize
  body('payPeriodStart').escape().isISO8601().toDate().withMessage('Please enter a valid date'),
  body('payPeriodType').escape(),

  // Process request
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req).mapped();
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      const payPeriod = {
        payPeriodStart: req.body.payPeriodStart,
        payPeriodType: req.body.payPeriodType,
      };
      User.findByIdAndUpdate(req.params.id, { $set: payPeriod }, { new: true }, (error, updated_user) => {
        if (error) return next(error);
        res.status(200).json({ updated_user });
      });
    }
  }
];

export const update = [
  // Validate and sanitize
  body('email').trim().escape().normalizeEmail({ gmail_remove_dots: false }).isEmail().withMessage('Please enter a valid email')
    .custom(async (email) => {
      return User.findOne({ email }).then((user) => {
        if (user) return Promise.reject('Email already in use');
      });
    }),
  body('password').trim().escape().matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,}')
    .withMessage('Entered password must be at least 6 characters long and contain an uppercase letter, number, and special character'),
  body('payPeriodStart').escape(),
  body('payPeriodType').escape(),
  
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
          emailVerified: req.body.emailVerified,
          provider: req.body.provider,
          providerId: req.body.providerId,
          password: hashedPassword,
          payPeriodStart: req.body.payPeriodStart,
          payPeriodType: req.body.payPeriodType,
          _id: req.body._id,
        });

        User.findByIdAndUpdate(req.body._id, user, { new: true }, (error, updated_user) => {
          if (error) return next(error);
          res.status(200).json({ updated_user });
        });
      });
    }
  }
];

export const detail = async (req: express.Request, res: express.Response, next: express.NextFunction)  => {
  
};
