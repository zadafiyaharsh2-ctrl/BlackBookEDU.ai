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


const createAccessToken  = payload =>

  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { 
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN 
  });

  const createRefreshToken = payload =>
  jwt.sign(
    payload, 
    process.env.REFRESH_TOKEN_SECRET, { 
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN 
    });

  

      const isAdmin = (req, res, next) => {
        if (!req.user || req.user.role !== "admin") {
          return res.status(403).json({ message: "Forbidden" });
        }
        next();
      };

      const validateBody = (req, res, next) => {
        const b = req.body;

        if (
          !b.name || !b.description || !b.quantity_Unit || !b.image || !b.category ||
          !b.stock || typeof b.stock !== "object" ||
          !["packet", "weight"].includes(b.stock.type) ||
          typeof b.stock.value !== "number" ||
          !b.stock.unit ||
          !b.selling_Price || typeof b.selling_Price !== "object" ||
          typeof b.selling_Price.price !== "number" || !b.selling_Price.unit ||
          !b.buying_Price || typeof b.buying_Price !== "object" ||
          typeof b.buying_Price.price !== "number" || !b.buying_Price.unit
        ) {
          return res.status(400).json({ message: "Invalid or missing product data" });
        }

        next();
      };




  module.exports = { createAccessToken, createRefreshToken , getToken , verifyToken , isAdmin , validateBody };