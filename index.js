
const config = require('./config.json');
const Discord = require('discord.js');
const { contact } = require('http2');
const client = new Discord.Client();
//const yahooStockPrices = require('yahoo-stock-prices');

const fetch = require('node-fetch');
//node package allows us to fetch infor from api
//const weatherKey = config.weatherApiKey;
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.login(config.key);

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
    // handle the message
    const args = message.content.slice(config.commandPrefix.length).trim().split(' ');
    const command = args.shift();
    if (!client.commands.has(command)) return;

try {
	client.commands.get(command).execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}
    /*
	if (message.content.startsWith(`${config.commandPrefix}hello`)) {
	    message.channel.send(`Hello, ${message.author}!`);
    } else if (message.content.startsWith(`${config.commandPrefix}goodbye`)) {
	   message.channel.send(`See you later, ${message.author}!`);
    } 
    */
});

