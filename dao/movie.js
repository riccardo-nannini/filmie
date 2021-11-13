const conn = require('./db_connection.js')

function findById(movieid) {
    db = conn.db_connection.getConnectionAsync();
    return db.all("SELECT * FROM movies WHERE movieid = ?",[movieid]);
}

function createMovie(movieid) {
    db = conn.db_connection.getConnectionAsync();
    return db.run("INSERT INTO movies (movieid) VALUES (?)", [movieid]);
}

module.exports = {
    findById: findById,
    createMovie: createMovie,
}