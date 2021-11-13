const { get } = require('../routes/favorite.js');
const conn = require('./db_connection.js');

function addWatchlist(userID, movieID) {
    db = conn.db_connection.getConnectionAsync();
    return db.get("SELECT movieid FROM watchlist WHERE userid = ? and movieid= ?",[userID, movieID])
    .then((movie) => {
        if (!movie) {
            db.run("INSERT INTO watchlist (userid, movieid) VALUES (?, ?)",[userID, movieID])
            db.run("SELECT movieid FROM movies WHERE movieid= ?", [movieID]).then((movie) => {
                if (!movie) {
                    db.run("INSERT INTO movies (userid, movieid) VALUES (?)",[movieID])
                }
            });
        }
    });
}

function removeWatchlist(userID, movieID) {
    db = conn.db_connection.getConnectionAsync();
    return db.run("DELETE FROM watchlist WHERE userid = ? AND movieid = ?", [userID, movieID])
}

function getWatchlist(userID) {
    db = conn.db_connection.getConnectionAsync();
    return db.all("SELECT movieid FROM watchlist WHERE userid = ?", [userID])
}

function getWatchlistMovie(userID, movieID) {
    db = conn.db_connection.getConnectionAsync();
    return db.get("SELECT movieid FROM watchlist WHERE userid = ? and movieid= ?",[userID, movieID])
}

module.exports = {
    addWatchlist: addWatchlist,
    removeWatchlist: removeWatchlist,
    getWatchlist: getWatchlist,
    getWatchlistMovie: getWatchlistMovie,
}