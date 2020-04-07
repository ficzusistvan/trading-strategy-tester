import * as i from '../../interfaces'

// DEBUGGING
import Debug from 'debug'
import moment from 'moment';
import store from '../../../redux/store'
import axios from 'axios';
const debug = Debug('myrestapi')

let searchSymbol = async function (keywords: string) {
  let obj: i.ICommonSymbol = { symbol: 'rest-api-' + keywords, name: 'rest-api-name', type: 'rest-api-type', currency: 'rest-api-currency' };
  debug('Symbols:', [obj]);
  return [obj];
}

let normalizeCandles = function (candles: Array<any>) {
  return candles.map(candle => {
    console.log('myrestapi candle timestamp:', candle.date); // 24.04.2019 05:00:00.000 GMT+0300
    let obj: i.ICommonCandle = { date: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };

    obj.date = moment(candle.date).toDate(); // 02.01.2019 01:00:00.000 GMT+0200
    obj.open = candle.open;
    obj.high = candle.high;
    obj.low = candle.low;
    obj.close = candle.close;
    obj.volume = candle.volume;

    return obj;
  });
}

let getCandles = async function (symbol: string, period: number) {
  const resp = await axios.get(store.getState().testerConfigs.myRestApiUrl);
  if (resp.status === 200) {
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