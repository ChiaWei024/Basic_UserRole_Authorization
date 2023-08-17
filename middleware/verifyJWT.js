// JWT
const jwt = require("jsonwebtoken");
// env
require("dotenv").config();

//
const verifyJWT = (req, res, next) => {
  // the authorization header might come in as lowercase or uppercase "a"
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(authHeader);
  // if dont have a auth header or with auth header but not start with "Bearer "
  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  // authHeader: expect to see: bearer token
  console.log(authHeader);

  // verify token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // invalid token
      return res.sendStatus(403);
    }
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

//
module.exports = verifyJWT;
