const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  insert(comment) {
    return this.database.query(
      `insert into ${this.table} (comment, drawing_id, user_id) values (?,?,?)`,
      [comment.comment, comment.drawingId, comment.userId]
    );
  }

  update(comment) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      comment,
      comment.id,
    ]);
  }

  find(id) {
    return this.database.query(
      `select id, comment,  drawing_id, user_id from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(
      `select id, comment, drawing_id, user_id from  ${this.table}`
    );
  }

  findAllByDrawing() {
    return this.database.query(
      `SELECT c.id, c.comment,  c.drawing_id, c.user_id FROM  ${this.table} JOIN drawing d ON c.drawing_id = d.id WHERE d.id = drawing_id; `
    );
  }
}

module.exports = CommentManager;
