import * as helpers from '../helpers'
import Debug from 'debug'
import * as i from '../../interfaces'
import moment from 'moment';

const debug = Debug('xapi')
//const HOST = 'https://xapi.xtb.com';
//const DEMO_PORTS = {
//  MAIN: 5124,
//  STREAM: 5125
//};
//const REAL_PORTS = {
//  MAIN: 5112,
//  STREAM: 5113
//};

const ADDRESS_DEMO = 'wss://ws.xtb.com/demo';
//const ADDRESS_DEMO_STREAM = 'wss://ws.xtb.com/demoStream';
//const ADDRESS_REAL = 'wss://ws.xtb.com/real';
//const ADDRESS_REAL_STREAM = 'wss://ws.xtb.com/realStream';

const addr = ADDRESS_DEMO;

const USER_ID = process.env.REACT_APP_XAPI_USER_ID;
const PASSWORD = process.env.REACT_APP_XAPI_PASSWORD;

let normalizeSymbols = function (symbols: Array<i.IXAPISymbolRecord>) {
  return symbols.map(symbol => {
    let obj: i.ICommonSymbol = { symbol: '', name: '', type: '', currency: '' };
    obj.symbol = symbol['symbol'];
    obj.name = symbol['description'];
    obj.type = symbol['categoryName'];
    obj.currency = symbol['currency'];
    return obj;
  });
}

let searchSymbol = async function (keywords: string) {
  const ws: WebSocket = new WebSocket(addr);

  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => {
      //logger.info('Websocket opened for [' + addr + ']');
      let msg: i.IXAPILogin = { command: "login", arguments: { userId: USER_ID ? Number(USER_ID) : 0, password: PASSWORD ? PASSWORD : '' } };
      ws.send(JSON.stringify(msg));
    });
    ws.addEventListener('message', async (msg: any) => {
      //debug('message from ws: %O', msg.data);
      const data = JSON.parse(msg.data);
      if (data.streamSessionId !== undefined) {
        //logger.info('Websocket logged in; sending "getAllSymbols"...');
        let msg: i.IXAPIGetAllSymbols = { command: "getAllSymbols" };
        ws.send(JSON.stringify(msg));
      } else {
        //logger.info('Websocket "getAllSymbols" result received, returning it...');
        ws.close();
        resolve(helpers.applySearchterm(normalizeSymbols(data.returnData), keywords));
      }
    });
    ws.addEventListener('close', () => {
      //logger.info('Websocket closed for [' + addr + ']');
    });
    ws.addEventListener('ping', () => {
      debug('Webocket ping received! [' + addr + ']');
    });
    ws.addEventListener('error', (error: any) => {
      //logger.error('Websocket error for [' + addr + ']', error);
    });
  });
}

let normalizeCandles = function (candles: Array<i.IXAPIRateInfoRecord>, scale: number) {
  return candles.map(candle => {
    let obj: i.ICommonCandle = { date: 0, open: 0, high: 0, low: 0, close: 0, volume: 0 };

    obj.date = moment(candle['ctm']).toDate();
    obj.open = candle['open'] / scale;
    obj.high = obj.open + candle['high'] / scale;
    obj.low = obj.open + candle['low'] / scale;
    obj.close = obj.open + candle['close'] / scale;
    obj.volume = candle['vol'];

    return obj;
  });
}

const since = new Map();
since.set(1, 1);
since.set(5, 1);
since.set(15, 1);
since.set(30, 7);
since.set(60, 7);
since.set(240, 13);
since.set(1440, 13);
since.set(10080, 60);
since.set(43200, 60);

let getCandles = async function (symbol: string, period: number) {
  const ws: WebSocket = new WebSocket(addr);

  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => {
      //logger.info('Websocket opened for [' + addr + ']');
      let msg: i.IXAPILogin = { command: "login", arguments: { userId: USER_ID ? Number(USER_ID) : 0, password: PASSWORD ? PASSWORD : '' } };
      ws.send(JSON.stringify(msg));
    });
    ws.addEventListener('message', async (msg: any) => {
      //debug('message from ws: %O', msg.data);
      const data = JSON.parse(msg.data);
      if (data.streamSessionId !== undefined) {
        //logger.info('Websocket logged in; sending "getChartLastRequest"...');
        let msg: i.IXAPIChartLastRequest = { command: "getChartLastRequest", arguments: { info: { period: Number(period), start: moment().subtract(since.get(Number(period)), 'month').valueOf(), symbol: symbol } } };
        let strin = JSON.stringify(msg);
        debug('Strin', strin);
        ws.send(strin);
      } else {
        //logger.info('Websocket "getChartLastRequest" result received, returning it...');
        ws.close();
        resolve(normalizeCandles(data.returnData.rateInfos, Math.pow(10, data.returnData.digits)));
      }
    });
    ws.addEventListener('close', () => {
      //logger.info('Websocket closed for [' + addr + ']');
    });
    ws.addEventListener('ping', () => {
      debug('Webocket ping received! [' + addr + ']');
    });
    ws.addEventListener('error', (error: any) => {
      //logger.error('Websocket error for [' + addr + ']', error);
    });
  });
}

export {
  searchSymbol,
  getCandles
}