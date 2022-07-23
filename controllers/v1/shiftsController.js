import { body, validationResult } from 'express-validator';
import Shift from '../../models/shift.js';

export const create = [
  // Validate and sanitize
  body('start', 'Start time is empty').trim().isLength({ min: 1 }).escape(),
  body('length', 'Shift length is empty').trim().isLength({ min: 1 }).escape(),
  body('breaks', 'Break time is empty').trim().isLength({ min: 1 }).escape(),

  // Process request
  async (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      const shift = new Shift({ 
        start: req.body.start,
        length: req.body.length,
        breaks: req.body.breaks,
        payPeriod: req.params.payPeriodID,
        //user: res.locals.user._id,
      });

      shift.save((err) => {
        if (err) return next(err);
        Shift.findOne(shift).populate('payPeriod', 'startDate endDate').exec((error, populated_shift) => {
          res.status(200).json({ shift: populated_shift });
        });
      });
    }
  }
];