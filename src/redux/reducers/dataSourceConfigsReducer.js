import {
  SET_LOCAL_CSV,
  SET_MY_REST_API_URL,
  SET_CURRENCY_PRICE,
  SET_LEVERAGE,
  SET_NOMINAL_VALUE,
} from "../actions/types";

const dataSourceConfigs = (state = {
  localCsv: '',
  myRestApiUrl: process.env.REACT_APP_MY_REST_API_URL,
  currencyPrice: 4.835,
  leverage: 20,
  nominalValue: 25
}, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default dataSourceConfigs