import React, { Component } from 'react'
import { ListGroupItem } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class ResultComponent extends Component {

  render() {
    const { startPrice, endPrice, side, startDate, endDate } = this.props;

    const diff = startPrice - endPrice;
    let color = 'success';
    if ((side === 'BUY' && diff > 0) || (side === 'SELL' && diff < 0)) {
      color = 'warning';
    }

    return (
      <ListGroupItem color={color}>Start {startDate}: {startPrice} - {side}; End {endDate}: {endPrice}</ListGroupItem>
    );
  }
}

export default translate(ResultComponent)