import React, { Component } from 'react'
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from 'reactstrap';
import moment from 'moment';
import * as numbers from '../../utils/numbers';

const MY_FORMAT = 'MMM D ddd HH:mm'

class ResultComponent extends Component {

  render() {
    const { side, openPrice, openDate, closePrice, closeDate, profit, volume, pip, openMargin, newBalance } = this.props;

    let color = 'muted';
    if (profit < 0) {
      color = 'danger';
    }
    if (profit > 0) {
      color = 'success';
    }

    return (
      <ListGroupItem color={color}>
        <ListGroupItemHeading>
          {side}
        </ListGroupItemHeading>
        <ListGroupItemText>
          {moment(openDate).format(MY_FORMAT)}: <Badge pill>{numbers.formatEuro(openPrice)}</Badge>
          &emsp; Volume: <Badge pill>{numbers.formatNumber(volume)}</Badge>
          &emsp; PIP: <Badge pill>{numbers.formatRon(pip)}</Badge>
          &emsp; Open margin: <Badge pill>{numbers.formatRon(openMargin)}</Badge>
          <br />
          {moment(closeDate).format(MY_FORMAT)}: <Badge pill>{numbers.formatEuro(closePrice)}</Badge>
          &emsp; Profit: <Badge pill>{numbers.formatRon(profit)}</Badge>
          &emsp; New balance: <Badge pill>{numbers.formatRon(newBalance)}</Badge>
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}

export default ResultComponent