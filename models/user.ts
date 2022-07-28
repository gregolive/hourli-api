import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
  }, {
    timestamps: true,
  }
);

UserSchema.virtual('url').get(function() {
  return '/user/' + this._id;
});

export default mongoose.model('User', UserSchema);
