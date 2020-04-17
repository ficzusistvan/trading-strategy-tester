import { SET_TRADES, SET_IS_TEST_FINISHED, SET_END_BALANCE } from "../actions/types";

const testerResults = (state = { isTestFinished: true, trades: [], endBalance: 0 }, action) => {
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

    case SET_END_BALANCE: {
      return {
        ...state,
        endBalance: action.endBalance
      }
    }

    default:
      return state;
  }
}

export default testerResults