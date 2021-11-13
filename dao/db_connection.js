const sqlite3    = require('sqlite3').verbose();
const { open } = require('sqlite');

class db_connection {
    static connection = new sqlite3.Database('./filmie.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to database');
      });

    static connectionAsync = null;

    static getConnection() {
        return this.connection;
    }

    static getConnectionAsync() {
      return this.connectionAsync;
  }
}

module.exports.db_connection = db_connection;