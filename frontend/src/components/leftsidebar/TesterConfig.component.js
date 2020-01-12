import React, { Component } from 'react'
import { Col, Row, ListGroup } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import ResultComponent from '../tester/Result.component';

class TesterConfigComponent extends Component {

  render() {
    return (
      <>
        <Row>
          <Col sm={{ size: 12 }}>
            <h6>Data source:</h6>
            <p class="text-danger font-weight-bold">{this.props.dataSource}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 12 }}>
            <h6>Symbol:</h6>
            <p class="text-danger font-weight-bold">{this.props.symbol}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 12 }}>
            <h6>Period:</h6>
            <p class="text-danger font-weight-bold">{this.props.period}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 12 }}>
            <h6>Strategy:</h6>
            <p class="text-danger font-weight-bold">{this.props.strategy}</p>
          </Col>
        </Row>
      </>
    );
  }
}

export default translate(TesterConfigComponent)