// 1. Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)
// name = 'Aruba'
// code = `ABW'; select * from country; #`
// But it doesn't work with JS, because it's not possible to execute 2 queries the same time.

// 2. Rewrite the function so that it is no longer vulnerable to SQL injection

function getPopulation(country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ? WHERE Name = ? and code = ?`, [country, name, code],
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }