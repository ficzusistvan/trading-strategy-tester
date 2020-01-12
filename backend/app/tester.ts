// GENERAL DEPENDENCIES
import Big from 'big.js'
import nconf from 'nconf'
nconf.file({
  file: 'config.json',
  search: true
});
import socketio from 'socket.io'

// DEBUGGING
import Debug from 'debug'
const debug = Debug('tester')

// ARBITER DEPENDENCIES
import { logger } from './logger'
import * as i from './interfaces'
import * as eventHandler from './event-handler'

const SOCKET_IO_PORT = nconf.get('ports:socket_io');

let strategyInst: any;
let rateInfos: Array<any>;
let digits: number;
let rateInfosLen: number;

let start = async function () {
  logger.info('Starting tester...');
}

const io: socketio.Server = socketio(SOCKET_IO_PORT);
io.on('connection', socket => {
  logger.info("Socket.io client connected [%s]", socket.id);

  socket.on('disconnect', () => {
    logger.info("Socket.io client disconnected [%s]", socket.id);
  });

  socket.on('runTest', async (data: { strategy: string }) => {
    logger.info('Running test: %O', data);
    isEntered = false;
    trades = [];
    strategyInst = await import('./strategies/' + data.strategy);
    eventHandler.em.emit(eventHandler.STRATEGY_IMPORTED);
  });
});

let isEntered: boolean = false;
let openedTrade: i.ITrade;
let trades: Array<i.ITrade> = [];
let handleCandle = function (idx: number) {
  debug('Handling candle idx [' + idx + ']');
  if (idx < rateInfosLen) {
    // Running strategy
    if (!isEntered) {
      let res: i.IStrategyResult = strategyInst.enter(rateInfos, idx, digits);
      if (res.result === true) {
        logger.info('Entered order %O', res.trade);
        trades.push(res.trade);
        openedTrade = res.trade;
        isEntered = true;
      }
    } else {
      let res: i.IStrategyResult = strategyInst.exit(rateInfos, idx, digits, openedTrade);
      if (res.result === true) {
        logger.info('Exited order %O', res.trade);
        trades.push(res.trade);
        isEntered = false;
      }
    }
    eventHandler.em.emit(eventHandler.CANDLE_HANDLED, { idx: idx });
  } else {
    eventHandler.em.emit(eventHandler.FINISHED_TEST, { trades: trades });
    io.emit('finishedTest', { trades: trades });
  }
}

export {
  start,
  handleCandle
};