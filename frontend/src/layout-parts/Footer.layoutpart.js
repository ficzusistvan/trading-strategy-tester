import React from 'react';
import CoinMarketCapWidgetComponent from '../components/footer/CoinMarketCapWidget.component';
import translate from 'redux-polyglot/translate';
import { Col, Row } from 'reactstrap';

const FooterLayoutPart = () => (
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
)

export default translate(FooterLayoutPart);