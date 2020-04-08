import * as i from '../../interfaces'

// DEBUGGING
import Debug from 'debug'
import moment from 'moment';
import store from '../../../redux/store'
import axios from 'axios';
const debug = Debug('my-rest-api')

let searchSymbol = async function (keywords: string) {
  let obj: i.ICommonSymbol = { symbol: 'my-rest-api-' + keywords, name: 'my-rest-api-name', type: 'my-rest-api-type', currency: 'my-rest-api-currency' };
  debug('Symbols:', [obj]);
  return [obj];
}

let normalizeCandles = function (candles: Array<any>) {
  return candles.map(candle => {
    console.log('myrestapi candle timestamp:', candle.date); // 1586318100000
    let obj: i.ICommonCandle = { date: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };

    obj.date = moment(candle.date).toDate();
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