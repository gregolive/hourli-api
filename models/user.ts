import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } },
      },
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      default:'email',
    },
    providerId:{
      type: String,
      default: null,
    },
    password: {
      type: String,
      minLength: 6,
    },
    payPeriodStart: {
      type: Date,
    },
    payPeriodType: {
      type: String,
      enum: ['Weekly', 'Biweekly', 'Monthly'],
      default: 'Biweekly',
    },
  }, {
    timestamps: true,
  }
);

UserSchema.virtual('url').get(function() {
  return '/user/' + this._id;
});

export default mongoose.model('User', UserSchema);
