//import moment from 'moment';
import * as i from './../interfaces';

import Debug from 'debug'
const debug = Debug('test02')

const TAKE_PROFIT = 15;
const STOP_LOSS = -40;

let enter = function (candles: Array<i.ICandle>, idx: number): i.IStrategyResult {

  debug('Handling candle: %O', candles[idx]);
  let trade: i.ITrade = { price: 0, side: i.ESide.NONE, date: '' };
  let result: boolean = false;
  if (idx > 2) {
    const prev1Candle = candles[idx - 1];
    const prev2Candle = candles[idx - 2];
    const prev3Candle = candles[idx - 3];
    if (prev1Candle.open < prev1Candle.close && prev2Candle.open < prev2Candle.close && prev3Candle.open < prev3Candle.close) {
      // price is rising fast, expect fall
      trade.price = candles[idx].open;
      trade.date = candles[idx].date;
      trade.side = i.ESide.SELL;
      result = true;
    }
    if (prev1Candle.open > prev1Candle.close && prev2Candle.open > prev2Candle.close && prev3Candle.open > prev3Candle.close) {
      // price is falling fast, expect rise
      trade.price = candles[idx].open;
      trade.date = candles[idx].date;
      trade.side = i.ESide.BUY;
      result = true;
    }
  }
  debug('Enter strategy result: %O', trade);

  return { result: result, trade: trade };
}

let exit = function (candles: Array<i.ICandle>, idx: number, openedTrade: i.ITrade): i.IStrategyResult {

  let trade: i.ITrade = { price: 0, side: i.ESide.NONE, date: '' };
  let result: boolean = false;

  let curPrice = candles[idx].open;
  let diff = curPrice - openedTrade.price;
  if (openedTrade.side === i.ESide.BUY) {
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
  } else if (openedTrade.side === i.ESide.SELL) {
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

export {
  enter,
  exit
}