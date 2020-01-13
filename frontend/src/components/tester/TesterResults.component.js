import React, { Component } from 'react'
import { ListGroup, Card, CardTitle } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import ResultComponent from './Result.component';

class TesterResultsComponent extends Component {

  render() {
    if (!this.props.testResults) {
      return (
        <Card body outline color='danger'>
          <CardTitle>Waiting for results</CardTitle>
        </Card>
      )
    }

    let profit = 0;
    let listItems = [];
    this.props.testResults.forEach((res, idx, arr) => {
      if (res.side !== 'NONE') {
        const nextValue = idx < arr.length - 1 ? arr[idx + 1] : { date: '', price: '' };
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
      <Card body outline color='danger'>
        <CardTitle>Profit:</CardTitle>
        <p className="text-danger font-weight-bold">{profit.toFixed(2)}</p>
        <h6>Strategy results:</h6>
        <ListGroup>{listItems}</ListGroup>
      </Card>
    );
  }
}

export default translate(TesterResultsComponent)