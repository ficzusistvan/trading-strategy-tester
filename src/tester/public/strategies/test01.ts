import moment from 'moment';
//import moment from 'moment-timezone';
import * as i from './../../interfaces';
import * as helpers from '../../helpers';
import Big from 'big.js';
var colors = require('colors/safe');
colors.enable();

let instrumentInfo: i.ICommonInstrumentBasicInfo = { currencyPrice: Big(1), leverage: Big(1), nominalValue: Big(1) };
let marginToBalancePercent: Big = Big(100);
let entr: i.ITesterEnter;
let exiit: i.ITesterExit;

const STOP_LOSS: Big = Big(-60);
const TAKE_PROFIT: Big = Big(20);

let init = function (insInfo: i.ICommonInstrumentBasicInfo, mToBPercent: Big) {
  instrumentInfo = insInfo;
  marginToBalancePercent = mToBPercent;
}

let enter = function (candles: Array<i.ICommonCandle>, idx: number, arrayOfCandles: Array<i.ICommonCandles>, balance: Big): boolean {

  console.log('Handling candle: %O', candles[idx]);
  if (moment(candles[idx].date).hour() === 9 && moment(candles[idx].date).minute() === 5) {
    const openPrice: Big = Big(candles[idx].open);
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

let exit = function (candles: Array<i.ICommonCandle>, idx: number, arrayOfCandles: Array<i.ICommonCandles>, balance: Big): boolean {

  const curHighPrice: Big = Big(candles[idx].high);
  const curLowPrice: Big = Big(candles[idx].low);
  if (entr.side === i.ETesterSide.BUY) {
    if (curHighPrice.minus(entr.openPrice) > TAKE_PROFIT) {
      const profit = (curHighPrice.minus(entr.openPrice)).mul(entr.pip);
      exiit = {
        closePrice: curHighPrice,
        closeDate: candles[idx].date,
        profit: profit,
        newBalance: balance.plus(profit).toFixed(2)
      }
      console.log(colors.blue('Exit strategy: ' + JSON.stringify(exiit)));
      return true;
    }
    if (curLowPrice.minus(entr.openPrice) < STOP_LOSS) {
      const profit = (curLowPrice.minus(entr.openPrice)).mul(entr.pip);
      exiit = {
        closePrice: curLowPrice,
        closeDate: candles[idx].date,
        profit: profit,
        newBalance: balance.plus(profit).toFixed(2)
      }
      console.log(colors.blue('Exit strategy: ' + JSON.stringify(exiit)));
      return true;
    }
  }
  if (entr.side === i.ETesterSide.SELL) {
    if (entr.openPrice.minus(curLowPrice) > TAKE_PROFIT) {
      const profit = (entr.openPrice.minus(curLowPrice)).mul(entr.pip);
      exiit = {
        closePrice: curLowPrice,
        closeDate: candles[idx].date,
        profit: profit,
        newBalance: balance.plus(profit).toFixed(2)
      }
      console.log(colors.blue('Exit strategy: ' + JSON.stringify(exiit)));
      return true;
    }
    if (entr.openPrice.minus(curHighPrice) > STOP_LOSS) {
      const profit = (entr.openPrice.minus(curHighPrice)).mul(entr.pip);
      exiit = {
        closePrice: curHighPrice,
        closeDate: candles[idx].date,
        profit: profit,
        newBalance: balance.plus(profit).toFixed(2)
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
  enter,
  exit,
  getTrade,
  getDescription,
  getConfigs
}