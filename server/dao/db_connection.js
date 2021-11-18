
class db_connection {

  static connection = null;

  static getConnection() {
    return this.connection;
  }

}

module.exports.db_connection = db_connection;