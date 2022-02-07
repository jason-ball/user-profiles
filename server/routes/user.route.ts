import { Router } from 'express';
import path from 'path';
import User, { UserModel } from '../models/User';
import isLoggedIn from '../middleware/isLoggedIn';

const router = Router();

router.get('/profile', isLoggedIn, (req, res) => {
  res.json(req.user);
});

router.get('/all', async (req, res) => {
  const users = await User.find({ publicProfile: true }, 'name bio imageURL publicProfile');
  return res.json(users);
});

router.post('/update', isLoggedIn, async (req, res) => {
  const user = <UserModel>req.user;
  const result = await User.updateOne({ githubID: user.githubID }, {
    name: req.body.name,
    bio: req.body.bio,
    publicProfile: req.body.publicProfile,
  });
  res.send(result.acknowledged);
});

// eslint-disable-next-line consistent-return
router.put('/photo', isLoggedIn, async (req, res) => {
  const user = <UserModel>req.user;
  if (!req.files || !req.files.photo || Array.isArray(req.files.photo)) {
    return res.status(400).json({ errors: ['no files present'] });
  }
  const file = req.files.photo;

  const filename = `${user.githubID}.${file.name.split('.')[1]}`;
  file.mv(path.join(__dirname, '..', 'static', filename), async (err) => {
    if (err) return res.status(500).send(err);

    const result = await User.updateOne({ githubID: user.githubID }, {
      imageURL: `${process.env.SERVER_URL}/static/${filename}`,
    });
    return res.send(result.acknowledged);
  });
});

export default router;
