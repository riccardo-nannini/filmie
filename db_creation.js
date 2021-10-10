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

db.run('INSERT into users (name, surname, email, hash, salt) VALUES ("riccardo", "nannini", "riccardo@mail.com", "password", "salt");')
db.close();