module.exports = {
	name: 'price',
	description: 'Gets stock price of given ticker.',
	execute(message, args) {
        const yahooStockPrices = require('yahoo-stock-prices');
        
		 if(args.length == 0){
            message.channel.send('You need to include a stock ticker. \nExample: !stock gme')
        }
        args.forEach(async ticker=>{
            try{
                const data = await yahooStockPrices.getCurrentData(ticker.toUpperCase()); 
                message.channel.send(`The price of ${ticker.toUpperCase()} is $${data.price}`);
            }catch(error){
                message.channel.send(`Unfortunately, this failed.`)
            }
        });
	},
};