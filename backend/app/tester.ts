// GENERAL DEPENDENCIES
import Big from 'big.js'
import nconf from 'nconf'
nconf.file({
  file: 'config.json',
  search: true
});
import moment from 'moment'
import cron from 'cron'
const PushBullet = require('pushbullet')
import socketio from 'socket.io'
import path from 'path'
import fs from 'fs'

// DEBUGGING
import Debug from 'debug'
const debug = Debug('tester')

// ARBITER DEPENDENCIES
import { logger } from './logger'
import * as i from './interfaces'
import * as eventHandler from './event-handler'
import knex from './db/knex'
import * as xapi from './xAPI/api'

// VARIABLES
const PUSHBULLET_API_KEY = nconf.get('pushbullet:api_key');
const PUSHBULLET_EMAIL = nconf.get('pushbullet:email');

const XAPI_USERID = nconf.get('xapi:user_id');
const XAPI_PASSWORD = nconf.get('xapi:password');

const SOCKET_IO_PORT = nconf.get('ports:socket_io');

const pusher = new PushBullet(PUSHBULLET_API_KEY);
const dirPath = path.join(__dirname, 'strategies');

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

  socket.on('getAllSymbols', () => {
    logger.info('socket.io received "getAllSymbols"');
    xapi.getAllSymbols(XAPI_USERID, XAPI_PASSWORD, (data: any) => {
      socket.emit('getAllSymbols', data);
    });
  });

  socket.on('getChartLastRequest', (data: { period: number, start: number, symbol: string }) => {
    logger.info('socket.io received "getChartLastRequest" [%O]', data);
    xapi.getChartLastRequest(XAPI_USERID, XAPI_PASSWORD, data.period, data.start, data.symbol, (data: any) => {
      rateInfos = data.returnData.rateInfos;
      digits = data.returnData.digits;
      rateInfosLen = rateInfos.length;
      socket.emit('getChartLastRequest', data);
    });
  });

  socket.on('getStrategies', () => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return logger.error('Unable to scan directory', err);
      }
      socket.emit('getStrategies', files);
    });
  });

  socket.on('runTest', async (data: { strategy: string }) => {
    logger.info('Running test: %O', data);
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