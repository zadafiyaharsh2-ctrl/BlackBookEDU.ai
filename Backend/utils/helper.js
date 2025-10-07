const jwt = require('jsonwebtoken');

function getToken(email , user){
    return jwt.sign(
        {
            id: user._id,
            email: email
        },
        process.env.TOKEN,
        { expiresIn : "7d" }
    );
};

const verifyToken = (req, res, next) => {
  let token;

  // Try Authorization header first
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Try cookie fallback
  if (!token && req.cookies?.token) {
    token = req.cookies.token;1
  }

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};



module.exports = { verifyToken,  getToken };