import { SET_IS_TEST_FINISHED, SET_CANDLES, SET_TEST_RESULTS } from "./types";

export const setIsTestFinished = (isTestFinished) => ({
  type: SET_IS_TEST_FINISHED,
  isTestFinished
});

export const setCandles = (candles) => ({
  type: SET_CANDLES,
  candles
});

export const setTestResults = (results) => ({
  type: SET_TEST_RESULTS,
  results
});