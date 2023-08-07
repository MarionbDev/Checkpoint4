const argon2 = require("@node-rs/argon2");
const models = require("../models");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(req.method === "POST" ? 201 : 200).send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res, next) => {
  const user = req.body;

  if (!user.role) {
    user.role = "user";
  }

  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      req.params.id = result.insertId;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const hashPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.sendStatus(400);
  } else {
    argon2
      .hash(password, hashingOptions)
      .then((hashedPassword) => {
        // Prendre le mot de passe dans le body, de le hâcher et de le rattacher à la requête du body (nouveau champ)
        req.body.hashedPassword = hashedPassword;
        // Effacer le champ password
        delete req.body.password;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const login = (req, res, next) => {
  // console.log("Request Body:", req.body);
  const { email, password } = req.body;
  // console.log("Email:", email);
  // console.log("Password:", password);
  // une 1ère sécurité mais pas suffisante (=> ajouter un token)
  models.user
    .findByEmail(email)
    .then(([users]) => {
      if (users.length === 0) {
        res.sendStatus(404);
        // si password est différent argon2 renverra false, permet de renvoyer un 404
      } else if (!argon2.verifySync(users[0].hashedPassword, password)) {
        res.sendStatus(404);
      } else {
        const user = { ...users[0] };
        delete user.hashedPassword;

        req.body = user;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  hashPassword,
  login,
};
