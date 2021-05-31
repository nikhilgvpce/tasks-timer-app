const path = require("path");

const dbPath = path.resolve(__dirname, "db/database.sqlite");

const sqlite3 = require("sqlite3").verbose();

// opens the database
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  try {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the timer database.");
  } catch (err) {
    console.error(err.message);
  }
});

// Command that creates DB with table name 'timer' and columns username, taskname, taskid, tasktime
db.run(
  "CREATE TABLE IF NOT EXISTS timer(username text, taskname text, taskid integer, tasktime text)"
);

module.exports = db;
