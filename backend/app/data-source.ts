import * as i from './interfaces'

// DEBUGGING
import Debug from 'debug'
const debug = Debug('data-source')

let dataSourceInst: any;

let setSource = async function(source: string) {
  dataSourceInst = await import('./data-sources/' + source + '/api');
  debug('dataSourceInst', dataSourceInst);
}

let getCandles = async function(symbol: string, period: number): i.ICandles {
  const candles: i.ICandles = await dataSourceInst.getCandles(symbol, period);
  debug('Candles', candles);
  return candles;
}

export {
  setSource,
  getCandles
}