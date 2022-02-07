import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import isLoggedIn from '../middleware/isLoggedIn';
import User, { UserModel } from '../models/User';

const router = Router();

router.post(
  // Route
  '/register',
  // Validators
  body('name').isString(),
  body('bio').isString(),
  // Response
  async (req, res) => {
    // Handle validation error(s)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create the new user
    const newUser = new User({
      name: req.body.name,
      bio: req.body.bio,
    });

    // Try to save the new user
    try {
      await newUser.save();
      return res.status(200).json(newUser);
    } catch (e) {
      return res.status(500).json({ errors: [e] });
    }
  },
);

router.get('/profile', isLoggedIn, (req, res) => {
  res.json(req.user);
})

router.get('/all', async (req, res) => {
  const users = await User.find({ publicProfile: true }, 'name bio imageURL publicProfile');
  return res.json(users);
})

router.post('/update', isLoggedIn, async (req, res) => {
  console.log(req.body)
  const user = <UserModel> req.user;
  const result = await User.updateOne({ githubID: user.githubID }, {
    name: req.body.name,
    bio: req.body.bio,
    publicProfile: req.body.publicProfile
  });
  res.send(result.acknowledged);
})

export default router;
