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
  function randomString(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


  const CREATE_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(50),
      conference VARCHAR(50),
      publish_date DATE
    );`;

  //Create an additional table for Many-to-Many relationships
  const CREATE_PAPERS_AUTHORS_TABLE = `
  CREATE TABLE IF NOT EXISTS papers_authors (
    paper_id INT NOT NULL,
    author_no INT NOT NULL,
    PRIMARY KEY (paper_id, author_no),
    CONSTRAINT paper_fk FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id),
    CONSTRAINT author_fk FOREIGN KEY (author_no) REFERENCES authors(author_no)
  );`;

  //Fill tables
  let authorNames = [];
  for (let i = 0; i < 15; i++) {
      let authorName = randomString(10);
      authorNames.push(authorName);
  }
  let papers = [];
  for (let i = 0; i < 30; i++) {
      let paperName = randomString(20);
      papers.push(paperName);
  }
  let university = ['University of Amsterdam', 'MIT', 'Harvard University'];
  let gender = ['m', 'f'];
  let conference = ['Conference one', 'Conference two', 'Conference three'];

  connection.connect();

  try {
    await execQuery(CREATE_PAPERS_TABLE);
    await execQuery(CREATE_PAPERS_AUTHORS_TABLE);
    authorNames.forEach(async author => {
        await execQuery(`
        INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) 
        VALUES(?, '${university[Math.floor(Math.random() * university.length)]}', '1950-10-10', ${Math.random()}, '${gender[Math.floor(Math.random() * gender.length)]}');`, author);
    });
    await execQuery(`UPDATE authors SET collaborator = 3 WHERE author_no = 1;`);
    await execQuery(`UPDATE authors SET collaborator = 1 WHERE author_no = 3;`);
    await execQuery(`UPDATE authors SET collaborator = 5 WHERE author_no = 9;`);
    await execQuery(`UPDATE authors SET collaborator = 9 WHERE author_no = 5;`);
    await execQuery(`UPDATE authors SET collaborator = 11 WHERE author_no = 15;`);
    await execQuery(`UPDATE authors SET collaborator = 15 WHERE author_no = 11;`);
    papers.forEach(async paper => {
        await execQuery(`
        INSERT INTO research_papers (paper_title, conference, publish_date) 
        VALUES(?, '${conference[Math.floor(Math.random() * conference.length)]}', '2020-02-17');`, paper);
    });
    for (let i = 1; i < 31; i++) {
        let author1 = Math.floor(Math.random() * 13) + 1;
        let author2 = Math.floor(Math.random() * 13) + 1;
        while (author1 === author2) {
            author2 = Math.floor(Math.random() * 13) + 1;
        }
        await execQuery(`
        INSERT INTO papers_authors VALUES(${i}, ${author1});`);
        await execQuery(`
        INSERT INTO papers_authors VALUES(${i}, ${author2});`);
    }
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();