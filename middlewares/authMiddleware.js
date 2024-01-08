// middlewares/authMiddleware.js

const authMiddleware = (req, res, next) => {
  console.log(req.headers)
    const auth = req.headers.auth;
    console.log('Received Auth Header:', auth);
  
    // Check if Auth header matches the configured value
    if (auth !== 'SecretKey') {
      console.log('Unauthorized Access');
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    console.log('Authorized Access');
    next();
  };
  
  module.exports = authMiddleware;
  