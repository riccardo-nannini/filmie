const conn = require('./db_connection.js')

function addComment(comment, movieID, userID) {
    db = conn.db_connection.getConnectionAsync();
    return db.run("INSERT INTO comments (movieid, userid, comment) VALUES (?, ?, ?)",
        [movieID, userID, comment]);
}

function deleteComment(commentID) {
    db = conn.db_connection.getConnectionAsync();
    return db.run("DELETE FROM comments WHERE id = ? ", [commentID])
}

function updateComment(commentID, comment) {
    db = conn.db_connection.getConnectionAsync();
    return db.run("UPDATE comments SET comment = ? WHERE id = ?", [comment, commentID]);
}

function getCommentsByMovie(movieid) {
    db = conn.db_connection.getConnectionAsync();
    return db.run("SELECT * FROM comments WHERE movieid = ?", [movieid])
}

module.exports = {
    addComment: addComment,
    deleteComment: deleteComment,
    updateComment: updateComment,
    getCommentsByMovie: getCommentsByMovie,
}