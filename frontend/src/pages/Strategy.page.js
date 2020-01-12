import React from "react";
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import StrategyRedux from '../redux/containers/Strategy.redux';
import translate from 'redux-polyglot/translate';
import LeftSidebarLayoutpart from "../layout-parts/LeftSidebar.layoutpart";

const StrategyPage = (props) => (
  <Jumbotron>
    <Container fluid={true}>
      <Row>
        <Col sm={3}>
          <LeftSidebarLayoutpart />
        </Col>
        <Col sm={9}>
          <StrategyRedux />
        </Col>
      </Row>
    </Container>
  </Jumbotron>
);

export default translate(StrategyPage);