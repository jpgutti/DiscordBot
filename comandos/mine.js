
const sql = require("sqlite");

sql.open("./score.sqlite");

exports.run = (clients, message, args) => {
	
	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
		sql.run(`UPDATE scores SET gold = ${row.gold + 1 } WHERE userId = ${message.author.id}`);
		message.channel.send(`You current gold is ${row.gold}`);
	});

}