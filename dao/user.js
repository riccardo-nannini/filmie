var crypto = require("crypto");
const conn = require('./db_connection.js')

class User {
  constructor(id, name, surname, email) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
  }
}

function findById(id, cb) {
  db = conn.db_connection.getConnection();
  db.each("SELECT * FROM users WHERE id = ?;", [id], (err, user) => {
    if (!user) return cb(null, false);
    return cb(null, user);
  });
}

function findByIdAsync(id) {
  db = conn.db_connection.getConnection();
  return db.get("SELECT * FROM users WHERE id = ?;", [id])
}

function findByEmail(email) {
  db = conn.db_connection.getConnection();
  return db.get("SELECT * FROM users WHERE email = ?;", [email]);
}

function authenticate(email, password, cb) {
  db = conn.db_connection.getConnection();
  db.each("SELECT * FROM users WHERE email = ?;", [email], (err, user) => {
    if (!user) {
      return cb(null, false);
    }
    // Function defined at bottom of app.js
    const isValid = validPassword(password, user.hash, user.salt);
    if (isValid) {
      return cb(null, user);
    } else {
      return cb(null, false);
    }
  })
};

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

function addUser(name, surname, email, hash, salt) {
  db = conn.db_connection.getConnection();
  db.run("INSERT INTO users (name, surname, email, hash, salt) VALUES (?,?,?,?,?);"
    ,[name, surname, email, hash, salt]);
}

function updatePassword(email, password) {
  db = conn.db_connection.getConnection();
  const saltHash = genPassword(password);

  db.run("UPDATE users SET hash = ?, salt = ? WHERE email = ?", [saltHash.hash, saltHash.salt, email]);
}

function genPassword(password) { 
        var salt = crypto.randomBytes(32).toString("hex");
        var genHash = crypto
          .pbkdf2Sync(password, salt, 10000, 64, "sha512")
          .toString("hex");

        return {
          salt: salt,
          hash: genHash,
        };
}

function deleteUser(email) {
  db = conn.db_connection.getConnection();
  return db.run("DELETE FROM users WHERE email = ?", [email]);
}  

module.exports = {
        User: User,
        findById: findById,
        findByIdAsync: findByIdAsync,
        authenticate: authenticate,
        genPassword: genPassword,
        addUser: addUser,
        deleteUser: deleteUser,
        findByEmail: findByEmail,
        updatePassword: updatePassword,
      };