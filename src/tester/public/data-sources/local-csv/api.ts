import * as i from '../../../interfaces'

import moment from 'moment';
import store from '../../../../redux/store'
import Papa from 'papaparse'

let searchSymbol = async function (keywords: string) {
  let obj: i.ICommonSymbol = { symbol: 'local-csv-' + keywords, name: 'local-csv-name', type: 'local-csv-type', currency: 'local-csv-currency' };
  console.log('Symbols:', [obj]);
  return [obj];
}

let normalizeCandles = function (candles: Array<any>) {
  return candles.map(candle => {
    //console.log('localcsv candle timestamp:', candle['Local time']); // 24.04.2019 05:00:00.000 GMT+0300
    let obj: i.ICommonCandle = { date: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };

    obj.date = moment(candle['Local time'], "DD.MM.YYYY HH:mm:ss.SSS Z").toDate(); // 02.01.2019 01:00:00.000 GMT+0200
    obj.open = candle.Open;
    obj.high = candle.High;
    obj.low = candle.Low;
    obj.close = candle.Close;
    obj.volume = candle.Volume;

    return obj;
  });
}

let getCandles = function (symbol: string, period: number) {
  const results = Papa.parse(store.getState().dataSourceConfigs.localCsv, {
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