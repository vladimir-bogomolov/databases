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
  const AUTHORS_COLLABORATORS = `
  select a1.author_name, a2.author_name as colaborator_name from authors a1 join authors a2 on a1.collaborator = a2.author_no`;
  const AUTHORS_PAPERS = `
  select a.author_name, p.paper_title from authors a left join papers_authors r on a.author_no = r.author_no left join research_papers p on r.paper_id = p.paper_id;`;

  connection.connect();

  try {
    let collaboration = await execQuery(AUTHORS_COLLABORATORS);
    collaboration.forEach(result => console.log(result));
    let authorsPapers = await execQuery(AUTHORS_PAPERS);
    authorsPapers.forEach(result => console.log(result));
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();