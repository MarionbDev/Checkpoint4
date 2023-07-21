const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  insert(comment) {
    return this.database.query(
      `insert into ${this.table} (comment, date_time, drawing_id, user_id) values (?,?,?,?)`,
      [comment.comment, comment.date_time, comment.drawing_id, comment.user_id]
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
      `select id, comment, date_time, drawing_id, user_id from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(
      `select id, comment, date_time, drawing_id, user_id from  ${this.table}`
    );
  }
}

module.exports = CommentManager;
