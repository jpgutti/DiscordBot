const config = require("./config.json")

const discord = require('discord.js')

const bot = new discord.Client()

const token = config.token;

const prefix = config.prefix;

var request = require("request");

const sql = require("sqlite");

sql.open("./score.sqlite");

// Json read/write required consts

const fs = require("fs");

fs.readdir("./comandos/", (err, files) => {
	if(err) return console.error(err);
	files.forEach(file => {
		let eventFunction = require(`./comandos/${file}`);
		let eventName = file.split(".")[0];

		bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
	})
})



bot.on('ready', () => {
	console.log('Hello There!')
});

bot.on('message', async message => {

	//Points Attrib

	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
	    if (!row && !message.author.bot) {
	      sql.run("INSERT INTO scores (userId, points, level, gold) VALUES (?, ?, ?, ?)", [message.author.id, 1, 0, 0]);
	    } else if (!message.content.startsWith(prefix) && !message.author.bot) {
	    		let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
				if (curLevel > row.level) {
				  row.level = curLevel;
				  sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
				  message.channel.send(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
				}
	      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
	    }
	  	}).catch(() => {
		    console.error;
		    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
		    sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
		});
	  });


	if (message.content.startsWith(prefix + "level")) {
	    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
	      if (!row) return message.reply("Your current level is 0");
	      message.reply(`Your current level is ${row.level}`);
	    });
  	} else

  	if (message.content.startsWith(prefix + "points")) {
	    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
	      if (!row) return message.reply("sadly you do not have any points yet!");
	      message.reply(`you currently have ${row.points} points, good going!`);
	    });
  	}
	//Points Attrib


	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	
	//Fetch comandos folder for comandos

	if(message.content.startsWith(`${prefix}`)){
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		try {
			let commandFile = require(`./comandos/${command}.js`);
			commandFile.run(bot, message, args, discord);
		} catch (err) {
			console.error(err);
		}
	};	

	//Fetch commands folder for commands

	
});

bot.login(token);

//kadus command logic for get rank

// if(message.content.startsWith(`${prefix}kadu`)){
// 		request("http://gotme.site-meute.com/query.php?action=rank&id=2867915&channel=kaduraiobeta&r=BR&user=$user&bot=AnhkBot", function(error, responde, body) {
// 		console.log(body);
// 		message.channel.send(body);
	
// 	});
// 	}