const jwt = require('jsonwebtoken');

const users = [
  { id: 1, username: 'johnDoe', password: 'password1' },
  { id: 2, username: 'johndoes', password: 'password2' }
];

const login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

module.exports = { login };
