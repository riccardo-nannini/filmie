const express = require('express'); 
const path = require("path");
require('dotenv').config(); // Load environment variables from .env file
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5000; 

/*let db = new sqlite3.Database('./filmie.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database');
});*/

app.use(require('./routes/homepage'))
app.use(require('./routes/profile'))
app.use(require('./routes/login'))/*
app.use(require('./routes/register'))
app.use(require('./routes/search'))*/


app.use(
  express.static(path.join(__dirname, "./client/build"))
);

app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"));
});



app.listen(port, () => console.log(`Listening on port ${port}`)); 
