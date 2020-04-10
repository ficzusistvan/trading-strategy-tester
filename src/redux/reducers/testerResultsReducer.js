import { SET_TRADES, SET_IS_TEST_FINISHED, SET_CONFIGS } from "../actions/types";

const testerResults = (state = { isTestFinished: true, trades: [], configs: {} }, action) => {
  switch (action.type) {

    case SET_IS_TEST_FINISHED: {
      return {
        ...state,
        isTestFinished: action.isTestFinished
      }
    }

    case SET_TRADES: {
      return {
        ...state,
        trades: action.trades
      }
    }

    case SET_CONFIGS: {
      return {
        ...state,
        configs: action.configs
      }
    }

    default:
      return state;
  }
}

export default testerResults