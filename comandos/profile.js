const sql = require("sqlite");
const Discord = require("discord.js");
sql.open("./score.sqlite");

exports.run = (clients, message, args) => {

	sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.username, message.author.avatarURL)
			.addField("Role", message.member.highestRole.name, inline=true)
			.addField("Lvl/xp", `${row.level}/${row.points}`, inline=true)
			.addField("Gold", `${row.gold}`, inline=true)
			.setColor(message.member.highestRole.color)

			message.channel.send(embed);

	});

}