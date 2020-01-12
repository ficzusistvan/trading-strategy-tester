import React from "react";
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import LeftSidebarLayoutpart from '../layout-parts/LeftSidebar.layoutpart';
import TesterRedux from '../redux/containers/Tester.redux';
import translate from 'redux-polyglot/translate';

const HomePage = (props) => (
  <Jumbotron>
    <Container fluid={true}>
      <Row>
        <Col sm={3}>
          <LeftSidebarLayoutpart />
        </Col>
        <Col sm={9}>
          <TesterRedux />
        </Col>
      </Row>
    </Container>
  </Jumbotron>
);

export default translate(HomePage);