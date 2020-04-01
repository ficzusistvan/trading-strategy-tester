import React, { Component } from 'react'
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class TradesCounterComponent extends Component {

  render() {
    const { profits, losses } = this.props;

    return (
      <>
        <p>Nr. of profitable trades: <Badge pill>{profits}</Badge></p>
        <p>Nr. of loosing trades: <Badge pill>{losses}</Badge></p>
      </>
    );
  }
}

export default translate(TradesCounterComponent)