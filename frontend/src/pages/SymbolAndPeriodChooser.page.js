import React from "react";
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import SymbolAndPeriodChooserRedux from '../redux/containers/SymbolAndPeriodChooser.redux';
import translate from 'redux-polyglot/translate';
import LeftSidebarLayoutpart from "../layout-parts/LeftSidebar.layoutpart";

const SymbolAndPeriodChooserPage = (props) => (
  <Jumbotron>
    <Container fluid={true}>
      <Row>
        <Col sm={3}>
          <LeftSidebarLayoutpart />
        </Col>
        <Col sm={9}>
          <SymbolAndPeriodChooserRedux />
        </Col>
      </Row>
    </Container>
  </Jumbotron>
);

export default translate(SymbolAndPeriodChooserPage);