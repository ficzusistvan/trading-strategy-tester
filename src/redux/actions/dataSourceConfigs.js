import {
  SET_LOCAL_CSV,
  SET_MY_REST_API_URL,
  SET_CURRENCY_PRICE,
  SET_LEVERAGE,
  SET_NOMINAL_VALUE
} from "./types"

export const setLocalCsv = (csv) => ({
  type: SET_LOCAL_CSV,
  csv
});

export const setMyRestApiUrl = (url) => ({
  type: SET_MY_REST_API_URL,
  url
});

export const setCurrencyPrice = (currencyPrice) => ({
  type: SET_CURRENCY_PRICE,
  currencyPrice
});

export const setLeverage = (leverage) => ({
  type: SET_LEVERAGE,
  leverage
});

export const setNominalValue = (nominalValue) => ({
  type: SET_NOMINAL_VALUE,
  nominalValue
});
