import React, { Component } from 'react'
import { Row, ListGroup, Col } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import ResultComponent from './Results/Result.component';
import './Results.css';
import TradesCounterComponent from './Results/TradesCounter.component';
import BalancesComponent from './Results/Balances.component';

class StrategyResultsComponent extends Component {

  render() {
    let listItems = [];
    let nrOfProfits = 0;
    let nrOfLosses = 0;
    this.props.trades.forEach((trade) => {
      listItems.push(<ResultComponent side={trade.enter.side} openPrice={trade.enter.openPrice} openDate={trade.enter.openDate} closePrice={trade.exit.closePrice} closeDate={trade.exit.closeDate} profit={trade.exit.profit} key={trade.enter.openDate} />);
      if (trade.exit.profit > 0) {
        nrOfProfits++;
      } else {
        nrOfLosses++;
      }
    });

    return (
      <Row>
        <Col>
          <BalancesComponent initBalance={this.props.initBalance} endBalance={this.props.endBalance} />
          <TradesCounterComponent profits={nrOfProfits} losses={nrOfLosses} />
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