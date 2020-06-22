import * as i from './interfaces';

export let applySearchterm = function (symbols: Array<i.ICommonSymbol>, keyword: string) {
  return symbols.filter(symbol => {
    return symbol.symbol.includes(keyword) || symbol.name.includes(keyword);
  });
}

export let calculateMaxVolume = function (balance: number, marginToBalancePercent: number, price: number, currencyPrice: number, leverage: number, nominalValue: number): number {
  const lvrg = 1 / leverage;
  const adjustedBalance = balance * marginToBalancePercent / 100;
  const volume = +(adjustedBalance / (price * currencyPrice * lvrg * nominalValue)).toFixed(2);
  return volume;
}

export let calculatePip = function (volume: number, currencyPrice: number, nominalValue: number): number {
  const pip = volume * currencyPrice * nominalValue;
  return pip;
}

export let calculateMargin = function (pip: number, price: number, leverage: number): number {
  const lvrg = 1 / leverage;
  const margin = pip * price * lvrg;
  return margin;
}

export let padStartWithUndefined = function (what: Array<any>, toLength: number): Array<any> {
  const diff = (toLength - what.length);
  for (let i = 0; i < diff; i++) {
    what.unshift(undefined);
  }
  return what;
}

export let padStartWithZeros = function (what: Array<any>, toLength: number): Array<any> {
  const diff = (toLength - what.length);
  for (let i = 0; i < diff; i++) {
    what.unshift(0);
  }
  return what;
}

export let padStartWithEmptyString = function (what: Array<any>, toLength: number): Array<any> {
  const diff = (toLength - what.length);
  for (let i = 0; i < diff; i++) {
    what.unshift('');
  }
  return what;
}