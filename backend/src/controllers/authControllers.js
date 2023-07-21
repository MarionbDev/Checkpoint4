require("dotenv").config();
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRESIN, JWT_SECURE, JWT_COOKIE_MAXAGE } =
  process.env;

const createToken = (req, res) => {
  const { id, role } = req.body;
  // console.log("ID:", id);
  // console.log("Role:", role);

  jwt.sign(
    { id, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRESIN },
    (err, token) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res
          .cookie("jwtToken", token, {
            httpOnly: true,
            secure: JWT_SECURE === "true",
            maxAge: parseInt(JWT_COOKIE_MAXAGE, 10),
          })
          .json(req.body);
      }
    }
  );
};

// Middleware - Assure que le token est là et qu'il est bon
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken;
  // console.log("Token:", token);
  if (!token) {
    res.status(401).send("You're not login");
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        req.body = { ...req.body, ...decoded };
        next();
      }
    });
  }
};

// Vérifie le role de l'user pour aller plus loins sur la route ou non
const isAdmin = (req, res, next) => {
  if (req.body.role === "admin") {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = { createToken, verifyToken, isAdmin };
