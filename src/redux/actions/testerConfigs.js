import {
  SET_DATA_SOURCE,
  SET_SYMBOL,
  SET_PERIOD,
  SET_IS_DEFAULT,
  ADD_CANDLES,
  SET_STRATEGY,
  SET_INIT_BALANCE,
  SET_MARGIN_TO_BALANCE_PERCENT,
  SET_DAYTIME_SPREAD,
  SET_NIGHTTIME_SPREAD
} from "./types";

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

export const setInitBalance = (initBalance) => ({
  type: SET_INIT_BALANCE,
  initBalance
});

export const setMarginToBalancePercent = (marginToBalancePercent) => ({
  type: SET_MARGIN_TO_BALANCE_PERCENT,
  marginToBalancePercent
});

export const setDayTimeSpread = (spread) => ({
  type: SET_DAYTIME_SPREAD,
  spread
});

export const setNightTimeSpread = (spread) => ({
  type: SET_NIGHTTIME_SPREAD,
  spread
});