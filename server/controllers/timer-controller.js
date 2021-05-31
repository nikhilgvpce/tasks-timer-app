// Import database
const db = require("./../db");

const getAllTaks = (callBack) => {
  const result = [];
  return db.serialize(() => {
    db.each(
      `SELECT username,
                        taskname,
                        tasktime
                 FROM timer`,
      (err, row) => {
        if (err) {
          console.error(err.message);
        }
        result.push({
          user: row.username,
          taskName: row.taskname,
          time: row.tasktime,
        });
      }, (err, count) => {
        callBack(result);
      }
    );
  });
}

exports.allTasks = async (req, res) => {  
  getAllTaks((result) => {
    res.json({result})
  })
  return res;
};

exports.createUser = async (req, res) => {
  return db.serialize(() => {
    db.run(
      `INSERT INTO timer(username) VALUES(?)`,
      [req.body.username],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.json({ message: `User ${req.body.username} created.` });
      }
    );
  });
};

exports.createTask = async (req, res) => {
  return db.serialize(() => {
    db.run(
      `INSERT INTO timer VALUES(?,?,?,?)`,
      [req.body.user, req.body.name, req.body.id, req.body.time],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.json({
          taskName: req.body.name,
          time: req.body.time,
          id: req.body.id,
        });
      }
    );
  });
};
