const jwt = require('jsonwebtoken');

// Bearer token auth compatible with routes/auth.js
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token.' });
  }
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.TOKEN);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid/expired token.' });
  }
}

// Role guard; use roles like "student", "teacher", "hod", "dean", "webappAdmin"
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

module.exports = { authenticate, requireRole };