import { SET_CANDLES, SET_TEST_RESULTS, SET_IS_TEST_FINISHED } from "../actions/types";

const testerResults = (state = { isTestFinished: false, candles: null, testResults: null }, action) => {
  switch (action.type) {

    case SET_IS_TEST_FINISHED: {
      return {
        ...state,
        isTestFinished: action.isTestFinished
      }
    }

    case SET_CANDLES: {
      return {
        ...state,
        candles: action.candles
      }
    }
    case SET_TEST_RESULTS: {
      return {
        ...state,
        testResults: action.results
      }
    }

    default:
      return state;
  }
}

export default testerResults