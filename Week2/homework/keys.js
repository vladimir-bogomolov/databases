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
  const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS authors (
      author_no INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(50),
      university VARCHAR(50),
      date_of_birth DATE,
      h_index FLOAT,
      gender ENUM('m', 'f')
    );`;

  const ADD_COLLABORATOR = `
    ALTER TABLE authors ADD collaborator INT REFERENCES author(author_no);  
  `;

  connection.connect();

  try {
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ADD_COLLABORATOR);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();