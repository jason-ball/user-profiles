/* eslint-disable no-underscore-dangle */
import passport from 'passport';
import { Strategy } from 'passport-github2';
import User from '../models/User';

passport.use(new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID ?? '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    callbackURL: '/auth/github/callback',
  },
  (async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    const currentUser = await User.findOne({
      githubID: profile._json.id,
    });

    if (!currentUser) {
      const newUser = await new User({
        name: profile._json.name,
        bio: profile._json.bio,
        githubID: profile._json.id,
        imageURL: profile._json.avatar_url,
      }).save();
      if (newUser) {
        return done(null, newUser);
      }
    }
    return done(null, currentUser);
  }),
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch(() => {
      done(new Error('Failed to deserialize an user'));
    });
});
