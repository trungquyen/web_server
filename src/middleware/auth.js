import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function checkToken(req, res, next) {
  if (req?.url.toLowerCase().trim() == "/users/login".toLowerCase().trim()) {
    next();
  }

  const token =
    req?.headers?.authorization && req?.headers?.authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json("Token is valid");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log("Token is failed");
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  checkToken(req, res, () => {
    if (req.url.replace("/", "") === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  checkToken(req, res, () => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

export { verifyTokenAndAuthorization, checkToken, verifyTokenAndAdmin };
