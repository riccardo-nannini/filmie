const conn = require('./db_connection.js');

function addFavorite(userID, movieID) {
    db = conn.db_connection.getConnection();
    return db.get("SELECT movieid FROM favorite WHERE userid = ? and movieid= ?",[userID, movieID])
        .then((movie) => {
            if (!movie) {
                db.run("INSERT INTO favorite (userid, movieid) VALUES (?, ?)",[userID, movieID])
                db.get("SELECT movieid FROM movies WHERE movieid= ?", [movieID]).then((movie) => {
                    if (!movie) {
                        db.run("INSERT INTO movies (movieid) VALUES (?)",[movieID])
                    }
                });
            }
        });
}

function removeFavorite(userID, movieID) {
    db = conn.db_connection.getConnection();
    return db.run("DELETE FROM favorite WHERE userid = ? AND movieid = ?", [userID, movieID])
}

function getFavorite(userID) {
    db = conn.db_connection.getConnection();
    return db.all("SELECT movieid FROM favorite WHERE userid = ? LIMIT 15", [userID])
}

function getFavoriteMovie(userID, movieID) {
    db = conn.db_connection.getConnection();
    return db.get("SELECT movieid FROM favorite WHERE userid = ? and movieid= ?",[userID, movieID])
}

module.exports = {
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
    getFavorite: getFavorite,
    getFavoriteMovie: getFavoriteMovie
}