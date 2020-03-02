import { SET_CANDLES, SET_TEST_RESULTS } from "./types";

export const setCandles = (candles) => ({
  type: SET_CANDLES,
  candles
});

export const setTestResults = (results) => ({
  type: SET_TEST_RESULTS,
  results
});