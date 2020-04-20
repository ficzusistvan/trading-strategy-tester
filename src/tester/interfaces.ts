import Big from "big.js";

/** Tester */
export enum ETesterSide {
  NONE = 'NONE',
  BUY = 'BUY',
  SELL = 'SELL'
}

export interface ITesterEnter {
  side: ETesterSide,
  openPrice: Big,
  openDate: string,
  volume: Big,
  pip: Big,
  openMargin: Big
}

export interface ITesterExit {
  closePrice: Big,
  closeDate: string,
  profit: Big
}

export interface ITesterTrade {
  enter: ITesterEnter,
  exit: ITesterExit
}

/** XAPI */
export interface IXAPILogin {
  command: string;
  arguments: {
    userId: number;
    password: string;
  }
}

export interface IXAPIGetAllSymbols {
  command: string;
}

export interface IXAPIChartLastRequest {
  command: string;
  arguments: {
    info: {
      period: number;
      start: number;
      symbol: string;
    }
  };
}

export interface IXAPISymbolRecord {
  "symbol": string;
  "description": string;
  "categoryName": string;
  "currency": string;
}

export interface IXAPIRateInfoRecord {
  close: number;
  ctm: number;
  ctmString: string;
  high: number;
  low: number;
  open: number;
  vol: number;
}

/** Alphavantage */
export interface IAVBestMatch {
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

export interface IAVTimeSeries {
  "1. open": number;
  "2. high": number;
  "3. low": number;
  "4. close": number;
  "5. volume": number;
}

/** Finnhub */
export interface IFinnhubStockSymbol {
  description: string,
  displaySymbol: string,
  symbol: string
}

export interface IFinnhubStockData {
  c: Array<number>,
  h: Array<number>,
  l: Array<number>,
  o: Array<number>,
  s: string,
  t: Array<number>,
  v: Array<number>
}

export interface IFinnhubExchange {
  name: string,
  code: string,
  currency: string
}

/** Common */
export interface ICommonSymbol {
  symbol: string;
  name: string;
  type: string;
  currency: string;
}

export interface ICommonCandle {
  date: any,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number
}

export interface ICommonCandles {
  symbol: string,
  period: string,
  isDefault: boolean,
  candles: Array<ICommonCandle>
}

export interface ICommonInstrumentBasicInfo {
  currencyPrice: Big,
  leverage: Big,
  nominalValue: Big
}