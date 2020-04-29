import { SET_TRADES, SET_IS_TEST_FINISHED, SET_END_BALANCE, SET_CHART_MAIN_CANDLES } from "../actions/types";

const testerResults = (state = { isTestFinished: true, trades: [], endBalance: 0, chartMainCandles: [] }, action) => {
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

    case SET_CHART_MAIN_CANDLES: {
      return {
        ...state,
        chartMainCandles: action.chartMainCandles
      }
    }

    default:
      return state;
  }
}

export default testerResults