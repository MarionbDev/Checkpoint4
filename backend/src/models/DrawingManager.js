const AbstractManager = require("./AbstractManager");

class DrawingManager extends AbstractManager {
  constructor() {
    super({ table: "drawing" });
  }

  insert(drawing) {
    return this.database.query(
      `insert into ${this.table} (title ,description, image, user_id ) values (?, ?, ?, ?)`,
      [drawing.title, drawing.description, drawing.image, drawing.user_id]
    );
  }

  update(drawing) {
    return this.database.query(`update ${this.table} set  ? where id = ?`, [
      drawing,
      drawing.id,
    ]);
  }

  find(id) {
    return this.database.query(
      `select drawing.id, title ,description, image, user_id from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAllCreation(idUser) {
    return this.database.query(
      `SELECT drawing.id , drawing.title, drawing.description, drawing.image, user.lastname, user.firstname FROM ${this.table} JOIN user ON user.id = user_id WHERE user.id = ?`,
      [idUser]
    );
  }
}

module.exports = DrawingManager;
