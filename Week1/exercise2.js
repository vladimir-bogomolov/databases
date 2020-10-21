const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
});

function sendQuery(queryString, question) {
    connection.query(queryString, function (err, results, fields) {
        if (err) throw err;
        console.log(question, ' -> ');
        results.forEach(result => {console.log(result)});
    });
}

sendQuery("SELECT name FROM country WHERE Population > 8000000", "What are the names of countries with population greater than 8 million?");

sendQuery("SELECT name FROM country WHERE name LIKE '%land%'", "What are the names of countries that have “land” in their names?");

sendQuery("SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000", "What are the names of the cities with population in between 500,000 and 1 million?");

sendQuery("SELECT name FROM country WHERE continent = 'Europe'", "What's the name of all the countries on the continent ‘Europe’?");

sendQuery("SELECT name FROM country ORDER BY surfaceArea DESC", "List all the countries in the descending order of their surface areas.");

sendQuery("SELECT name FROM city WHERE countryCode = 'NLD'", "What are the names of all the cities in the Netherlands?");

sendQuery("SELECT population FROM city WHERE name = 'Rotterdam'", "What is the population of Rotterdam?");

sendQuery("SELECT name FROM country ORDER BY surfaceArea DESC LIMIT 10", "What's the top 10 countries by Surface Area?");

sendQuery("SELECT name FROM city ORDER BY population DESC LIMIT 10", "What's the top 10 most populated cities?");

sendQuery("SELECT SUM(population) FROM country", "What is the population number of the world?");

connection.end();