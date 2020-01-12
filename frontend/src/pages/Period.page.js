import React from "react";
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import PeriodRedux from '../redux/containers/Period.redux';
import translate from 'redux-polyglot/translate';
import LeftSidebarLayoutpart from "../layout-parts/LeftSidebar.layoutpart";

const PeriodPage = (props) => (
  <Jumbotron>
    <Container fluid={true}>
      <Row>
        <Col sm={3}>
          <LeftSidebarLayoutpart />
        </Col>
        <Col sm={9}>
          <PeriodRedux />
        </Col>
      </Row>
    </Container>
  </Jumbotron>
);

export default translate(PeriodPage);