import passport from 'passport';
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
import GitHubStrategy from 'passport-github2';
import TwitterStrategy from 'passport-twitter';
import bcrypt from 'bcryptjs';
import { Error } from 'mongoose';
import User from '../models/user';
import { MongodbUser, PassportUser } from '../types';

const initialize = () => {
  passport.serializeUser((user: PassportUser, done): void => done(null, user.id));

  passport.deserializeUser((id, done): void => {
    User.findById(id, (err: Error, user: MongodbUser) => done(err, user));
  });

  passport.use(
    new LocalStrategy.Strategy({
      usernameField: 'email',
    }, (email, password, done) => {
      User.findOne({ email: email }, (err: Error, user: MongodbUser) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Email not found' });

        bcrypt.compare(password, user.password, (err: Error, res: boolean) => {
          if (res) {
            return done(null, user); // passwords match, log user in
          } else {
            return done(null, false, { message: 'Incorrect password' });
          }
        });
      });
    })
  );

  passport.use(
    new GoogleStrategy.Strategy({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/api/v1/auth/google/callback',
    }, (_accessToken, _refreshToken, profile, done) => {
      User.findOne({ 'providerId' : profile.id }, (err: Error, user: MongodbUser) => {
        if (err) return done(err);

        if (!user) {
          // Google account has not logged in before
          const newUser = new User({
            email: profile._json.email,
            emailVerified : profile._json.email_verified,
            provider : 'google',
            providerId : profile.id,
          });
          newUser.save((error) => {
            if (error) return done(error);
            return done(null, newUser);
          });
        } else {
          // Google account has previously logged in
          done(null, user);
        }
      });
    })
  );

  passport.use(
    new GitHubStrategy.Strategy({
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: '/api/v1/auth/github/callback',
    }, (_accessToken: string, _refreshToken: string, profile: any, done: Function) => {
      User.findOne({ 'providerId' : profile.id }, (err: Error, user: MongodbUser) => {
        if (err) return done(err);

        if (!user) {
          // Github account has not logged in before
          const newUser = new User({
            email: profile._json.email || '',
            emailVerified : Boolean(profile._json.email),
            provider : 'github',
            providerId : profile.id,
          });
          newUser.save((error) => {
            if (error) return done(error);
            return done(null, newUser);
          });
        } else {
          // Github account has previously logged in
          return done(null, user);
        }
      });
    })
  );

  
  // passport.use(
  //   new TwitterStrategy.Strategy({
  //     consumerKey: process.env.TWITTER_CLIENT_ID || '',
  //     consumerSecret: process.env.TWITTER_CLIENT_SECRET || '',
  //     callbackURL: '/api/v1/auth/twitter/callback',
  //   }, (_accessToken, _refreshToken, profile, done) => {
  //     /*
  //     User.findOrCreate({ twitterId: profile.id }, function (err, user) {
  //       return cb(err, user);
  //     });
  //     */
  //     console.log(profile);
  //     return done(null, profile);
  //   })
  // );
};

export default initialize;
