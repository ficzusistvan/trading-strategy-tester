import axios from 'axios'
import * as i from '../../../interfaces'

const API_KEY = process.env.REACT_APP_ALPHAVANTAGE_API_KEY;

let normalizeSymbols = function (symbols: Array<i.IAVBestMatch>) {
  return symbols.map(symbol => {
    let obj: i.ICommonSymbol = { symbol: '', name: '', type: '', currency: '' };
    obj.symbol = symbol['1. symbol'];
    obj.name = symbol['2. name'];
    obj.type = symbol['3. type'];
    obj.currency = symbol['8. currency'];
    return obj;
  });
}

let searchSymbol = async function (keywords: string) {
  const resp = await axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keywords + '&apikey=' + API_KEY);
  console.log('searchSymbol', resp.data);
  return normalizeSymbols(resp.data.bestMatches);
}

let normalizeCandles = function (candles: Array<i.IAVTimeSeries>, timeZone: string) {
  const parsed = [];

  for (let [key2, value2] of Object.entries(candles)) {
    console.log('alphavantage candle timestamp:', key2); // "2020-03-31 14:15:00". Ok with doc!
    let obj: i.ICommonCandle = { date: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };

    obj.date = key2; // voodoo
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
  console.log('getTimeSeriesIntraday', url);
  const resp = await axios.get(url);
  console.log('getTimeSeriesIntraday', resp.data);
  const timeZone = resp.data['Meta Data']['6. Time Zone'];
  console.log('Using timezone', timeZone);
  for (let [key1, value1] of Object.entries(resp.data)) {
    if (key1.includes('Time Series')) {
      return normalizeCandles(value1 as Array<i.IAVTimeSeries>, timeZone);
    }
  }
}

export {
  searchSymbol,
  getCandles
}