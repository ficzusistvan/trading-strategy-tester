import React from 'react';
import { Switch, Route } from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import SelectDataSourceRedux from '../redux/containers/SelectDataSource.redux';
import SetupDataSourceRedux from '../redux/containers/SetupDataSource.redux';
import AddSymbolAndPeriodRedux from '../redux/containers/AddSymbolAndPeriod.redux';
import SelectStrategyRedux from '../redux/containers/SelectStrategy.redux';
import ChartsRedux from '../redux/containers/Charts.redux';
import ResultsRedux from '../redux/containers/Results.redux';
import ResultsChartsRedux from '../redux/containers/ResultsCharts.redux';
import { Row, Col } from 'reactstrap';
import './Main.layoutpart.css';

const MainLayoutPart = () => (
  <Row className='main'>
    <Col>
      <Switch>
        <Route exact path='/data-source' component={SelectDataSourceRedux} />
        <Route exact path='/setup-data-source' component={SetupDataSourceRedux} />
        <Route exact path='/symbol-period' component={AddSymbolAndPeriodRedux} />
        <Route exact path='/strategy' component={SelectStrategyRedux} />
        <Route exact path='/charts' component={ChartsRedux} />
        <Route exact path='/results' component={ResultsRedux} />
        <Route exact path='/results-charts' component={ResultsChartsRedux} />
      </Switch>
    </Col>
  </Row>
)

export default translate(MainLayoutPart);