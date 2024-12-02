const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 
  if (!token) return res.status(401).json({ message: 'Access denied: you need a authorization token' });

  try {
    const decoded = jwt.verify(token, 'secretkey'); 
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateToken;
