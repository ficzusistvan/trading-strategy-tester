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