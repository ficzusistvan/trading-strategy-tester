import React, { Component } from 'react'
import { Badge } from 'reactstrap';
import * as numbers from '../../utils/numbers';

class TradesCounterComponent extends Component {

  render() {
    const { profits, losses, zeros } = this.props;

    return (
      <>
        <p>Nr. of profitable trades: <Badge pill>{numbers.formatNumber(profits)}</Badge></p>
        <p>Nr. of loosing trades: <Badge pill>{numbers.formatNumber(losses)}</Badge></p>
        <p>Nr. of zero trades: <Badge pill>{numbers.formatNumber(zeros)}</Badge></p>
      </>
    );
  }
}

export default TradesCounterComponent