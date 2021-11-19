const conn = require('./db_connection.js')

function getRatingByMovie(movieid) {
    db = conn.db_connection.getConnection();
    return db.get("SELECT SUM(rating)/COUNT(rating)*10 FROM rating WHERE movieid = ?",[movieid]);
}

function getRatingByMovieAndUser(userid, movieid) {
    db = conn.db_connection.getConnection();
    return db.get("SELECT rating FROM rating WHERE movieid = ? and userid=?",[movieid, userid]);
}

function addRating(movieid, userid, rating) {
    db = conn.db_connection.getConnection();
    return db.get("SELECT rating from rating WHERE userid=? and movieid=?", [userid, movieid])
        .then((result) => {
            db.get("SELECT movieid FROM movies WHERE movieid= ?", [movieid]).then((movie) => {
                if (!movie) {
                    db.run("INSERT INTO movies (movieid) VALUES (?)",[movieid])
                }
                if (!result) {
                    db.run("INSERT INTO rating (userid, movieid, rating) VALUES (?, ?, ?)", [userid, movieid, rating])
                } else {
                    db.run("UPDATE rating SET rating=? WHERE userid=? and movieid=?", [rating, userid, movieid])
                }
            });
            
        })
}

function getRatingDistribution(movieid) {
    db = conn.db_connection.getConnection();
    return db.all("SELECT rating, count(rating) as count FROM rating WHERE movieid=? GROUP BY rating", [movieid])
}

module.exports = {
    getRatingByMovie: getRatingByMovie,
    getRatingByMovieAndUser: getRatingByMovieAndUser,
    addRating: addRating,
    getRatingDistribution: getRatingDistribution
}