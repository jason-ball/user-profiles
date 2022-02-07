import { Router } from 'express';
import passport from 'passport';

const router = Router();

const clientURL = process.env.CLIENT_URL ?? 'http://localhost:3000';

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: `${clientURL}/`,
  }),
);

router.get('/signout', (req, res) => {
  req.logOut();
  res.redirect(`${clientURL}/`);
});

export default router;
