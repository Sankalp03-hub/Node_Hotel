const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
//first check req header has authrization or not
const authorization=req.headers.authorization;
if(!authorization) return res.status(401).json({error:'Token not found'});


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
  return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn:6000});
};

module.exports = {jwtAuthMiddleware, generateToken};
