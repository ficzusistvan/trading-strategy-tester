import React, { Component } from 'react'
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import moment from 'moment'

const MY_FORMAT = 'MMM D ddd HH:mm'

class ResultComponent extends Component {

  render() {
    const { startPrice, endPrice, side, startDate, endDate } = this.props;

    const diff = startPrice - endPrice;
    let color = 'success';
    if ((side === 'BUY' && diff > 0) || (side === 'SELL' && diff < 0)) {
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
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}

export default translate(ResultComponent)