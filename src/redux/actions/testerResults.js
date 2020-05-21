import { SET_IS_TEST_FINISHED, SET_TRADES, SET_END_BALANCE, SET_CHART_MAIN_CANDLES, SET_FINISHED_REASON, SET_INDICATORS } from "./types";

export const setIsTestFinished = (isTestFinished) => ({
  type: SET_IS_TEST_FINISHED,
  isTestFinished
});

export const setTrades = (trades) => ({
  type: SET_TRADES,
  trades
});

export const setEndBalance = (endBalance) => ({
  type: SET_END_BALANCE,
  endBalance
});

export const setChartMainCandles = (chartMainCandles) => ({
  type: SET_CHART_MAIN_CANDLES,
  chartMainCandles
});

export const setFinishedReason = (reason) => ({
  type: SET_FINISHED_REASON,
  reason
});

export const setIndicators = (indicators) => ({
  type: SET_INDICATORS,
  indicators
});