import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/Home.page';
import DataSourcePage from '../pages/DataSource.page';
import SymbolPage from '../pages/Symbol.page'
import PeriodPage from '../pages/Period.page';
import StrategyPage from '../pages/Strategy.page';

const MainLayoutPart = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/data-source' component={DataSourcePage} />
      <Route exact path='/symbol' component={SymbolPage} />
      <Route exact path='/period' component={PeriodPage} />
      <Route exact path='/strategy' component={StrategyPage} />
    </Switch>
  </main>
)

export default MainLayoutPart;