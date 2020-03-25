import React, { Component } from 'react'
import { Row, ListGroup, Col } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import ResultComponent from './Results/Result.component';
import './Results.css';

class StrategyResultsComponent extends Component {

  render() {
    let profit = 0;
    let listItems = [];
    this.props.trades.forEach((res, idx, arr) => {
      if (res.side !== 'NONE') {
        const nextValue = idx < arr.length - 1 ? arr[idx + 1] : { date: '', price: res.price };
        listItems.push(<ResultComponent startPrice={res.price} endPrice={nextValue.price} side={res.side} startDate={res.date} endDate={nextValue.date} />);
        if (res.side === 'BUY') {
          profit += (nextValue.price - res.price);
        }
        if (res.side === 'SELL') {
          profit += (res.price - nextValue.price);
        }
      }
    });

    return (
      <Row>
        <Col>
          <h4>Profit: <span className="text-danger font-weight-bold">{profit.toFixed(2)}</span></h4>
          <h4>Strategy results:</h4>
          <ListGroup>
            {listItems}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default translate(StrategyResultsComponent)