// GENERAL DEPENDENCIES
import axios from 'axios'

import * as i from '../../interfaces'

// DEBUGGING
import Debug from 'debug'
import moment from 'moment';
const debug = Debug('finnhub')

const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;

let normalizeSymbols = function (symbols: Array<i.IStockSymbol>) {
  return symbols.map(symbol => {
    let obj: i.ISymbol = { symbol: '', name: '', type: '', currency: '' };
    obj.symbol = symbol.symbol;
    obj.name = symbol.description;
    obj.type = symbol.description;
    obj.currency = symbol.description;
    return obj;
  });
}

let searchSymbol = async function (keywords: string) {
  const resp = await axios.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=' + API_KEY);
  debug('searchSymbol', resp.data);
  return normalizeSymbols(resp.data);
}

let normalizeCandles = function (candles: i.IStockData) {
  const parsed = [];

  for (let i = 0; i < candles.t.length; i++) {
    let obj: i.ICandle = { date: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };

    obj.date = moment(candles.t[i]).toDate();
    obj.open = candles.o[i];
    obj.high = candles.h[i];
    obj.low = candles.l[i];
    obj.close = candles.c[i];
    obj.volume = candles.v[i];

    parsed.unshift(obj);
  }
  return parsed;
}

let getCandles = async function (symbol: string, period: number) {
  const count = 259200;
  const url = 'https://finnhub.io/api/v1/stock/candle?symbol=' + symbol + '&resolution=' + period + '&count=' + count + '&token=' + API_KEY;
  debug('Stock Candles', url);
  const resp = await axios.get(url);
  debug('Stock Candles', resp.data);
  if (resp.data.s === "ok") {
    return normalizeCandles(resp.data);
  } else {
    console.log('getCandles failed');
    return [];
  }
}

export {
  searchSymbol,
  getCandles
}