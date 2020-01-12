import React, { Component } from 'react'
import { ListGroupItem } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class ResultComponent extends Component {

  render() {
    const { startPrice, endPrice, side, startCtm, endCtm } = this.props;

    const diff = startPrice - endPrice;
    let color = 'success';
    if ((side === 'BUY' && diff > 0) || (side === 'SELL' && diff < 0)) {
      color = 'warning';
    }

    return (
      <ListGroupItem color={color}>Start {startCtm}: {startPrice} - {side}; End {endCtm}: {endPrice}</ListGroupItem>
    );
  }
}

export default translate(ResultComponent)