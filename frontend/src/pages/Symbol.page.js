import React from "react";
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import SymbolRedux from '../redux/containers/Symbol.redux';
import translate from 'redux-polyglot/translate';
import LeftSidebarLayoutpart from "../layout-parts/LeftSidebar.layoutpart";

const SymbolPage = (props) => (
  <Jumbotron>
    <Container fluid={true}>
      <Row>
        <Col sm={3}>
          <LeftSidebarLayoutpart />
        </Col>
        <Col sm={9}>
          <SymbolRedux />
        </Col>
      </Row>
    </Container>
  </Jumbotron>
);

export default translate(SymbolPage);