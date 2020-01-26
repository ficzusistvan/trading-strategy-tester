import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/Home.page';
import DataSourcePage from '../pages/DataSource.page';
import SymbolAndPeriodChooserPage from '../pages/SymbolAndPeriodChooser.page'
import StrategyPage from '../pages/Strategy.page';

const MainLayoutPart = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/data-source' component={DataSourcePage} />
      <Route exact path='/symbol-and-period' component={SymbolAndPeriodChooserPage} />
      <Route exact path='/strategy' component={StrategyPage} />
    </Switch>
  </main>
)

export default MainLayoutPart;