const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');
const Joi = require('joi');

// Validation middleware 
const validateUser = (req, res, next) => {
  
  next();
};

// Creating User route {POST}
router.post('/', authMiddleware, validateUser, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    return res.status(201).json({ userId: user.id });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get All Users route
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get User by ID route
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update User by ID route {PUT}
router.put('/:userId', authMiddleware, validateUser, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user by ID:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete User by ID route
router.delete('/:userId', authMiddleware, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
