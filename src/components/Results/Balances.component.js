import React, { Component } from 'react'
import { Badge } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class BalancesComponent extends Component {

  render() {
    const { initBalance, endBalance } = this.props;

    return (
      <>
        <p>Initial Balance: <Badge pill>{initBalance}</Badge></p>
        <p>End Balance: <Badge pill>{endBalance}</Badge></p>
        <p>Total Profit: <Badge pill>{endBalance - initBalance}</Badge></p>
      </>
    );
  }
}

export default translate(BalancesComponent)