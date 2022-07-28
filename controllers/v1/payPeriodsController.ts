import express from 'express';
import { body, validationResult } from 'express-validator';
import PayPeriod from '../../models/payPeriod';

export const create = [
  // Validate and sanitize
  body('startDate', 'Start date is empty').trim().isLength({ min: 1 }).escape(),
  body('endDate', 'End data is empty').trim().isLength({ min: 1 }).escape(),

  // Process request
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      const payPeriod = new PayPeriod({ 
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        //user: res.locals.user._id,
      });

      payPeriod.save((err) => {
        if (err) return next(err);
        res.status(200).json({ payPeriod });
      });
    }
  }
];
