import React from 'react';
import CoinMarketCapWidgetComponent from '../components/footer/CoinMarketCapWidget.component';
import translate from 'redux-polyglot/translate';
import { Col, Row, Jumbotron, Container } from 'reactstrap';

const FooterLayoutPart = () => (
  <Jumbotron>
    <Container fluid={true}>
      <Row>
        <Col sm={4}>
          <CoinMarketCapWidgetComponent currencyId="1" />
        </Col>
        <Col sm={4}>
          <CoinMarketCapWidgetComponent currencyId="1027" />
        </Col>
        <Col sm={4}>
          <CoinMarketCapWidgetComponent currencyId="52" />
        </Col>
      </Row>
    </Container>
  </Jumbotron>
)

export default translate(FooterLayoutPart);