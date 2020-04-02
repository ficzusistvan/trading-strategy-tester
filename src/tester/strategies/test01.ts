import moment from 'moment';
//import moment from 'moment-timezone';
import * as i from './../interfaces';

import Debug from 'debug'
const debug = Debug('test01')

const TAKE_PROFIT = 20;
const STOP_LOSS = -60;

let enter = function (candles: Array<i.ICommonCandle>, idx: number): i.ITesterStrategyResult {
  
  debug('Handling candle: %O', candles[idx]);
  let trade: i.ITesterTrade = { price: 0, side: i.ETesterSide.NONE, date: '' };
  let result: boolean = false;
  if (moment(candles[idx].date).hour() === 9 && moment(candles[idx].date).minute() === 5) {
    const prevCandle = candles[idx - 1];
    trade.price = candles[idx].open;
    trade.date = candles[idx].date;
    if (prevCandle.open > prevCandle.close) {
      trade.side = i.ETesterSide.BUY;
    } else {
      trade.side = i.ETesterSide.SELL;
    }
    result = true;
    debug('Enter strategy result: %O', trade);
  }

  return { result: result, trade: trade };
}

let exit = function (candles: Array<i.ICommonCandle>, idx: number, openedTrade: i.ITesterTrade): i.ITesterStrategyResult {

  let trade: i.ITesterTrade = { price: 0, side: i.ETesterSide.NONE, date: '' };
  let result: boolean = false;

  let curPrice = candles[idx].open;
  let diff = curPrice - openedTrade.price;
  if (openedTrade.side === i.ETesterSide.BUY) {
    if (diff < STOP_LOSS || diff > TAKE_PROFIT) {
      trade.price = curPrice;
      trade.date = candles[idx].date;
      result = true;
      debug('Exit strategy result: %O', trade);
      return { result: result, trade: trade };
    }

    curPrice = candles[idx].high;
    diff = curPrice - openedTrade.price;
    if (diff < STOP_LOSS || diff > TAKE_PROFIT) {
      trade.price = curPrice;
      trade.date = candles[idx].date;
      result = true;
      debug('Exit strategy result: %O', trade);
      return { result: result, trade: trade };
    }

    curPrice = candles[idx].low;
    diff = curPrice - openedTrade.price;
    if (diff < STOP_LOSS || diff > TAKE_PROFIT) {
      trade.price = curPrice;
      trade.date = candles[idx].date;
      result = true;
      debug('Exit strategy result: %O', trade);
      return { result: result, trade: trade };
    }

    curPrice = candles[idx].close;
    diff = curPrice - openedTrade.price;
    if (diff < STOP_LOSS || diff > TAKE_PROFIT) {
      trade.price = curPrice;
      trade.date = candles[idx].date;
      result = true;
      debug('Exit strategy result: %O', trade);
      return { result: result, trade: trade };
    }
  } else if (openedTrade.side === i.ETesterSide.SELL) {
    if (diff > (STOP_LOSS * -1) || diff < (TAKE_PROFIT * -1)) {
      trade.price = curPrice;
      trade.date = candles[idx].date;
      result = true;
      debug('Exit strategy result: %O', trade);
      return { result: result, trade: trade };
    }

    curPrice = candles[idx].high;
    diff = curPrice - openedTrade.price;
    if (diff > (STOP_LOSS * -1) || diff < (TAKE_PROFIT * -1)) {
      trade.price = curPrice;
      trade.date = candles[idx].date;
      result = true;
      debug('Exit strategy result: %O', trade);
      return { result: result, trade: trade };
    }

    curPrice = candles[idx].low;
    diff = curPrice - openedTrade.price;
    if (diff > (STOP_LOSS * -1) || diff < (TAKE_PROFIT * -1)) {
      trade.price = curPrice;
      trade.date = candles[idx].date;
      result = true;
      debug('Exit strategy result: %O', trade);
      return { result: result, trade: trade };
    }

    curPrice = candles[idx].close;
    diff = curPrice - openedTrade.price;
    if (diff > (STOP_LOSS * -1) || diff < (TAKE_PROFIT * -1)) {
      trade.price = curPrice;
      trade.date = candles[idx].date;
      result = true;
      debug('Exit strategy result: %O', trade);
      return { result: result, trade: trade };
    }
  } else {
    // Shouldn't happen
  }

  return { result: result, trade: trade };
}

let getDescription = function() {
  return "First strategy ever! 9:05 open time!"
}

export {
  enter,
  exit,
  getDescription
}