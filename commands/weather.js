const config = require('../config.json');

module.exports = {
	name: 'weather',
	description: 'Gets weather of area in zipcode in the U.S., otherwise gets weather of Milwaukee.',
	execute(message, args) {
        const weatherKey = config.weatherApiKey;
        const fetch = require('node-fetch');
        
		var mess = message.content.split(" ");
        var zip;
        
        if(mess[1]!=null && mess[1].length==5 && !isNaN(mess[1])){
            zip =  parseInt(mess[1], 10);
        } else{
            zip = 53045;
        }
        
        fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zip+ '&appid=' + weatherKey)  
	   .then(function(resp) { return resp.json() }) // Convert data to json
	   .then(function(data) {
		var currentTemp = Math.round(kToF(data.main.temp));
        var feelsLike = Math.round(kToF(data.main.feels_like));
        var icon = '';
        if(data.weather.icon!=undefined){
            icon = data.weather.icon;
        }
        message.channel.send(`${icon} It is ${currentTemp} F°, it feels like it's ${feelsLike} F°, and it is ${data.clouds.all}% cloudy in ${data.name}.`);
	})
	.catch(function() {
		// catch any errors
            message.channel.send(`The message should be in the format !weather or !weather #####, with ##### being replaced with the desired zipcode of the area.`);
	});
        
        function kToF(k){
    return ((parseFloat(k)-273.15)*1.8)+32;
}
	},
};