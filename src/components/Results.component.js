import React, { Component } from 'react'
import { Row, ListGroup, Col, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import ResultComponent from './Results/Result.component';
import './Results.css';
import TradesCounterComponent from './Results/TradesCounter.component';

class StrategyResultsComponent extends Component {

  render() {
    let configItems = [];
    let profit = 0;
    let listItems = [];
    let profits = 0;
    let losses = 0;
    this.props.trades.forEach((res, idx, arr) => {
      if (res.side !== 'NONE') {
        const nextValue = idx < arr.length - 1 ? arr[idx + 1] : { date: '', price: res.price };
        listItems.push(<ResultComponent startPrice={res.price} endPrice={nextValue.price} side={res.side} startDate={res.date} endDate={nextValue.date} key={idx} />);
        if (res.side === 'BUY') {
          profit += (nextValue.price - res.price);
          if ((nextValue.price - res.price) > 0) {
            profits++;
          } else {
            losses++;
          }
        }
        if (res.side === 'SELL') {
          profit += (res.price - nextValue.price);
          if ((res.price - nextValue.price) > 0) {
            profits++;
          } else {
            losses++;
          }
        }
      }
    });

    for (let [key, value] of Object.entries(this.props.configs)) {
      configItems.push(<ListGroupItem>
        <ListGroupItemHeading>
          {key}
        </ListGroupItemHeading>
        <ListGroupItemText>
          {value}
        </ListGroupItemText>
      </ListGroupItem>);
    };

    return (
      <Row>
        <Col>
          <h4>Configs:</h4>
          <ListGroup>
            {configItems}
          </ListGroup>
          <h4>Profit: <span className="text-danger font-weight-bold">{profit.toFixed(2)}</span></h4>
          <TradesCounterComponent profits={profits} losses={losses} />
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