const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const INSERT_ACCOUNT = `
  INSERT INTO account values (101, 4567), (102, 1234), (103, 8910)  
  ;`;
  const INSERT_ACCOUNT_CHANGES = `
  INSERT INTO account_changes values (1, 101, 4567, '2020-10-31', 'created account'), (2, 102, 1234, '2020-10-31', 'created account'), (3, 103, 8910, '2020-10-31', 'created account') 
  ;`;
  
  connection.connect();

  try {
    await execQuery(INSERT_ACCOUNT);
    await execQuery(INSERT_ACCOUNT_CHANGES);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
