const sqlite3    = require('sqlite3').verbose();

class db_connection {
    static connection = new sqlite3.Database('./filmie.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to database');
      });

    static getConnection() {
        return this.connection;
    }
}

module.exports.db_connection = db_connection;