import { SET_TRADES, SET_IS_TEST_FINISHED } from "../actions/types";

const testerResults = (state = { isTestFinished: true, trades: [] }, action) => {
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

    default:
      return state;
  }
}

export default testerResults