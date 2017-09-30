const request = require("request");
const Discord = require("discord.js");
const sql = require("sqlite");
sql.open("./score.sqlite");

exports.run = (clients, message, args) => {

	//rule to save user id

	let options = {
		url: `https://api.opendota.com/api/players/${args[0]}`
	}

	request.get(`https://api.opendota.com/api/players/${args[0]}`, function(er, re, body){
		let resp = JSON.parse(body);
		let embed = new Discord.RichEmbed()
			.setAuthor(`${resp.solo_competitive_rank} mmr`)
			.setColor(message.member.highestRole.color)

		message.channel.send(embed);
	});


}