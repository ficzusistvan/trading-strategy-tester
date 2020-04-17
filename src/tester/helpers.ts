import * as i from './interfaces';
import moment from 'moment-timezone';

export let applySearchterm = function (symbols: Array<i.ICommonSymbol>, keyword: string) {
  return symbols.filter(symbol => {
    return symbol.symbol.includes(keyword) || symbol.name.includes(keyword);
  });
}

export let searchFirstCandleInDay = function (date: moment.Moment, candles: Array<i.ICommonCandle>): i.ICommonCandle | null {
  for (let i = 0; i < candles.length; i++) {
    if (date.isSame(candles[i].date, "day")) {
      return candles[i];
    }
  }
  return null;
}

export let getPrevDayMinMaxDiff = function (date: moment.Moment, candles: Array<i.ICommonCandle>) {
  let mdate = date.subtract(1, 'day');
  if (mdate.isoWeekday() === 7) {
    mdate = mdate.subtract(2, 'day');
  }
  if (mdate.isoWeekday() === 6) {
    mdate = mdate.subtract(1, 'day');
  }
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < candles.length; i++) {
    if (mdate.isSame(candles[i].date, "day")) {
      let curLow = Number(candles[i].low);
      if (curLow < min) {
        min = curLow;
      }
      let curHigh = Number(candles[i].high);
      if (curHigh > max) {
        max = curHigh;
      }
    }
  }
  //return (max - min);
  return 240;
}

export let calculateMaxVolume = function (balance: number, price: number, currencyPrice: number, leverage: number, nominalValue: number): number {
  const volume = Math.floor(balance / (price * currencyPrice * (1 / leverage) * nominalValue) * 100) / 100;
  return volume;
}

export let calculatePip = function (volume: number, currencyPrice: number, nominalValue: number): number {
  const pip = volume * currencyPrice * nominalValue;
  return pip;
}

export let calculateMargin = function (pip: number, price: number, leverage: number): number {
  const margin = pip * price * (1 / leverage);
  return margin;
}