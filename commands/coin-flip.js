module.exports = {
	name: 'coinFlip',
	description: 'Flips coin.',
	execute(message, args) {
        var flip = Math.floor(Math.random()*2)
        message.channel.send(flip==0?'Heads':'Tails');
	},
};