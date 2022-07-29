import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { Error } from 'mongoose';
import User from '../models/user';
import { MongodbUser, PassportUser } from '../types';

const initialize = () => {
  passport.serializeUser((user: PassportUser, done): void => done(null, user.id));

  passport.deserializeUser((id, done): void => {
    User.findById(id, (err: Error, user: MongodbUser) => done(err, user));
  });

  passport.use(
    new GoogleStrategy.Strategy({
      clientID: process.env.GOOGLE_APP_ID || '',
      clientSecret: process.env.GOOGLE_APP_SECRET || '',
      callbackURL: 'http://localhost:3001/api/v1/auth/google/callback',
    }, (_accessToken, _refreshToken, profile, done) => {
      /*
      User.findOne({ 'provider_id' : profile.id }, (err: Error, user: MongodbUser) => {
        if (err) return done(err);

        // Google account has not logged in before
        if (!user) {
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails && profile.emails[0].value,
            email_verified : true,
            provider : 'google',
            providerId : profile.id,    
          });
          newUser.save((error) => {
            if (error) { return done(error); }
            return done(null, newUser);
          });
        }
  
        // Google account has previously logged in
        return done(null, user);
      });*/
      console.log(profile)
      return done(null, profile);
    })
  );
};

export default initialize;
