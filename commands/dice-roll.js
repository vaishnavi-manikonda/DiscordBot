module.exports = {
	name: 'diceRoll',
	description: 'Rolls dice.',
	execute(message, args) {
        message.channel.send(Math.floor(Math.random()*6+1));
	},
};