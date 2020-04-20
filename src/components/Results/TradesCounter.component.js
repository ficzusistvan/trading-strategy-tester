import React, { Component } from 'react'
import { Badge } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import * as numbers from '../../utils/numbers';

class TradesCounterComponent extends Component {

  render() {
    const { profits, losses } = this.props;

    return (
      <>
        <p>Nr. of profitable trades: <Badge pill>{numbers.formatNumber(profits)}</Badge></p>
        <p>Nr. of loosing trades: <Badge pill>{numbers.formatNumber(losses)}</Badge></p>
      </>
    );
  }
}

export default translate(TradesCounterComponent)