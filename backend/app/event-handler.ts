// GENERAL DEPENDENCIES
import Emittery from 'emittery';
export const em = new Emittery(); // export as soon as possible. See: https://coderwall.com/p/myzvmg/circular-dependencies-in-node-js
import nconf from 'nconf'
nconf.file({
  file: 'config.json',
  search: true
});

// DEBUGGING
import Debug from 'debug'
const debug = Debug('event-handler')

// ARBITER DEPENDENCIES
import * as tester from './tester'
import { logger } from './logger'

// VARIABLES

export const HTTP_SERVER_INITIALISED = 'HTTP_SERVER_INITIALISED';
export const WEBSOCKET_CONNECTED = 'WEBSOCKET_CONNECTED';
export const WEBSOCKET_DISCONNECTED = 'WEBSOCKET_DISCONNECTED';
export const LOGGED_IN = "LOGGED_IN";
export const STRATEGY_IMPORTED = 'STRATEGY_IMPORTED';
export const CANDLE_HANDLED = 'CANDLE_HANDLED';
export const FINISHED_TEST = 'FINISHED_TEST';

em.on(HTTP_SERVER_INITIALISED, async (data) => {
  logger.info('HTTP_SERVER_INITIALISED [%s]', data);
  tester.start();
});

em.on(STRATEGY_IMPORTED, () => {
  tester.handleCandle(0);
});

em.on(CANDLE_HANDLED, (data: { idx: number }) => {
  tester.handleCandle(++data.idx);
});

em.on(FINISHED_TEST, () => {
  logger.info('Test finished!');
});