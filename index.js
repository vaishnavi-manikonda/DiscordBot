const config = require('./config.json')

const Discord = require('discord.js');
const client = new Discord.Client();
const yahooStockPrices = require('yahoo-stock-prices');

const fetch = require('node-fetch');
//node package allows us to fetch infor from api
const weatherKey = config.weatherApiKey;

client.login(config.key);

client.once('ready', () => {
	console.log('Ready!');
});
async function test(){
    const data = await yahooStockPrices.getCurrentData('GME'); 
    console.log(data.price);
}
test();
client.on('message', async message => {
    // handle the message
    const args = message.content.slice(config.commandPrefix.length).trim().split(' ');
        const command = args.shift();
    
	if (message.content.startsWith(`${config.commandPrefix}hello`)) {
	    message.channel.send(`Hello, ${message.author}!`);
    } else if (message.content.startsWith(`${config.commandPrefix}goodbye`)) {
	   message.channel.send(`See you later, ${message.author}!`);
    } else if(message.content.startsWith(`${config.commandPrefix}weather`)){
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
    } else if (message.content.startsWith(`${config.commandPrefix}affirmation`)) {
	    fetch('https://www.affirmations.dev/')  
	   .then(function(resp) { return resp.json() }) // Convert data to json
	   .then(function(data) {
        message.channel.send(data.affirmation);
	})
	.catch(function() {
		// catch any errors
            message.channel.send(`I'm afraid something went wrong. Please try this command again later.`);
	});
    }
    else if(message.content.startsWith(`${config.commandPrefix}price`)){
        if(args.length == 0){
            message.channel.send('You need to include a stock ticker. \nExample: !stock gme')
        }
        args.forEach(async ticker=>{
           const data = await yahooStockPrices.getCurrentData(ticker.toUpperCase()); 
           message.channel.send(`The price of ${ticker.toUpperCase()} is $${data.price}`)
        });
        
    
    }
});
function kToF(k){
    return ((parseFloat(k)-273.15)*1.8)+32;
}
