import { SET_DATA_SOURCE, SET_SYMBOL, SET_PERIOD, SET_STRATEGY, ADD_SYMBOL_AND_PERIOD, SET_TEST_RESULTS } from "../actions/types";

const tester = (state = { dataSource: null, symbol: null, period: 5, symbolsAndPeriods: [], strategy: null, testResults: null }, action) => {
  switch (action.type) {
    case SET_DATA_SOURCE: {
      if (state.dataSource === action.dataSource) {
        return state;
      }
      return {
        ...state,
        dataSource: action.dataSource,
        symbol: null,
        period: 5,
        symbolsAndPeriods: []
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
 
    case ADD_SYMBOL_AND_PERIOD: {
      return {
        ...state,
        symbolsAndPeriods: [...state.symbolsAndPeriods, { symbol: action.symbol, period: action.period }]
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

export default tester