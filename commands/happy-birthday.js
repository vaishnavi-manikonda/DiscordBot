const { Client, MessageEmbed } = require('discord.js');
module.exports = {
	name: 'happyBirthday',
	description: 'Gives you a happy birthday message.',
	execute(message, args) {
        console.log(message.author.username);
        var name;
        var mess = message.content.split(" ");
        console.log(message.author.username);
        if(mess[1]==null||mess[1]==undefined||mess[1].length<1){
            name = message.author.username;
        }else{
            mess[1].trim();
            name = mess[1];
        }
        const embed = new MessageEmbed()
      
      .setTitle('Happy Birthday')

      .setColor(0xff0000)

      .setDescription('wherever in the world you happen to be, '+name+'.');

    message.channel.send(embed);
	},
};