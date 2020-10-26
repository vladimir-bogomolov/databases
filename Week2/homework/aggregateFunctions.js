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
  const PAPERS_AUTHORS_NUMBER = `
  select p.paper_title, count(r.author_no) from research_papers p join papers_authors r on p.paper_id = r.paper_id group by p.paper_title;`;

  const NUMBER_FEMALE_PAPERS = `
  select a.gender, count(distinct r.paper_id) from authors a left join papers_authors r on a.author_no = r.author_no where a.gender = 'f';`;

  const AVG_H_UNIVERSITY = `
  select university, avg(h_index) from authors group by university;`;

  const NUMBER_PAPERS_UNIVERSITY = `
  select a.university, count(distinct r.paper_id) from authors a join papers_authors r on a.author_no = r.author_no group by a.university;`;

  const MIN_MAX_H_UNIVERSITY = `
  select university, min(h_index), max(h_index) from authors group by university;`;
  

  connection.connect();

  try {
    let papersAuthorsNum = await execQuery(PAPERS_AUTHORS_NUMBER);
    console.log(papersAuthorsNum);
    let papersFemaleNum = await execQuery(NUMBER_FEMALE_PAPERS);
    console.log(papersFemaleNum);
    let avgHIndex = await execQuery(AVG_H_UNIVERSITY);
    console.log(avgHIndex);
    let papersUniversity = await execQuery(NUMBER_PAPERS_UNIVERSITY);
    console.log(papersUniversity);
    let minMaxHIndex = await execQuery(MIN_MAX_H_UNIVERSITY);
    console.log(minMaxHIndex);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();