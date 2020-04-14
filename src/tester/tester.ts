import * as i from './interfaces'
import * as eventHandler from './event-handler'

let strategyInst: any;
let arrayOfCandles: Array<i.ICommonCandles>;
let defaultCandles: i.ICommonCandles;
let isEntered: boolean = false;
let openedTrade: i.ITesterTrade;
let trades: Array<i.ITesterTrade> = [];

let init = async function(strategy: any, allCandles: any) {
  isEntered = false;
  trades = [];
  arrayOfCandles = allCandles;
  defaultCandles = allCandles.filter((candles: i.ICommonCandles) => {
    return candles.isDefault === true;
  })[0];
  let path = 'public';
  if (process.env.REACT_APP_PUBLIC_STRATEGIES) {
    path = process.env.REACT_APP_PUBLIC_STRATEGIES.split(',').includes(strategy) ? 'public' : 'private';
  }
  strategyInst = await import('./' + path + '/strategies/' + strategy + '.ts');
  eventHandler.em.emit(eventHandler.TESTER_INITIALIZED);
}

let handleCandle = function (idx: number) {
  if (idx < defaultCandles.candles.length) {
    // Running strategy
    if (!isEntered) {
      let res: i.ITesterStrategyResult = strategyInst.enter(defaultCandles.candles, idx, arrayOfCandles);
      if (res.result === true) {
        //console.log('Entered order %O', res.trade);
        trades.push(res.trade);
        openedTrade = res.trade;
        isEntered = true;
      }
    } else {
      let res: i.ITesterStrategyResult = strategyInst.exit(defaultCandles.candles, idx, openedTrade, arrayOfCandles);
      if (res.result === true) {
        //console.log('Exited order %O', res.trade);
        trades.push(res.trade);
        isEntered = false;
      }
    }
    eventHandler.em.emit(eventHandler.CANDLE_HANDLED, { idx: idx });
  } else {
    eventHandler.em.emit(eventHandler.FINISHED, { trades: trades, configs: strategyInst.getConfigs() });
  }
}

export {
  init,
  handleCandle
};