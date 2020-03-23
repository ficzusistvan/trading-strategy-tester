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
const io: socketio.Server = socketio(SOCKET_IO_PORT);

let strategyInst: any;
let candles: Array<i.IMyCandles>;
let isEntered: boolean = false;
let openedTrade: i.ITrade;
let trades: Array<i.ITrade> = [];

let start = async function () {
  logger.info('Starting tester...');
}

io.on('connection', socket => {
  logger.info("Socket.io client connected [%s]", socket.id);

  socket.on('disconnect', () => {
    logger.info("Socket.io client disconnected [%s]", socket.id);
  });

  socket.on('getCandles', () => {
    logger.info('socket on getCandles');
    io.emit('respCandles', candles);
  });

  socket.on('getTrades', () => {
    logger.info('socket on getTrades');
    io.emit('respTrades', trades);
  });

  socket.on('runTest', async (data: { strategy: string, dataSource: string, symbolsAndPeriods: any }) => {
    logger.info('socket on runTest: %O', data);
    let dataSourceInst = await import('./data-sources/' + data.dataSource + '/api');
    const promises = data.symbolsAndPeriods.map(async (symbolAndPeriod: any) => {
      const result = await dataSourceInst.getCandles(symbolAndPeriod.symbol, symbolAndPeriod.period);
      return { symbol: symbolAndPeriod.symbol, period: symbolAndPeriod.period, isDefault: symbolAndPeriod.isDefault, candles: result };
    });
    candles = await Promise.all<i.IMyCandles>(promises);

    isEntered = false;
    trades = [];
    strategyInst = await import('./strategies/' + data.strategy);
    eventHandler.em.emit(eventHandler.STRATEGY_IMPORTED);
  });
});

let handleCandle = function (idx: number) {
  debug('Handling candle idx [' + idx + ']');
  if (idx < candles[0].candles.length) {
    // Running strategy
    if (!isEntered) {
      let res: i.IStrategyResult = strategyInst.enter(candles[0].candles, idx);
      if (res.result === true) {
        logger.info('Entered order %O', res.trade);
        trades.push(res.trade);
        openedTrade = res.trade;
        isEntered = true;
      }
    } else {
      let res: i.IStrategyResult = strategyInst.exit(candles[0].candles, idx, openedTrade);
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