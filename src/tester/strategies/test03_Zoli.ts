import moment from 'moment';
//import moment from 'moment-timezone';
import * as i from './../interfaces';

import Debug from 'debug'
const debug = Debug('test03_Zoli')

const TAKE_PROFIT = 20;
const STOP_LOSS = -60;

let searchFirstCandleInDay = function (date: moment.Moment, candles: Array<i.ICommonCandle>): i.ICommonCandle | null {
  for (let i = 0; i < candles.length; i++) {
    if (date.isSame(candles[i].date, "day")) {
      return candles[i];
    }
  }
  return null;
}

let enter = function (candles: Array<i.ICommonCandle>, idx: number): i.ITesterStrategyResult {

  debug('Handling candle: %O', candles[idx]);
  let trade: i.ITesterTrade = { price: 0, side: i.ETesterSide.NONE, date: '' };
  let result: boolean = false;

  if (moment(candles[idx].date).hour() === 9 && moment(candles[idx].date).minute() === 0) {
    const firstCandleInDay = searchFirstCandleInDay(moment(candles[idx].date), candles);
    console.log('First candle in day %O', firstCandleInDay);
    if (firstCandleInDay !== null) {
      trade.price = candles[idx].open;
      trade.date = candles[idx].date;
      const diff = candles[idx].open - firstCandleInDay.open;
      if (diff > 0) {
        trade.side = i.ETesterSide.BUY;
      } else {
        trade.side = i.ETesterSide.SELL;
      }
      result = true;
      debug('Enter strategy result: %O', trade);
    }
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

export {
  enter,
  exit
}