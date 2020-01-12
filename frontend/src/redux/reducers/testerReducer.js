import { SET_DATA_SOURCE, SET_SYMBOL, SET_PERIOD, SET_STRATEGY } from "../actions/types";

const tester = (state = { dataSource: null, symbol: null, period: null, strategy: null }, action) => {
  switch (action.type) {
    case SET_DATA_SOURCE: {
      return {
        ...state,
        dataSource: action.dataSource
      }
    }
    case SET_SYMBOL: {
      return {
        ...state,
        symbol: action.symbol
      }
    }
    case SET_PERIOD: {
      return {
        ...state,
        period: action.period
      }
    }
    case SET_STRATEGY: {
      return {
        ...state,
        strategy: action.strategy
      }
    }

    default:
      return state;
  }
}

export default tester