import * as i from '../interfaces';

export let applySearchterm = function(symbols: Array<i.ICommonSymbol>, keyword: string) {
  return symbols.filter(symbol => {
    return symbol.symbol.includes(keyword) || symbol.name.includes(keyword);
  });
}