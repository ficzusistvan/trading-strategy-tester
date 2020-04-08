import moment from 'moment';
import * as i from './../interfaces';
var colors = require('colors/safe');

const TAKE_PROFIT = 20;
const STOP_LOSS = 60;

let calculatedTP = 0;
let calculatedSL = 0;

colors.enable();

let searchFirstCandleInDay = function (date: moment.Moment, candles: Array<i.ICommonCandle>): i.ICommonCandle | null {
  for (let i = 0; i < candles.length; i++) {
    if (date.isSame(candles[i].date, "day")) {
      return candles[i];
    }
  }
  return null;
}

let enter = function (candles: Array<i.ICommonCandle>, idx: number): i.ITesterStrategyResult {

  //console.log(colors.gray('Handling candle: ' + JSON.stringify(candles[idx])));
  let trade: i.ITesterTrade = { price: 0, side: i.ETesterSide.NONE, date: '' };
  let result: boolean = false;

  if (moment(candles[idx].date).hour() === 9 && moment(candles[idx].date).minute() === 0) {
    const firstCandleInDay = searchFirstCandleInDay(moment(candles[idx].date), candles);
    console.log(colors.gray('First candle in day: ' + JSON.stringify(firstCandleInDay)));
    if (firstCandleInDay !== null) {
      trade.price = candles[idx].open;
      trade.date = candles[idx].date;
      const diff = candles[idx].open - firstCandleInDay.open;
      if (diff > 0) {
        trade.side = i.ETesterSide.BUY;
        calculatedTP = Number(trade.price) + TAKE_PROFIT;
        calculatedSL = Number(trade.price) - STOP_LOSS;
      } else {
        trade.side = i.ETesterSide.SELL;
        calculatedTP = Number(trade.price) - TAKE_PROFIT;
        calculatedSL = Number(trade.price) + STOP_LOSS;
      }
      result = true;
      console.log(colors.blue('Trade side and open price: [' + trade.side + '][' + trade.price + ']'));
      console.log(colors.blue('Calculated TP and SL: [' + calculatedTP + '][' + calculatedSL + ']'));
      console.log(colors.blue('Enter strategy result: ' + JSON.stringify(trade)));
    }
  }

  return { result: result, trade: trade };
}

/* ha buy akkor TP a H es SL a L
ha sell akkor TP a L es TP a H */
let exit = function (candles: Array<i.ICommonCandle>, idx: number, openedTrade: i.ITesterTrade): i.ITesterStrategyResult {

  let trade: i.ITesterTrade = { price: 0, side: i.ETesterSide.NONE, date: '' };
  
  if (openedTrade.side === i.ETesterSide.BUY) {
    if (candles[idx].low <= calculatedSL) {
      trade.price = candles[idx].low;
      trade.date = candles[idx].date;
      console.log(colors.red('Exit strategy result: ' + JSON.stringify(trade)));
      return { result: true, trade: trade };
    }
    if (candles[idx].high >= calculatedTP) {
      trade.price = candles[idx].high;
      trade.date = candles[idx].date;
      console.log(colors.green('Exit strategy result: ' + JSON.stringify(trade)));
      return { result: true, trade: trade };
    }
  }
  if (openedTrade.side === i.ETesterSide.SELL) {
    if (candles[idx].high >= calculatedSL) {
      trade.price = candles[idx].high;
      trade.date = candles[idx].date;
      console.log(colors.red('Exit strategy result: ' + JSON.stringify(trade)));
      return { result: true, trade: trade };
    }
    if (candles[idx].low <= calculatedTP) {
      trade.price = candles[idx].low;
      trade.date = candles[idx].date;
      console.log(colors.green('Exit strategy result: ' + JSON.stringify(trade)));
      return { result: true, trade: trade };
    }
  }

  return { result: false, trade: trade };
}

let getDescription = function () {
  return "The 'new' strategy. Considering the up down trend from day open to 9 o'clock."
}

export {
  enter,
  exit,
  getDescription
}