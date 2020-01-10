// GENERAL DEPENDENCIES
import axios from 'axios'
import nconf from 'nconf'
nconf.file({
  file: 'config.json',
  search: true
});

// DEBUGGING
import Debug from 'debug'
const debug = Debug('avapi')

const API_KEY = nconf.get('alphavantage:api_key');

let searchSymbol = async function(keywords: string) {
  const resp = await axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keywords + '&apikey=' + API_KEY);
  debug('searchSymbol', resp.data);
  return resp.data;
}

let getCandles = async function(symbol: string, period: number) {
  let url;
  if (period < 61 ) {
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=' + period + 'min&apikey=' + API_KEY;
  } else {
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&apikey=' + API_KEY;
  }
  debug('getTimeSeriesIntraday', url);
  const resp = await axios.get(url);
  debug('getTimeSeriesIntraday', resp.data);
  return resp.data;
}

export {
  searchSymbol,
  getCandles
}