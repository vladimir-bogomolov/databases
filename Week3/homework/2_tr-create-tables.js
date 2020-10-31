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
  const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE IF NOT EXISTS account (
      account_number INT PRIMARY KEY,
      balance FLOAT
    );`;
  const CREATE_CHANGES_TABLE = `
    CREATE TABLE IF NOT EXISTS account_changes (
      change_number INT PRIMARY KEY AUTO_INCREMENT,
      account_number INT,
      amount FLOAT,
      changed_date DATE,
      remark VARCHAR(150),
      FOREIGN KEY (account_number) REFERENCES account(account_number)
    );`;
  
  connection.connect();

  try {
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_CHANGES_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
