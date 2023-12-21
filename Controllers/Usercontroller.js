const UserData = require('../Models/Usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if password and confirm password match
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ error: 'Password and confirm password do not match' });
    // }

    // Create a new user
    const newUser = new UserData({ firstName, lastName, email, password });

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
