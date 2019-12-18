import React, { Component } from 'react'
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import translate from 'redux-polyglot/translate';

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
    const results = this.props.results;
    const listItems = results.reduce(function (accumulator, currentValue, currentIndex, array) {
      if (currentValue.side !== 'NONE') {
        const nextValue = currentIndex < array.length - 1 ? array[currentIndex + 1] : { ctmString: '', price: '' };
        const diff = currentValue.price - nextValue.price;
        let color = 'success';
        if ((currentValue.side === 'BUY' && diff > 0) || (currentValue.side === 'SELL' && diff < 0)) {
          color = 'warning';
          profit += currentValue.side === 'BUY' ? diff : -diff;
        }
        const entry = <ListGroupItem color={color}>Start {currentValue.ctmString}: {currentValue.price} - {currentValue.side}; End {nextValue.ctmString}: {nextValue.price}</ListGroupItem>;
        accumulator.push(entry);
        return accumulator;
      } else {
        return accumulator;
      }
    }, []);

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