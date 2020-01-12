import * as i from './interfaces'
import path from 'path'
import fs from 'fs'

// DEBUGGING
import Debug from 'debug'
const debug = Debug('data-source')

import { logger } from './logger'

let dataSourceInst: any;

let getSources = function () {
  const dirPath = path.join(__dirname, 'data-sources');
  return new Promise((resolve, reject) => {
    const files = fs.readdirSync(dirPath)
      .map(file => path.join(dirPath, file))
      .filter(path => fs.statSync(path).isDirectory());
    const dirNames = files.map(file => file.split(path.sep).pop());
    resolve(dirNames);
  })
}

let setSource = async function (source: string) {
  dataSourceInst = await import('./data-sources/' + source + '/api');
  debug('dataSourceInst', dataSourceInst);
}

let getCandles = async function (symbol: string, period: number): i.ICandles {
  const candles: i.ICandles = await dataSourceInst.getCandles(symbol, period);
  debug('Candles', candles);
  return candles;
}

export {
  getSources,
  setSource,
  getCandles
}