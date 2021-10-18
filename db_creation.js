const sqlite3    = require('sqlite3').verbose();

let db = new sqlite3.Database('./filmie.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to database');
  });

db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        surname TEXT,
        email TEXT,
        hash TEXT,
        salt TEXT
    )`);

db.run(`CREATE TABLE IF NOT EXISTS movies (
      movieid INTEGER PRIMARY KEY,
      rating DOUBLE
  )`);

db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movieid INTEGER,
    userid  INTEGER,
    comment TEXT,
    FOREIGN KEY (movieid) REFERENCES movies (movieid)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (userid) REFERENCES users (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
)`);

db.run(`CREATE TABLE IF NOT EXISTS favorite (
  userid INTEGER ,
  movieid INTEGER,
  PRIMARY KEY (userid, movieid),
  FOREIGN KEY (movieid) REFERENCES movies (movieid)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (userid) REFERENCES users (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
)`);

db.run(`CREATE TABLE IF NOT EXISTS watchlist (
  userid INTEGER ,
  movieid INTEGER,
  PRIMARY KEY (userid, movieid),
  FOREIGN KEY (movieid) REFERENCES movies (movieid)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (userid) REFERENCES users (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
)`);

db.close();