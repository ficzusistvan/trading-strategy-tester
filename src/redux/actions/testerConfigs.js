import {
  SET_DATA_SOURCE,
  SET_SYMBOL,
  SET_PERIOD,
  SET_IS_DEFAULT,
  ADD_CANDLES,
  SET_STRATEGY,
  SET_LOCAL_CSV,
  SET_MY_REST_API_URL,
  SET_CURRENCY_PRICE,
  SET_LEVERAGE,
  SET_NOMINAL_VALUE,
  SET_INIT_BALANCE
} from "./types";

export const setDataSource = (dataSource) => ({
  type: SET_DATA_SOURCE,
  dataSource
});

export const setLocalCsv = (csv) => ({
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

export const setCurrencyPrice = (currencyPrice) => ({
  type: SET_CURRENCY_PRICE,
  currencyPrice
});

export const setLeverage = (leverage) => ({
  type: SET_LEVERAGE,
  leverage
});

export const setNominalValue = (nominalValue) => ({
  type: SET_NOMINAL_VALUE,
  nominalValue
});

export const setInitBalance = (initBalance) => ({
  type: SET_INIT_BALANCE,
  initBalance
})