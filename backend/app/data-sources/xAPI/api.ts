// GENERAL DEPENDENCIES
import WebSocket from 'ws'
import Big from 'big.js'

// DEBUGGING
import Debug from 'debug'
const debug = Debug('xapi')

// ARBITER DEPENDENCIES
import { logger } from '../../logger'
import * as eventHandler from '../../event-handler'
import * as i from './interfaces'

const HOST = 'https://xapi.xtb.com';
const DEMO_PORTS = {
  MAIN: 5124,
  STREAM: 5125
};
const REAL_PORTS = {
  MAIN: 5112,
  STREAM: 5113
};

const ADDRESS_DEMO = 'wss://ws.xtb.com/demo';
const ADDRESS_DEMO_STREAM = 'wss://ws.xtb.com/demoStream';
const ADDRESS_REAL = 'wss://ws.xtb.com/real';
const ADDRESS_REAL_STREAM = 'wss://ws.xtb.com/realStream';

const addr = ADDRESS_DEMO;

let getAllSymbols = function (userId: number, password: string, callback: any) {
  const ws: WebSocket = new WebSocket(addr);

  ws.addEventListener('open', () => {
    logger.info('Websocket opened for [' + addr + ']');
    let msg: i.ILogin = {};
    msg.command = "login";
    let argumentss: i.ILoginArguments = {};
    argumentss.userId = userId;
    argumentss.password = password;
    msg.arguments = argumentss;
    ws.send(JSON.stringify(msg));
  });
  ws.addEventListener('message', async (msg) => {
    debug('message from ws: %O', msg.data);
    const data = JSON.parse(msg.data);
    if (data.streamSessionId !== undefined) {
      logger.info('Websocket logged in; sending "getAllSymbols"...');
      let msg: i.IGetAllSymbols = {};
      msg.command = "getAllSymbols";
      ws.send(JSON.stringify(msg));
    } else {
      logger.info('Websocket "getAllSymbols" result received, returning it...');
      ws.close();
      callback(data);
    }
  });
  ws.addEventListener('close', () => {
    logger.info('Websocket closed for [' + addr + ']');
  });
  ws.addEventListener('ping', () => {
    debug('Webocket ping received! [' + addr + ']');
  });
  ws.addEventListener('error', (error) => {
    logger.error('Websocket error for [' + addr + ']', error);
  });
}

let getChartLastRequest = function (userId: number, password: string, period: number, start: number, symbol: string, callback: any) {
  const ws: WebSocket = new WebSocket(addr);

  ws.addEventListener('open', () => {
    logger.info('Websocket opened for [' + addr + ']');
    let msg: i.ILogin = {};
    msg.command = "login";
    let argumentss: i.ILoginArguments = {};
    argumentss.userId = userId;
    argumentss.password = password;
    msg.arguments = argumentss;
    ws.send(JSON.stringify(msg));
  });
  ws.addEventListener('message', async (msg) => {
    const data = JSON.parse(msg.data);
    if (data.streamSessionId !== undefined) {
      logger.info('Websocket logged in; sending "getChartLastRequest"...');
      let msg: i.IChartLastRequest = {};
      msg.command = "getChartLastRequest";
      let argumentss: i.IChartLastRequestArguments = {};
      argumentss.info = { period: period, start: start, symbol: symbol }
      msg.arguments = argumentss;
        ws.send(JSON.stringify(msg));
    } else {
      logger.info('Websocket "getChartLastRequest" result received, returning it...');
      ws.close();
      callback(data);
    }
  });
  ws.addEventListener('close', () => {
    logger.info('Websocket closed for [' + addr + ']');
  });
  ws.addEventListener('ping', () => {
    debug('Webocket ping received! [' + addr + ']');
  });
  ws.addEventListener('error', (error) => {
    logger.error('Websocket error for [' + addr + ']', error);
  });
} 

export {
  getAllSymbols,
  getChartLastRequest 
}