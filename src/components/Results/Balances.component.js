import React, { Component } from 'react'
import { Badge } from 'reactstrap';
import * as numbers from '../../utils/numbers';

class BalancesComponent extends Component {

  render() {
    const { initBalance, endBalance } = this.props;

    return (
      <>
        <p>Initial Balance: <Badge pill>{numbers.formatRon(initBalance)}</Badge></p>
        <p>End Balance: <Badge pill>{numbers.formatRon(endBalance)}</Badge></p>
        <p>Total Profit: <Badge pill>{numbers.formatRon(endBalance - initBalance)}</Badge></p>
      </>
    );
  }
}

export default BalancesComponent