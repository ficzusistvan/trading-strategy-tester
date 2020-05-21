import { SET_TRADES, SET_IS_TEST_FINISHED, SET_END_BALANCE, SET_CHART_MAIN_CANDLES, SET_FINISHED_REASON, SET_INDICATORS } from "../actions/types";

const testerResults = (state = { isTestFinished: true, trades: [], endBalance: 0, chartMainCandles: [], reason: '', indicators: [] }, action) => {
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

    case SET_FINISHED_REASON: {
      return {
        ...state,
        reason: action.reason
      }
    }

    case SET_INDICATORS: {
      return {
        ...state,
        indicators: action.indicators
      }
    }

    default:
      return state;
  }
}

export default testerResults