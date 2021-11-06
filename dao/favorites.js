const conn = require('./db_connection.js');

function addFavorite(userID, movieID) {
    db = conn.db_connection.getConnectionAsync();
    return db.get("SELECT movieid FROM favorite WHERE userid = ? and movieid= ?",[userID, movieID])
        .then((movie) => {
            if (!movie) {
                db.run("INSERT INTO favorite (userid, movieid) VALUES (?, ?)",[userID, movieID])
            }
        });
}

function removeFavorite(userID, movieID) {
    db = conn.db_connection.getConnectionAsync();
    return db.run("DELETE FROM favorite WHERE userid = ? AND movieid = ?", [userID, movieID])
}

function getFavorite(userID) {
    db = conn.db_connection.getConnectionAsync();
    return db.all("SELECT movieid FROM favorite WHERE userid = ?", [userID])
}

function getFavoriteMovie(userID, movieID) {
    db = conn.db_connection.getConnectionAsync();
    return db.get("SELECT movieid FROM favorite WHERE userid = ? and movieid= ?",[userID, movieID])
}

module.exports = {
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
    getFavorite: getFavorite,
    getFavoriteMovie: getFavoriteMovie
}