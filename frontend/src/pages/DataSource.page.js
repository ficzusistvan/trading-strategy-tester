import React from "react";
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import DataSourceRedux from '../redux/containers/DataSource.redux';
import translate from 'redux-polyglot/translate';
import LeftSidebarLayoutpart from "../layout-parts/LeftSidebar.layoutpart";

const DataSourcePage = (props) => (
  <Jumbotron>
    <Container fluid={true}>
      <Row>
        <Col sm={3}>
          <LeftSidebarLayoutpart />
        </Col>
        <Col sm={9}>
          <DataSourceRedux />
        </Col>
      </Row>
    </Container>
  </Jumbotron>
);

export default translate(DataSourcePage);