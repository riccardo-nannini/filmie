const conn = require('./db_connection.js');

function addWatchlist(userID, movieID) {
    db = conn.db_connection.getConnectionAsync();
    return db.run("INSERT INTO watchlist (userid, movieid) VALUES (?, ?)",[userID, movieID])
}

function removeWatchlist(userID, movieID) {
    db = conn.db_connection.getConnectionAsync();
    return db.run("DELETE FROM watchlist WHERE userid = ? AND movieid = ?", [userID, movieID])
}

function getWatchlist(userID) {
    db = conn.db_connection.getConnectionAsync();
    return db.get("SELECT movieid FROM watchlist WHERE userid = ?", [userID])
}

module.exports = {
    addWatchlist: addWatchlist,
    removeWatchlist: removeWatchlist,
    getWatchlist: getWatchlist
}