const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //extract jwt token from the req header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    // verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //attach user information to the req object
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

//function to generate jwt token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = {jwtAuthMiddleware, generateToken};
