import Emittery from 'emittery';
import Debug from 'debug'
import * as i from './interfaces'
import * as tester from './tester'

export const em = new Emittery(); // export as soon as possible. See: https://coderwall.com/p/myzvmg/circular-dependencies-in-node-js

const debug = Debug('event-handler')

export const START = 'START';
export const CANDLE_HANDLED = 'CANDLE_HANDLED';
export const FINISHED = 'FINISHED';

em.on(START, () => {
  tester.handleCandle(0);
});

em.on(CANDLE_HANDLED, (data: any) => {
  tester.handleCandle(++data.idx);
});

em.on(FINISHED, () => {
  //logger.info('Test finished!');
});