const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const jwtSecret = 'askldoiU&dhj123*1kjdasmda';

const userController = {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name) return res.status(422).json({ message: 'Name is empty' });
      if (!email) return res.status(422).json({ message: 'Email is empty' });
      if (!password) return res.status(422).json({ message: 'Password is empty' });

      const bcryptSalt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

      const newUser = await User.create({ name, email, password: hashedPassword });
      jwt.sign({ userId: newUser._id, email }, jwtSecret, {}, (err, token) => {
        if (err) return res.status(500).json(err);

        return res.status(201).json({ token: token });
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const userFounded = await User.findOne({ email });
      if (!userFounded) return res.status(422).json({ message: 'User not registered' });

      const isCheckPassword = bcrypt.compareSync(password, userFounded.password);
      if (!isCheckPassword) return res.status(403).json('Wrong password');

      jwt.sign({ userId: userFounded._id, email }, jwtSecret, {}, (err, token) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json({ token: token });
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  async getAllUsers(req, res) {
    try {
      const allUsers = await User.find({}).select('-password');

      return res.status(200).json({ users: allUsers });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
module.exports = userController;