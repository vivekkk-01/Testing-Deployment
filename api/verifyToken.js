const HttpError = require("./models/http-error");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new HttpError("You're not authorized", 500);
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        const error = new HttpError("Token is invalid", 500);
        return next(error);
      }
      req.user = user;
      return next();
    });
  } else {
    const error = new HttpError("You're not authorized", 500);
    return next(error);
  }
};

module.exports = verifyToken;
