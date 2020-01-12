import Big from 'big.js'
import moment = require('moment');

export interface ILogin {
  command?: string;
  arguments?: ILoginArguments;
}

export interface ILoginArguments {
  userId?: number;
  password?: string;
}

export interface IGetAllSymbols {
  command?: string;
}

export interface IChartLastRequestInfo {
  period?: number;
  start?: number;
  symbol?: string;
}

export interface IChartLastRequestArguments {
  info?: IChartLastRequestInfo;
}

export interface IChartLastRequest {
  command?: string;
  arguments?: IChartLastRequestArguments;
}

/** XAPI */
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