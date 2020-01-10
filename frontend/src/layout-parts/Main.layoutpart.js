import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/Home.page';
import SymbolsPage from '../pages/Symbols.page';
import AVSymbolsPage from '../pages/AVSymbols.page'
import SymbolPage from '../pages/Symbol.page';
import AVSymbolPage from '../pages/AVSymbol.page';

const MainLayoutPart = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/xapi-symbols' component={SymbolsPage} />
      <Route exact path='/alphavantage-symbols' component={AVSymbolsPage} />
      <Route exact path='/symbol/:symbol' component={SymbolPage} />
      <Route exact path='/avsymbol/:symbol' component={AVSymbolPage} />
    </Switch>
  </main>
)

export default MainLayoutPart;