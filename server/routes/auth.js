const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { Op } = require('sequelize');

// Registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({  where: {
      [Op.or]: [{ username }, { email }],
    }, });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login request payload:', req.body);
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    console.log('Found user:', user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('User:', user.username);
    console.log('Stored hashed password:', password);
    console.log('Stored hashed password:', user.password);
    console.log('Password match:', passwordMatch);
    if (!passwordMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    //return user;
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;