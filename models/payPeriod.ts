import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PayPeriodSchema = new Schema(
  {
    startDate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      required: true,
    },
    /*user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },*/
  }, {
    timestamps: true,
  }
);

PayPeriodSchema.virtual('url').get(function() {
  return '/pay-period/' + this._id;
});

export default mongoose.model('PayPeriod', PayPeriodSchema);
