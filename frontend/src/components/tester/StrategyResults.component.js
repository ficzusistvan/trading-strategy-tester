import React, { Component } from 'react'
import { Col, Row, ListGroup } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import ResultComponent from './Result.component';

class StrategyResultsComponent extends Component {

  render() {
    if (!this.props.results) {
      return (
        <Row>
          <Col sm={{ size: 12 }}>
            <h6>Waiting for results</h6>
          </Col>
        </Row>
      )
    }

    let profit = 0;
    let listItems = [];
    this.props.results.forEach((res, idx, arr) => {
      if (res.side !== 'NONE') {
        const nextValue = idx < arr.length - 1 ? arr[idx + 1] : { ctmString: '', price: '' };
        listItems.push(<ResultComponent startPrice={res.price} endPrice={nextValue.price} side={res.side} startCtm={res.ctmString} endCtm={nextValue.ctmString} />);
      }
    });

    return (
      <Row>
        <Col sm={{ size: 12 }}>
          <h6>Profit:</h6>
          <p class="text-danger font-weight-bold">{profit.toFixed(2)}</p>
          <h6>Strategy results:</h6>
          <ListGroup>{listItems}</ListGroup>
        </Col>
      </Row>
    );
  }
}

export default translate(StrategyResultsComponent)