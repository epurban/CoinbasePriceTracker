var fs = require('fs');
var Client = require('coinbase').Client;

// read api key and secret in from text file
var apiData = fs.readFileSync('api.txt').toString().split("\n");
var client = new Client({'apiKey': apiData[0], 'apiSecret': apiData[1]});

// PRICES
var btcPreviousPrice;
var btcCurPrice;
var ltcPreviousPrice;
var ltcCurPrice;

// TRENDS
var btcTrend; // keeps track of how many times in a row the price changes either positively or negatively
var ltcTrend;

var checkPrices = setInterval(function () {
	client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, obj) {
		
	  btcPreviousPrice = btcCurPrice;
	  btcCurPrice = obj.data.amount;
      var change = 0;
      
      // BTC PRICE INCREASE :D
	  if (btcPreviousPrice < btcCurPrice) {
        
		  change = btcCurPrice - btcPreviousPrice;
		  console.log("BTC Change +" + change);
        
          if (btcTrend > 0) {
            btcTrend++;
          } else {
            btcTrend = 1;
          }
        
      // BTC PRICE DECREASE :(
	  } else if (btcPreviousPrice > btcCurPrice) {
        
		  change = btcPreviousPrice - btcCurPrice;
		  console.log("BTC Change -" + change);
        
          if (btcTrend < 0) {
            btcTrend--;
          } else {
            btcTrend = -1;
          }
        
	  }
		
	  console.log('BTC: $' + btcCurPrice);
	});
  
    client.getBuyPrice({'currencyPair': 'LTC-USD'}, function(err, obj) {
		
	  ltcPreviousPrice = ltcCurPrice;
	  ltcCurPrice = obj.data.amount;
      var change = 0;
      
      // LTC PRICE INCREASE :D
	  if (ltcPreviousPrice < ltcCurPrice) {
        
		  change = ltcCurPrice - ltcPreviousPrice;
		  console.log("LTC Change +" + change);
        
          if (ltcTrend > 0) {
            ltcTrend++;
          } else {
            ltcTrend = 1;
          }
      
      // LTC PRICE DECREASE :(
	  } else if (ltcPreviousPrice > ltcCurPrice) {
        
		  change = ltcPreviousPrice - ltcCurPrice;
		  console.log("LTC Change -" + change);
        
          if (ltcTrend < 0) {
            ltcTrend--;
          } else {
            ltcTrend = -1;
          }
	  }
	
	  console.log('LTC: $' + ltcCurPrice);
	});
}, 5000);