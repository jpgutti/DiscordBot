const discord = require('discord.js');
const sql = require("sqlite");
sql.open("./score.sqlite");

exports.run = (clients, message, args) => {
	args = args.map(parseInt);

	let n = Math.floor(Math.random() * 10);


	let embed = new discord.RichEmbed()
		.setAuthor("The Lottery")
		.setDescription(`The Number of the lottery is: ${n}`)
		.setColor("#00FF00");




	sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
		sql.run(`UPDATE scores SET gold = ${row.gold + 1} WHERE userId = ${message.author.id}`);
		console.log(row.gold);

		if(row.points < 5) {
			message.channel.send(`Sorry ${message.author.username}, but you can't afford the ticket`);
		} else {
			message.channel.send("Well, Well, Look who is trying the luck of that day...");
			message.channel.send(embed);
		 	if(n == args[0]){
				message.channel.send("Congratulations! Today The Kingdom has one more rich person!");
			} else {
				let amount = args.length * 5;			
				message.channel.send(`${message.author.username} better luck next time. You lost ${amount}xp`);
				sql.run(`UPDATE scores SET points = ${row.points - amount} WHERE userId = ${message.author.id}`);
			}
		}
	});

}