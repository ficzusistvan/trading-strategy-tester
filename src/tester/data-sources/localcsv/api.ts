import * as i from '../../interfaces'

// DEBUGGING
import Debug from 'debug'
import moment from 'moment';
import store from '../../../redux/store'
import Papa from 'papaparse'
const debug = Debug('localcsv')

let searchSymbol = async function (keywords: string) {
  let obj: i.ICommonSymbol = { symbol: 'csv-' + keywords, name: 'csv-name', type: 'csv-type', currency: 'csv-currency' };
  debug('Symbols:', [obj]);
  return [obj];
}

let normalizeCandles = function (candles: Array<any>) {
  return candles.map(candle => {
    let obj: i.ICommonCandle = { date: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };

    obj.date = moment(candle['Local time']).toDate();
    obj.open = candle.Open;
    obj.high = candle.High;
    obj.low = candle.Low;
    obj.close = candle.Close;
    obj.volume = candle.Volume;

    return obj;
  });
}

let getCandles = function (symbol: string, period: number) {
  const results = Papa.parse(store.getState().testerConfigs.csv, {
    header: true
  });
  if (results.meta.aborted === false) {
    return normalizeCandles(results.data);
  } else {
    console.log('getCandles failed');
    return [];
  }
}

export {
  searchSymbol,
  getCandles
}