import {
  SET_DATA_SOURCE,
  SET_SYMBOL,
  SET_PERIOD,
  SET_IS_DEFAULT,
  ADD_CANDLES,
  SET_STRATEGY,
  SET_INIT_BALANCE,
  SET_MARGIN_TO_BALANCE_PERCENT,
  SET_DAYTIME_SPREAD,
  SET_NIGHTTIME_SPREAD,
  SET_LOT_SIZE
} from "../actions/types";

const testerConfigs = (state = {
  dataSource: '',
  symbol: null,
  period: 1,
  isDefault: true,
  symbolsAndPeriods: [],
  strategy: '',
  initBalance: 5000,
  marginToBalancePercent: 50,
  dayTimeSpread: 2.8,
  nightTimeSpread: 3,
  lotSize: 0.01
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
        period: 1,
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
    case SET_INIT_BALANCE: {
      return {
        ...state,
        initBalance: action.initBalance
      }
    }
    case SET_MARGIN_TO_BALANCE_PERCENT: {
      return {
        ...state,
        marginToBalancePercent: action.marginToBalancePercent
      }
    }
    case SET_DAYTIME_SPREAD: {
      return {
        ...state,
        dayTimeSpread: action.spread
      }
    }
    case SET_NIGHTTIME_SPREAD: {
      return {
        ...state,
        nightTimeSpread: action.spread
      }
    }
    case SET_LOT_SIZE: {
      return {
        ...state,
        lotSize: action.lotSize
      }
    }
    default:
      return state;
  }
}

export default testerConfigs