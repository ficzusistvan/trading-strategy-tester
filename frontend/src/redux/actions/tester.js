import { SET_DATA_SOURCE, SET_SYMBOL, SET_PERIOD, SET_STRATEGY } from "./types";

export const setDataSource = (dataSource) => ({
  type: SET_DATA_SOURCE,
  dataSource
});

export const setSymbol = (symbol) => ({
  type: SET_SYMBOL,
  symbol
});

export const setPeriod = (period) => ({
  type: SET_PERIOD,
  period
});

export const setStrategy = (strategy) => ({
  type: SET_STRATEGY,
  strategy
});