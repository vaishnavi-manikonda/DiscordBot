module.exports = {
	name: 'affirmation',
	description: 'Gets affirmation!',
	execute(message, args) {
		const fetch = require('node-fetch');
        fetch('https://www.affirmations.dev/')  
	   .then(function(resp) { return resp.json() }) // Convert data to json
	   .then(function(data) {
        message.channel.send(data.affirmation);
	})
	.catch(function() {
		// catch any errors
            message.channel.send(`I'm afraid something went wrong. Please try this command again later.`);
	});
	},
};