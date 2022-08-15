import express from 'express';
import { body, validationResult } from 'express-validator';
import Shift from '../../models/shift';

export const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const shifts = await Shift.find({ 'user': req.user }).sort({ created_at: -1 })
    .catch((err) => next(err));

  res.status(200).json({ shifts });
}

export const create = [
  // Validate and sanitize
  body('start', 'Start time is empty').trim().isLength({ min: 1 }).escape(),
  body('length', 'Shift length is empty').trim().isLength({ min: 1 }).escape(),
  body('breaks', 'Break time is empty').trim().isLength({ min: 1 }).escape(),

  // Process request
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      const shift = new Shift({ 
        start: req.body.start,
        length: req.body.length,
        breaks: req.body.breaks,
        payPeriod: req.params.payPeriodID,
        user: req.user,
      });

      shift.save((err) => {
        if (err) return next(err);
        // Shift.findOne({ _id: shift._id }).populate('payPeriod', 'startDate endDate').exec((error, populated_shift) => {
        //   res.status(200).json({ shift: populated_shift });
        // });
        res.status(200).json({ shift });
      });
    }
  }
];
