const conn = require('./db_connection.js')

function findById(movieid) {
    db = conn.db_connection.getConnection();
    return db.all("SELECT * FROM movies WHERE movieid = ?",[movieid]);
}

function createMovie(movieid) {
    db = conn.db_connection.getConnection();
    return db.run("INSERT INTO movies (movieid) VALUES (?)", [movieid]);
}

module.exports = {
    findById: findById,
    createMovie: createMovie,
}