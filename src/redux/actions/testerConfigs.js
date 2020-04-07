import { SET_DATA_SOURCE, SET_SYMBOL, SET_PERIOD, SET_IS_DEFAULT, ADD_CANDLES, SET_STRATEGY, SET_LOCAL_CSV, SET_MY_REST_API_URL } from "./types";

export const setDataSource = (dataSource) => ({
  type: SET_DATA_SOURCE,
  dataSource
});

export const setCSV = (csv) => ({
  type: SET_LOCAL_CSV,
  csv
});

export const setMyRestApiUrl = (url) => ({
  type: SET_MY_REST_API_URL,
  url
});

export const setSymbol = (symbol) => ({
  type: SET_SYMBOL,
  symbol
});

export const setPeriod = (period) => ({
  type: SET_PERIOD,
  period
});

export const setIsDefault = (isDefault) => ({
  type: SET_IS_DEFAULT,
  isDefault
})

export const addCandles = (symbol, period, isDefault, candles) => ({
  type: ADD_CANDLES,
  symbol,
  period,
  isDefault,
  candles
});

export const setStrategy = (strategy) => ({
  type: SET_STRATEGY,
  strategy
});