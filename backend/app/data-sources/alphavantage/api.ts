// GENERAL DEPENDENCIES
import axios from 'axios'

// DEBUGGING
import Debug from 'debug'
const debug = Debug('avapi')

let searchSymbol = async function(keywords: string, apiKey: string) {
  const resp = await axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keywords + '&apikey=' + apiKey);
  debug('searchSymbol', resp.data);
  return resp.data;
}

let getTimeSeriesIntraday = async function(symbol: string, interval: string, apiKey: string) {
  const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=' + interval + '&apikey=' + apiKey;
  debug('getTimeSeriesIntraday', url);
  const resp = await axios.get(url);
  debug('getTimeSeriesIntraday', resp.data);
  return resp.data;
}

export {
  searchSymbol,
  getTimeSeriesIntraday
}