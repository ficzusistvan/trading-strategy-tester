import * as i from './interfaces'
import * as eventHandler from './event-handler'
import store from '../redux/store'
import Big from 'big.js';

let strategyInst: any;
let arrayOfCandles: Array<i.ICommonCandles>;
let defaultCandles: i.ICommonCandles;
let isEntered: boolean = false;
let trades: Array<i.ITesterTrade> = [];
let balance: Big;
let chartMainCandles: Array<i.IChartMainCandle> = [];
let isVolumeZero: boolean;

let init = async function (strategy: any, allCandles: any) {
  isEntered = false;
  trades = [];
  balance = Big(store.getState().testerConfigs.initBalance);
  console.log('Init balance:', balance.toFixed(2));
  chartMainCandles = [];
  isVolumeZero = false;
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
    currencyPrice: Big(store.getState().dataSourceConfigs.currencyPrice),
    leverage: Big(store.getState().dataSourceConfigs.leverage),
    nominalValue: Big(store.getState().dataSourceConfigs.nominalValue)
  };
  strategyInst.init(insInfo, 
    store.getState().testerConfigs.marginToBalancePercent,
    store.getState().testerConfigs.dayTimeSpread,
    store.getState().testerConfigs.nightTimeSpread,
    store.getState().testerConfigs.lotSize
    );
  strategyInst.runTA(defaultCandles.candles);
  eventHandler.em.emit(eventHandler.TESTER_INITIALIZED);
}

let handleCandle = function (idx: number) {
  if (idx < defaultCandles.candles.length) {
    let curCandle: i.IChartMainCandle = { ...defaultCandles.candles[idx], ...{ text: '' } };
    // Running strategy
    if (!isEntered) {
      let res: boolean = strategyInst.enter(defaultCandles.candles, idx, arrayOfCandles, balance);
      if (res === true) {
        //console.log('Entered order %O', res.trade);
        isEntered = true;
        const trade: i.ITesterTrade = strategyInst.getTrade();
        curCandle.text = trade.enter.side === i.ETesterSide.BUY ? 'b' : 's';
        // Stop strategy if not enough money
        if (trade.enter.volume.eq(0)) {
          isVolumeZero = true;
        }
      }
    } else {
      let res: boolean = strategyInst.exit(defaultCandles.candles, idx, arrayOfCandles, balance);
      if (res === true) {
        //console.log('Exited order %O', res.trade);
        const trade: i.ITesterTrade = strategyInst.getTrade();
        trades.push(trade);
        balance = Big(trade.exit.newBalance);
        isEntered = false;
        console.log('New balance:', balance.toFixed(2));
        if (trade.exit.profit.gt(0)) {
          curCandle.text = 'ep';
        } else if (trade.exit.profit.lt(0)) {
          curCandle.text = 'en';
        } else {
          curCandle.text = 'ez';
        }
      }
    }
    chartMainCandles.push(curCandle);
    if (!isVolumeZero) {
      eventHandler.em.emit(eventHandler.CANDLE_HANDLED, { idx: idx });
    } else {
      eventHandler.em.emit(eventHandler.FINISHED, { trades: trades, balance: balance, chartMainCandles: chartMainCandles, reason: 'Money not enough' });
    }
  } else {
    eventHandler.em.emit(eventHandler.FINISHED, { trades: trades, balance: balance, chartMainCandles: chartMainCandles, reason: 'All candles handled' });
  }
}

export {
  init,
  handleCandle
};