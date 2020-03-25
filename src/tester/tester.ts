import Debug from 'debug'
import * as i from './interfaces'
import * as eventHandler from './event-handler'

const debug = Debug('tester')

let strategyInst: any;
let arrayOfCandles: Array<i.IMyCandles>;
let defaultCandles: i.IMyCandles;
let isEntered: boolean = false;
let openedTrade: i.ITrade;
let trades: Array<i.ITrade> = [];

let init = async function(strategy: any, allCandles: any) {
  isEntered = false;
  trades = [];
  arrayOfCandles = allCandles;
  defaultCandles = allCandles.filter((candles: i.IMyCandles) => {
    return candles.isDefault === true;
  })[0];
  strategyInst = await import('./strategies/' + strategy + '.ts');
  eventHandler.em.emit(eventHandler.TESTER_INITIALIZED);
}

let handleCandle = function (idx: number) {
  debug('Handling candle idx [' + idx + ']');
  if (idx < defaultCandles.candles.length) {
    // Running strategy
    if (!isEntered) {
      let res: i.IStrategyResult = strategyInst.enter(defaultCandles.candles, idx);
      if (res.result === true) {
//        logger.info('Entered order %O', res.trade);
        trades.push(res.trade);
        openedTrade = res.trade;
        isEntered = true;
      }
    } else {
      let res: i.IStrategyResult = strategyInst.exit(defaultCandles.candles, idx, openedTrade);
      if (res.result === true) {
//        logger.info('Exited order %O', res.trade);
        trades.push(res.trade);
        isEntered = false;
      }
    }
    eventHandler.em.emit(eventHandler.CANDLE_HANDLED, { idx: idx });
  } else {
    eventHandler.em.emit(eventHandler.FINISHED, { trades: trades });
  }
}

export {
  init,
  handleCandle
};