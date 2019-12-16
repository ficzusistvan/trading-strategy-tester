import React, { Component } from 'react'
import { Col, Row } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class StrategyResultsComponent extends Component {

  render() {
    if (!this.props.results) {
      return (
        <Row>
          <Col sm={{ size: 6 }}>
            <h4>Waiting for results</h4>
          </Col>
        </Row>
      )
    }
    const results = this.props.results;
    const listItems = results.map((res) =>
      <li>{res.price} - {res.side} - {res.ctmString}</li>
    );

    return (
      <ul>{listItems}</ul>
    );
  }
}

export default translate(StrategyResultsComponent)