import React from "react";
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import LeftSidebarLayoutpart from '../layout-parts/LeftSidebar.layoutpart';
import TesterRedux from '../redux/containers/Tester.redux';
import TesterResultsRedux from '../redux/containers/TesterResults.redux';
import translate from 'redux-polyglot/translate';

const HomePage = (props) => (
  <Jumbotron>
    <Container fluid={true}>
      <Row>
        <Col sm={2}>
          <LeftSidebarLayoutpart />
        </Col>
        <Col sm={7}>
          <TesterRedux />
        </Col>
        <Col sm={3}>
          <TesterResultsRedux />
        </Col>
      </Row>
    </Container>
  </Jumbotron>
);

export default translate(HomePage);