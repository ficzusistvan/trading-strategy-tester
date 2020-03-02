import React from 'react';
import TesterControlsRedux from './redux/containers/TesterControls.redux';
import TesterConfigsLayoutPart from './layout-parts/TesterConfigs.layoutpart';
import ChartsLayoutPart from './layout-parts/Charts.layoutpart';
import StrategyResultsLayoutPart from './layout-parts/StrategyResults.layoutpart';
import { Container, Row, Col } from 'reactstrap';

const App = () => (
  <div>
    <Container fluid={true} >
      <Row>
        <Col sm="12">
          <TesterControlsRedux />
        </Col>
      </Row>
      <Row>
        <Col sm="2">
          <TesterConfigsLayoutPart />
        </Col>
        <Col sm="8">
          <ChartsLayoutPart />
        </Col>
        <Col sm="2">
          <StrategyResultsLayoutPart />
        </Col>
      </Row>
    </Container>
  </div>
)

export default App;