import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ShiftSchema = new Schema(
  {
    start: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    breaks: {
      type: Number,
      required: true,
    },
    payPeriod: {
      type: Schema.Types.ObjectId,
      ref: 'PayPeriod',
      //required: true,
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

export default mongoose.model('Shift', ShiftSchema);
