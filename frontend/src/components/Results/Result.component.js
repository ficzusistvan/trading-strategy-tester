import React, { Component } from 'react'
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import moment from 'moment'

const MY_FORMAT = 'MMM D ddd HH:mm'

class ResultComponent extends Component {

  render() {
    const { startPrice, endPrice, side, startDate, endDate } = this.props;

    let color = 'success';
    let profit = 0;
    if (side === 'BUY') {
      profit = endPrice - startPrice;
    } else if (side === 'SELL') {
      profit = startPrice - endPrice;
    } else {
      // not reachable...
    }

    if (profit < 0) {
      color = 'danger';
    }

    return (
      <ListGroupItem color={color}>
        <ListGroupItemHeading>
          {side}
        </ListGroupItemHeading>
        <ListGroupItemText>
          {moment(startDate).format(MY_FORMAT)}: <Badge pill>{startPrice}</Badge>
          <br />
          {moment(endDate).format(MY_FORMAT)}: <Badge pill>{endPrice}</Badge>
          <br />
          Profit: <Badge pill>{profit.toFixed(2)}</Badge>
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}

export default translate(ResultComponent)