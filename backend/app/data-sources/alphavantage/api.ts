// GENERAL DEPENDENCIES
import axios from 'axios'
import nconf from 'nconf'
nconf.file({
  file: 'config.json',
  search: true
});

import * as i from '../../interfaces'

// DEBUGGING
import Debug from 'debug'
import moment from 'moment';
const debug = Debug('avapi')

const API_KEY = nconf.get('alphavantage:api_key');

let normalizeSymbols = function (symbols: Array<i.IBestMatch>) {
  return symbols.map(symbol => {
    let obj: i.ISymbol = { symbol: '', name: '', type: '', currency: '' };
    obj.symbol = symbol['1. symbol'];
    obj.name = symbol['2. name'];
    obj.type = symbol['3. type'];
    obj.currency = symbol['8. currency'];
    return obj;
  });
}

let searchSymbol = async function (keywords: string) {
  const resp = await axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keywords + '&apikey=' + API_KEY);
  debug('searchSymbol', resp.data);
  return normalizeSymbols(resp.data.bestMatches);
}

let normalizeCandles = function (candles: Array<i.ITimeSeries>) {
  const parsed = [];

  for (let [key2, value2] of Object.entries(candles)) {
    let obj: i.ICandle = { date: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };

    obj.date = moment(key2).toDate();
    obj.open = value2['1. open'];
    obj.high = value2['2. high'];
    obj.low = value2['3. low'];
    obj.close = value2['4. close'];
    obj.volume = value2['5. volume'];

    parsed.unshift(obj);
  }
  return parsed;
}

let getCandles = async function (symbol: string, period: number) {
  let url;
  if (period < 61) {
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=' + period + 'min&apikey=' + API_KEY;
  } else {
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&apikey=' + API_KEY;
  }
  debug('getTimeSeriesIntraday', url);
  const resp = await axios.get(url);
  debug('getTimeSeriesIntraday', resp.data);
  for (let [key1, value1] of Object.entries(resp.data)) {
    if (key1.includes('Time Series')) {
      return normalizeCandles(value1 as Array<i.ITimeSeries>);
    }
  }
}

export {
  searchSymbol,
  getCandles
}