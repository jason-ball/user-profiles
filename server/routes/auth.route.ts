import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import User from '../models/User';

const router = Router();

const clientURL = process.env.CLIENT_URL ?? 'http://localhost:3000'

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: `${clientURL}/`
  }));

export default router;