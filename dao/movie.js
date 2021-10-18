const conn = require('./db_connection.js')

function findById(movieid) {
    db = conn.db_connection.getConnectionAsync();
    return db.get("SELECT * FROM movies WHERE movieid = ?",[movieid]);
}

function createMovie(movieid) {
    db = conn.db_connection.getConnectionAsync();
    return db.run("INSERT INTO movies (movieid) VALUES (?)", [movieid]);
}

function addRating(movieid, rating) {
    db = conn.db_connection.getConnectionAsync();
    return db.get("SELECT * FROM movies WHERE movieid = ?", [movieid])
        .then((movie) => {
            if (!movie) {
                db.run("INSERT INTO movies (movieid, rating) VALUES (?, ?)"), [movieid, rating];
            } else {
                db.run("UPDATE movies SET rating = ? WHERE movieid = ?", [movie.rating + rating, movieid]);  
            }
        });
}

module.exports = {
    findById: findById,
    createMovie: createMovie,
    addRating: addRating
}