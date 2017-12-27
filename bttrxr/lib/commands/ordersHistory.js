var Promise = require("bluebird");
var yargs = require('yargs');
var _ = require('lodash');
var Table = require('cli-table2');
var colors = require('colors');

var bittrexPromise = require('../bittrex-promise');

module.exports = ordersHistoryCommand;

function ordersHistoryCommand(argv){
    bittrexPromise.getOrdersHistory().then(function(marketOrders){

        var orders = marketOrders.map((order)=>{
            var type = order.OrderType.replace('LIMIT_','');
            var total = (order.Limit * order.Quantity).toFixed(8);
            return {
                market: order.Exchange,
                type: type,
                price: order.Limit,
                amount: order.Quantity,
                total: total,
                orderNumber: order.OrderUuid,
                time : order.TimeStamp
            };
        });

        var table  = new Table({head: ['Market'.cyan, 'Type'.cyan, 'Price'.cyan, 'Amount'.cyan, 'BTC Value'.cyan, 'Time'.cyan]});

        orders.forEach((order)=>{
            var typeColored = order.type === 'SELL' ? order.type.yellow : order.type.magenta;
            if (argv.market) {
            if (argv.market == order.market.toUpperCase()){
            if (order.type === 'SELL' && argv.s)
             table.push([order.market,typeColored, order.price,order.amount, order.total, order.time]);
            else if (order.type === 'BUY' && argv.b)
              table.push([order.market,typeColored, order.price,order.amount, order.total, order.time]);
            else if (argv.s == null && argv.b == null)
              table.push([order.market,typeColored, order.price,order.amount, order.total, order.time]);
            }
            }
            else {
              if (order.type === 'SELL' && argv.s)
               table.push([order.market,typeColored, order.price,order.amount, order.total, order.time]);
              else if (order.type === 'BUY' && argv.b)
                table.push([order.market,typeColored, order.price,order.amount, order.total, order.time]);
              else if (argv.s == null && argv.b == null)
                table.push([order.market,typeColored, order.price,order.amount, order.total, order.time]);
            }

        });

        console.log(table.toString());
    });
}
