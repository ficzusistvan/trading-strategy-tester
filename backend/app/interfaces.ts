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

export enum ESide {
  NONE = 'NONE',
  BUY = 'BUY',
  SELL = 'SELL'
}

export interface ITrade {
  price: number, 
  side: ESide,
  ctmString: string
}

export interface IStrategyResult {
  result: boolean,
  trade: ITrade
}