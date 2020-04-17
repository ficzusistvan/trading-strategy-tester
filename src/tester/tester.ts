import * as i from './interfaces'
import * as eventHandler from './event-handler'
import store from '../redux/store'

let strategyInst: any;
let arrayOfCandles: Array<i.ICommonCandles>;
let defaultCandles: i.ICommonCandles;
let isEntered: boolean = false;
let trades: Array<i.ITesterTrade> = [];
let balance = store.getState().testerConfigs.initBalance;

let init = async function (strategy: any, allCandles: any) {
  isEntered = false;
  trades = [];
  arrayOfCandles = allCandles;
  const filteredCandles = allCandles.filter((candles: i.ICommonCandles) => {
    return candles.isDefault === true;
  });
  if (filteredCandles.length > 0) {
    defaultCandles = filteredCandles[0];
  } else {
    defaultCandles = allCandles[0]; // default if none is selected
  }
  let path = 'public';
  if (process.env.REACT_APP_PUBLIC_STRATEGIES) {
    path = process.env.REACT_APP_PUBLIC_STRATEGIES.split(',').includes(strategy) ? 'public' : 'private';
  }
  strategyInst = await import('./' + path + '/strategies/' + strategy + '.ts');
  const insInfo: i.ICommonInstrumentBasicInfo = {
    currencyPrice: store.getState().testerConfigs.currencyPrice,
    leverage: store.getState().testerConfigs.leverage,
    nominalValue: store.getState().testerConfigs.nominalValue
  };
  strategyInst.init(insInfo);
  eventHandler.em.emit(eventHandler.TESTER_INITIALIZED);
}

let handleCandle = function (idx: number) {
  if (idx < defaultCandles.candles.length) {
    // Running strategy
    if (!isEntered) {
      let res: boolean = strategyInst.enter(defaultCandles.candles, idx, arrayOfCandles, balance);
      if (res === true) {
        //console.log('Entered order %O', res.trade);
        isEntered = true;
      }
    } else {
      let res: boolean = strategyInst.exit(defaultCandles.candles, idx, arrayOfCandles);
      if (res === true) {
        //console.log('Exited order %O', res.trade);
        const trade: i.ITesterTrade = strategyInst.getTrade();
        trades.push(trade);
        balance += trade.exit.profit;
        isEntered = false;
      }
    }
    eventHandler.em.emit(eventHandler.CANDLE_HANDLED, { idx: idx });
  } else {
    eventHandler.em.emit(eventHandler.FINISHED, { trades: trades, balance: balance });
  }
}

export {
  init,
  handleCandle
};