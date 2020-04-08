import Emittery from 'emittery';
import * as tester from './tester'
import store from '../redux/store'
import { setIsTestFinished, setTrades } from '../redux/actions/testerResults';

export const em = new Emittery(); // export as soon as possible. See: https://coderwall.com/p/myzvmg/circular-dependencies-in-node-js

export const START = 'START';
export const TESTER_INITIALIZED = 'TESTER_INITIALIZED';
export const CANDLE_HANDLED = 'CANDLE_HANDLED';
export const FINISHED = 'FINISHED';

em.on(START, (data: any) => {
  console.log('Starting tester');
  tester.init(data.strategy, data.allCandles);
});

em.on(TESTER_INITIALIZED, () => {
  console.log('Tester initialized; Handling first candle...');
  tester.handleCandle(0);
});

em.on(CANDLE_HANDLED, (data: any) => {
  tester.handleCandle(++data.idx);
});

em.on(FINISHED, (data: any) => {
  console.log('Test finished!');
  store.dispatch(setIsTestFinished(true));
  store.dispatch(setTrades(data.trades));
});