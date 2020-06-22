import axios from 'axios'
import * as helpers from '../../../helpers'
import * as i from '../../../interfaces'

const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;

let normalizeSymbols = function (symbols: Array<i.IFinnhubStockSymbol>) {
  return symbols.map(symbol => {
    let obj: i.ICommonSymbol = { symbol: '', name: '', type: '', currency: '' };
    obj.symbol = symbol.symbol;
    obj.name = symbol.description;
    obj.type = symbol.description;
    obj.currency = symbol.description;
    return obj;
  });
}

let searchSymbol = async function (keywords: string) {
  const exchanges = await axios.get('https://finnhub.io/api/v1/stock/exchange?token=boqnodnrh5rbk6e6gaf0');
  console.log('exchanges', exchanges.data);
  let allSymbols: Array<i.ICommonSymbol> = [];
  for (const exchange of exchanges.data) {
    let symbols = await axios.get('https://finnhub.io/api/v1/stock/symbol?exchange=' + exchange.code + '&token=' + API_KEY);
    console.log('symbols', symbols.data);
    const filteredSymbols: Array<i.ICommonSymbol> = helpers.applySearchterm(normalizeSymbols(symbols.data), keywords);
    allSymbols = allSymbols.concat(filteredSymbols);
  }
  console.log('searchSymbol', allSymbols);
  return allSymbols;
}

let normalizeCandles = function (candles: i.IFinnhubStockData) {
  const parsed = [];

  for (let i = 0; i < candles.t.length; i++) {
    console.log('finnhub candle timestamp:', candles.t[i]); // 1585747800. Ok with doc example...
    let obj: i.ICommonCandle = { date: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };

    obj.date = candles.t[i]; // UNIX timestamp. e.g.: 1569297600
    obj.open = candles.o[i];
    obj.high = candles.h[i];
    obj.low = candles.l[i];
    obj.close = candles.c[i];
    obj.volume = candles.v[i];

    parsed.push(obj);
  }
  return parsed;
}

let getCandles = async function (symbol: string, period: number) {
  const count = 259200;
  const url = 'https://finnhub.io/api/v1/stock/candle?symbol=' + symbol + '&resolution=' + period + '&count=' + count + '&token=' + API_KEY;
  console.log('Stock Candles', url);
  const resp = await axios.get(url);
  console.log('Stock Candles', resp.data);
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