import React, { Component } from 'react'
import { Row, ListGroup } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import ResultComponent from './StrategyResults/Result.component';

class StrategyResultsComponent extends Component {

  render() {
    if (!this.props.testResults) {
      return (<p>Waiting for results...</p>);
    }

    let profit = 0;
    let listItems = [];
    this.props.testResults.forEach((res, idx, arr) => {
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
        <p>Profit:</p>
        <p className="text-danger font-weight-bold">{profit.toFixed(2)}</p>
        <p>Strategy results:</p>
        <ListGroup>
          {listItems}
        </ListGroup>
      </Row>
    );
  }
}

export default translate(StrategyResultsComponent)