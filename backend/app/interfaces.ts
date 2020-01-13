import Big from "big.js";
import moment = require("moment");

export interface IExchange {
  name: string,
  fixed_length_name: string,
  api_key: string,
  secret_key: string,
  passphrase?: string,
  ws_timeout_ms: {
    ping: number,
    restart: number
  },
  symbol: string,
  base_asset: string,
  quote_asset: string,
  min_trade_amount: number
}

/** Tester */
export enum ESide {
  NONE = 'NONE',
  BUY = 'BUY',
  SELL = 'SELL'
}

export interface ITrade {
  price: number,
  side: ESide,
  date: string
}

export interface IStrategyResult {
  result: boolean,
  trade: ITrade
}

/** XAPI */
export interface ILogin {
  command: string;
  arguments: {
    userId: number;
    password: string;
  }
}

export interface IGetAllSymbols {
  command: string;
}

export interface IChartLastRequest {
  command: string;
  arguments: {
    info: {
      period: number;
      start: number;
      symbol: string;
    }
  };
}

export interface ISymbolRecord {
  "symbol": string;
  "description": string;
  "categoryName": string;
  "currency": string;
}

export interface IRateInfoRecord {
  close: number;
  ctm: number;
  ctmString: string;
  high: number;
  low: number;
  open: number;
  vol: number;
}

/** Alphavantage */
export interface IBestMatch {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

export interface ITimeSeries {
  "1. open": number;
  "2. high": number;
  "3. low": number;
  "4. close": number;
  "5. volume": number;
}

/** Common */
export interface ISymbol {
  symbol: string;
  name: string;
  type: string;
  currency: string;
}

export interface ICandle {
  date: any,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number
}