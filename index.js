const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs')
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});
const config = require('./config.json');
require('dotenv').config()
const chalk = require('chalk')
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.prefix = config.prefix;

module.exports = client;
fs.readdirSync('./handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});



process.on('unhandledRejection', error => {
    console.log(chalk.red('Unhandled promise rejection:', error));
});

client.on('shardError', error => {
	console.error(chalk.red('A websocket connection encountered an error:', error));
});



client.login(process.env.TOKEN);