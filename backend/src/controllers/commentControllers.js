const models = require("../models");

const browse = (req, res) => {
  models.comment
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
  models.comment
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const comment = req.body;

  // TODO validations (length, format...)

  comment.id = parseInt(req.params.id, 10);

  models.comment
    .update(comment)
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
  const comment = req.body;

  // TODO validations (length, format...)

  models.comment
    .insert(comment)
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
  models.comment
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

const allCreation = (req, res) => {
  const idUser = req.params.id;
  models.comment
    .findAllCreation(parseInt(idUser, 10))
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const allCommentByDrawing = (req, res) => {
  models.comment
    .findAllComment(req.params.id)
    .then(([rows]) => {
      // console.log("Find all Fav result:", rows);
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
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
  allCreation,
  allCommentByDrawing,
};
