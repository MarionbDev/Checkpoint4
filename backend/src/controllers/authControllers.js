require("dotenv").config();
const jwt = require("jsonwebtoken");
const models = require("../models");

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

const refreshToken = (req, res, next) => {
  const token = req.cookies.jwtToken;

  // Vérifier si un token JWT existe
  if (!token) {
    // console.log("Aucun token JWT trouvé.");
    return res.sendStatus(401);
  }

  // Trouver l'utilisateur associé au token
  models.user
    .find(req.body.id)
    .then(([rows]) => {
      // console.log("Résultat de la recherche de l'utilisateur :", rows);

      // Si aucun utilisateur n'est trouvé, renvoyer une réponse 401
      if (rows[0] == null) {
        // console.log("Utilisateur introuvable.");
        return res.sendStatus(401);
      }

      // Si un utilisateur est trouvé, mettre à jour req.body avec les informations de l'utilisateur
      const user = rows[0];
      req.body = user;
      next();
      return null; // Ajout du return pour éviter l'erreur
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });

  return null;
};

module.exports = { createToken, verifyToken, isAdmin, refreshToken };
