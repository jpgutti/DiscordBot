const sql = require("sqlite");
const request = require("request");
const Discord = require("discord.js");
sql.open("./score.sqlite");


exports.run = (clients, message, args) => {

	sql.get(`SELECT * FROM lol WHERE userId = "${message.author.id}"`).then(row => {
		if(!row){
			sql.run(`INSERT INTO lol (userId, id) VALUES (${message.author.id}, ${args[0]})`);
		} else {
			request(`http://gotme.site-meute.com/query.php?action=rank&id=${row.id}&channel=general&r=BR&user=$user&bot=AnhkBot`, function(error, reponse, body){
				let embed = new Discord.RichEmbed()
					.setAuthor(body);

				message.channel.send(embed);
			});
		}
	});

}