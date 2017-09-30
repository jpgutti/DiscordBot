const sql = require("sqlite");

sql.open("./score.sqlite");

exports.run = (clients, message, args) => {

	let miner = Math.floor(Math.random() * (15 - 10) + 10);
	
	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
		if(!row.mine){
			sql.run(`UPDATE scores SET mine = (${message.createdTimestamp}) WHERE userId = ${message.author.id}`);
			sql.run(`UPDATE scores SET gold = ${row.gold + miner } WHERE userId = ${message.author.id}`);
			message.channel.send(`You have found ${miner} Golds! Now you have ${row.gold} Golds in you bag`);

		} else if ((message.createdTimestamp - row.mine) < 3600000 ) {
			message.channel.send("You can just mine once an Hour");
			console.log(message.createdTimestamp - row.mine);
		} else {
			console.log(row.mine);
			sql.run(`UPDATE scores SET gold = ${row.gold + miner } WHERE userId = ${message.author.id}`);
			message.channel.send(`You have found ${miner} Golds! Now you have ${row.gold} Golds in you bag`);
		}
	});

}