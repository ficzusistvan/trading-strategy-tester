import { SET_DATA_SOURCE, SET_SYMBOL, SET_PERIOD, SET_IS_DEFAULT, ADD_SYMBOL_AND_PERIOD, SET_STRATEGY} from "../actions/types";

const testerConfigs = (state = { dataSource: null, symbol: null, period: 5, isDefault: false, symbolsAndPeriods: [], strategy: null }, action) => {
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
    case SET_IS_DEFAULT: {
      return {
        ...state,
        isDefault: action.isDefault
      }
    }
    case ADD_SYMBOL_AND_PERIOD: {
      return {
        ...state,
        symbolsAndPeriods: [...state.symbolsAndPeriods, { symbol: action.symbol, period: action.period, isDefault: action.isDefault }]
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

export default testerConfigs