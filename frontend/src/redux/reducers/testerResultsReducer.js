import { SET_CANDLES, SET_TEST_RESULTS } from "../actions/types";

const testerResults = (state = { candles: null, testResults: null }, action) => {
  switch (action.type) {

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