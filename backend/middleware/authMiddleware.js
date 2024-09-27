const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  console.log("Hi")
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you're using the correct secret
    const user = await User.findById(decoded.id || decoded.userId); // `decoded.id` should match the `userId` stored in the JWT

    if (!user) {
      console.log("Confrimed")
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Attach the user to `req.user`
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error('Invalid token:', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticateUser };
