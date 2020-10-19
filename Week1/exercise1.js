const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
});

function sendQuery(queryString) {
    connection.query(queryString, function (err, results, fields) {
        if (err) throw err;
        console.log("Result: ", results);
    });
}

sendQuery("CREATE DATABASE meetup");
sendQuery("use meetup");
sendQuery("CREATE TABLE Invitee (invitee_no int, invitee_name varchar(50), invited_by varchar(50))");
sendQuery("CREATE TABLE Room (room_no int, room_name varchar(50), floor_number int)");
sendQuery("CREATE TABLE Meeting (meeting_no int, meeting_title varchar(50), starting_time datetime, ending_time datetime, room_no int)");
for (let i = 1; i < 6; i++) {
    sendQuery(`INSERT INTO Invitee values (${i}, 'Name${i}', 'Name${i-1}')`);
}
for (let i = 1; i < 6; i++) {
    sendQuery(`INSERT INTO Room values (${i}, 'Room${i}', ${i})`);
}
for (let i = 1; i < 6; i++) {
    sendQuery(`INSERT INTO Meeting values (${i}, 'Meeting${i}', '2020-10-1${i} 12:00:00', '2020-10-1${i} 13:00:00', ${i})`);
}

connection.end();