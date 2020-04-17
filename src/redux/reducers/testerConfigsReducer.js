import {
  SET_DATA_SOURCE,
  SET_SYMBOL,
  SET_PERIOD,
  SET_IS_DEFAULT,
  ADD_CANDLES,
  SET_STRATEGY,
  SET_LOCAL_CSV,
  SET_MY_REST_API_URL,
  SET_CURRENCY_PRICE,
  SET_LEVERAGE,
  SET_NOMINAL_VALUE,
  SET_INIT_BALANCE
} from "../actions/types";

const testerConfigs = (state = {
  dataSource: '',
  localCsv: '',
  myRestApiUrl: process.env.REACT_APP_MY_REST_API_URL,
  symbol: null,
  period: 5,
  isDefault: true,
  symbolsAndPeriods: [],
  strategy: '',
  currencyPrice: 4.835,
  leverage: 20,
  nominalValue: 25,
  initBalance: 50000
}, action) => {
  switch (action.type) {
    case SET_DATA_SOURCE: {
      if (state.dataSource === action.dataSource) {
        return state;
      }
      return {
        ...state,
        dataSource: action.dataSource,
        csv: null,
        symbol: null,
        period: 5,
        symbolsAndPeriods: []
      }
    }
    case SET_LOCAL_CSV: {
      return {
        ...state,
        localCsv: action.csv
      }
    }
    case SET_MY_REST_API_URL: {
      return {
        ...state,
        myRestApiUrl: action.url
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
    case ADD_CANDLES: {
      return {
        ...state,
        symbolsAndPeriods: [...state.symbolsAndPeriods, { symbol: action.symbol, period: action.period, isDefault: action.isDefault, candles: action.candles }]
      }
    }
    case SET_STRATEGY: {
      return {
        ...state,
        strategy: action.strategy
      }
    }

    case SET_CURRENCY_PRICE: {
      return {
        ...state,
        currencyPrice: action.currencyPrice
      }
    }

    case SET_LEVERAGE: {
      return {
        ...state,
        leverage: action.leverage
      }
    }

    case SET_NOMINAL_VALUE: {
      return {
        ...state,
        nominalValue: action.nominalValue
      }
    }

    case SET_INIT_BALANCE: {
      return {
        ...state,
        initBalance: action.initBalance
      }
    }

    default:
      return state;
  }
}

export default testerConfigs