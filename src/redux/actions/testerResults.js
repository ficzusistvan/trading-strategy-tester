import { SET_IS_TEST_FINISHED, SET_TRADES, SET_CONFIGS } from "./types";

export const setIsTestFinished = (isTestFinished) => ({
  type: SET_IS_TEST_FINISHED,
  isTestFinished
});

export const setTrades = (trades) => ({
  type: SET_TRADES,
  trades
});

export const setConfigs = (configs) => ({
  type: SET_CONFIGS,
  configs
});