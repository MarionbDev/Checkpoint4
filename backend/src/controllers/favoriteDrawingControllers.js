const models = require("../models");

const browse = (req, res) => {
  models.favoriteDrawing
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
  models.favoriteDrawing
    .find(req.params.id, req.params.drawingId)
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

// Voir pour récup tous les favorites :
const findAllFavoritesByUser = (req, res) => {
  const userId = req.params.id;
  // console.log("User ID:", userId);

  models.favoriteDrawing
    .findAllFavorites(userId)
    .then(([rows]) => {
      // console.log("Rows:", rows);
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(req.method === "POST" ? 201 : 200).send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const favoriteDrawing = req.body;
  // console.log(req.body);

  // TODO validations (length, format...)

  favoriteDrawing.id = parseInt(req.params.id, 10);

  models.favoriteDrawing
    .update(favoriteDrawing)
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

const add = (req, res) => {
  const favoriteDrawing = req.body;
  // console.log(req.body);

  // TODO validations (length, format...)

  models.favoriteDrawing
    .insert(favoriteDrawing)
    .then(([result]) => {
      // console.log("Insert result:", result);
      if (result.affectedRows === 1) {
        res.json({ success: true, message: "Like successfully recorded!" });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Failed to record the like." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.favoriteDrawing
    .delete(req.params.id, req.params.drawingId)
    .then(([result]) => {
      // console.log("Insert result:", result);
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

const findAllFavoritesByDrawing = (req, res) => {
  const { idUser } = req.params;

  models.favoriteDrawing
    .findAllFavorites(idUser)
    .then(([rows]) => {
      // console.log("Find all Fav result:", rows);
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(rows);
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
  findAllFavoritesByDrawing,
  findAllFavoritesByUser,
};
