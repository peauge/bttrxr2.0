var Promise = require("bluebird");
var yargs = require('yargs');
var _ = require('lodash');
var Table = require('cli-table2');
var colors = require('colors');

var bittrexPromise = require('../bittrex-promise');

module.exports = cancelCommand;

function cancelCommand(argv){
  if (argv.a) {
    bittrexPromise.getOpenOrders().then(function(marketOrders){
      for (var key in marketOrders) {
        if (argv.b && marketOrders[key].OrderType == "LIMIT_BUY") {
        bittrexPromise.cancel(marketOrders[key].OrderUuid).then(function(data){
            console.log(`buy order ${marketOrders[key].OrderUuid} has been removed`);
        });
      }
      else if (argv.s && marketOrders[key].OrderType == "LIMIT_SELL") {
        bittrexPromise.cancel(marketOrders[key].OrderUuid).then(function(data){
          console.log(`sell order ${marketOrders[key].OrderUuid} has been removed`);
        });
      }
      else if (argv.s == null && argv.b == null) {
        bittrexPromise.cancel(marketOrders[key].OrderUuid).then(function(data){
          console.log(`order ${marketOrders[key].OrderUuid} has been removed`);
        });
      }
      }
      console.log("done");
    });
  } else {
    bittrexPromise.cancel(argv.uuid).then(function(data){
        console.log('done');
    });
  }
}
