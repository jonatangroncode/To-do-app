const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

//mostlley for testing or if in the future im building a profile page thet show secret information
router.get('/profile', authenticateToken, (req, res) => {
    const userId = req.user.id; 
    const username = req.user.username; 
  
    res.json({
      message: `Welcome, ${username}. Here is your data.`,
      userId: userId,
      secretData: {
        todoList: `This is a secret list for user with ID: ${userId}.`
      }
    });
  });

module.exports = router;
