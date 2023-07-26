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
      `SELECT favoriteDrawing.id, favoriteDrawing.user_id AS userId, favoriteDrawing.drawing_id AS drawingId, user.firstname, user.lastname, drawing.image, drawing.title FROM ${this.table} AS favoriteDrawing JOIN drawing ON drawing.id = favoriteDrawing.drawing_id JOIN user ON user.id = favoriteDrawing.user_id `
    );
  }

  findAllFavorites(idUser, idDrawing) {
    return this.database.query(
      `SELECT  favorite_drawing.id ,drawing.id, drawing.title, drawing.description, drawing.image, user.lastname, user.firstname
      FROM ${this.table}
      JOIN drawing ON drawing.id = favorite_drawing.drawing_id
      JOIN user ON favorite_drawing.user_id = user.id
      WHERE favorite_drawing.user_id = ?`,
      [idUser, idDrawing]
    );
  }

  findFavorite(id) {
    return this.database.query(
      `SELECT  favorite_drawing.id ,drawing.id, drawing.title, drawing.description, drawing.image, user.lastname, user.firstname
      FROM ${this.table}
      JOIN drawing ON drawing.id = favorite_drawing.drawing_id
      JOIN user ON favorite_drawing.user_id = user.id
      WHERE favorite_drawing.user_id = ?`,
      [id]
    );
  }

  // findAllFavoritesUser(idUser) {
  //   console.log("ID utilisateur:", idUser);
  //   return this.database.query(
  //     `SELECT * FROM favorite_drawing WHERE user_id = ?`,
  //     [idUser]
  //   );
  // }

  delete(userId, drawingId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? AND drawing_id = ?`,
      [userId, drawingId]
    );
  }
}

module.exports = FavoriteDrawingManager;
