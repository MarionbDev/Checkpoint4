const AbstractManager = require("./AbstractManager");

class FavoriteDrawingManager extends AbstractManager {
  constructor() {
    super({ table: "favorite_drawing" });
  }

  insert(favoriteDrawing) {
    return this.database.query(
      `insert into ${this.table} (drawing_id, user_id) values (?,?)`,
      [favoriteDrawing.drawingId, favoriteDrawing.userId]
    );
  }

  update(favoriteDrawing) {
    return this.database.query(
      `update ${this.table} SET ? where drawing_id = ?`,
      [favoriteDrawing.drawingId, favoriteDrawing.userId]
    );
  }

  findAll() {
    return this.database.query(
      `SELECT favoriteDrawing.user_id AS userId, favoriteDrawing.drawing_id AS drawingId, user.firstname, user.lastname, drawing.image, drawing.title FROM ${this.table} AS favoriteDrawing JOIN drawing ON drawing.id = favoriteDrawing.drawing_id JOIN user ON user.id = favoriteDrawing.user_id `
    );
  }

  findByUser(userId) {
    return this.database.query(
      `SELECT favoriteDrawing.user_id AS userId, favoriteDrawing.drawing_id AS drawingId, drawing.image, drawing.title FROM ${this.table} AS favoriteDrawing JOIN drawing.id = favoriteDrawing.drawing_id JOIN user ON user.id = favoriteDrawing.user_id WHERE favoriteDrawing.user_id = ?`,
      [userId]
    );
  }

  delete(userId, drawingId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? AND drawing_id = ?`,
      [userId, drawingId]
    );
  }
}

module.exports = FavoriteDrawingManager;
