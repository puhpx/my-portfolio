const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: 'User already exists' });

  const newUser = new User({ email, password });

  newUser
    .save()
    .then((user) => {
      jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user._id,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'User does not exist' });

  const isMatch = await user.comparePassword(password);

  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
});

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
