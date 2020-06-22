import * as i from './../../interfaces';
import * as helpers from '../../helpers';
var colors = require('colors/safe');
colors.enable();

let instrumentInfo: i.ICommonInstrumentBasicInfo = { currencyPrice: 1, leverage: 1, nominalValue: 1 };
let marginToBalancePercent: number = 100;
let entr: i.ITesterEnter;
let exiit: i.ITesterExit;

const STOP_LOSS: number = -60;
const TAKE_PROFIT: number = 20;

let init = function (insInfo: i.ICommonInstrumentBasicInfo, mToBPercent: number) {
  instrumentInfo = insInfo;
  marginToBalancePercent = mToBPercent;
}

let runTA = function (candles: Array<i.ICommonCandle>) {
}

let enter = function (candles: Array<i.ICommonCandle>, idx: number, arrayOfCandles: Array<i.ICommonCandles>, balance: number): boolean {

  console.log('Handling candle: %O', candles[idx]);
  if (candles[idx].date == 9 && candles[idx].date == 5) {
    const openPrice: number = candles[idx].open;
    const prevCandle = candles[idx - 1];

    const diff = candles[idx].open - prevCandle.close;
    let side: i.ETesterSide;
    if (diff > 0) {
      side = i.ETesterSide.BUY;
    } else {
      side = i.ETesterSide.SELL;
    }
    const cVolume = helpers.calculateMaxVolume(balance, marginToBalancePercent, openPrice, instrumentInfo.currencyPrice, instrumentInfo.leverage, instrumentInfo.nominalValue);
    const cPip = helpers.calculatePip(cVolume, instrumentInfo.currencyPrice, instrumentInfo.nominalValue);
    const cMargin = helpers.calculateMargin(cPip, openPrice, instrumentInfo.leverage);

    entr = {
      side: side,
      openPrice: openPrice,
      openDate: candles[idx].date,
      volume: cVolume,
      pip: cPip,
      openMargin: cMargin
    }

    console.log(colors.blue('Enter strategy: ' + JSON.stringify(entr)));
    return true;
  }

  return false;
}

let exit = function (candles: Array<i.ICommonCandle>, idx: number, arrayOfCandles: Array<i.ICommonCandles>, balance: number): boolean {

  const curHighPrice: number = candles[idx].high;
  const curLowPrice: number = candles[idx].low;
  if (entr.side === i.ETesterSide.BUY) {
    if (curHighPrice - entr.openPrice > TAKE_PROFIT) {
      const profit = (curHighPrice - entr.openPrice) * entr.pip;
      exiit = {
        closePrice: curHighPrice,
        closeDate: candles[idx].date,
        profit: profit,
        newBalance: balance + profit
      }
      console.log(colors.blue('Exit strategy: ' + JSON.stringify(exiit)));
      return true;
    }
    if (curLowPrice - entr.openPrice < STOP_LOSS) {
      const profit = (curLowPrice - entr.openPrice) * entr.pip;
      exiit = {
        closePrice: curLowPrice,
        closeDate: candles[idx].date,
        profit: profit,
        newBalance: balance + profit
      }
      console.log(colors.blue('Exit strategy: ' + JSON.stringify(exiit)));
      return true;
    }
  }
  if (entr.side === i.ETesterSide.SELL) {
    if (entr.openPrice - curLowPrice > TAKE_PROFIT) {
      const profit = (entr.openPrice - curLowPrice) * entr.pip;
      exiit = {
        closePrice: curLowPrice,
        closeDate: candles[idx].date,
        profit: profit,
        newBalance: balance + profit
      }
      console.log(colors.blue('Exit strategy: ' + JSON.stringify(exiit)));
      return true;
    }
    if (entr.openPrice - curHighPrice > STOP_LOSS) {
      const profit = (entr.openPrice - curHighPrice) * entr.pip;
      exiit = {
        closePrice: curHighPrice,
        closeDate: candles[idx].date,
        profit: profit,
        newBalance: balance + profit
      }
      console.log(colors.blue('Exit strategy: ' + JSON.stringify(exiit)));
      return true;
    }
  }

  return false;
}

let getTrade = function (): i.ITesterTrade {
  return { enter: entr, exit: exiit };
}

let getDescription = function () {
  return "First strategy ever! Entering trade at 9:05."
}

let getConfigs = function () {
  return { 'STOP LOSS': STOP_LOSS, 'TAKE PROFIT': TAKE_PROFIT }
}

export {
  init,
  runTA,
  enter,
  exit,
  getTrade,
  getDescription,
  getConfigs
}