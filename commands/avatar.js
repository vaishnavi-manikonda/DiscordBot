module.exports = {
	name: 'avatar',
	description: 'Gets avatar image.',
	execute(message, args) {
        message.reply(message.author.displayAvatarURL());
	},
};