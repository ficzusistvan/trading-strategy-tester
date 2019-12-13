import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/Home.page';
import SymbolsPage from '../pages/Symbols.page';
import SymbolPage from '../pages/Symbol.page';

const MainLayoutPart = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/symbols' component={SymbolsPage} />
      <Route exact path='/symbol/:symbol' component={SymbolPage} />
    </Switch>
  </main>
)

export default MainLayoutPart;