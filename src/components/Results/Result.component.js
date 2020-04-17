import React, { Component } from 'react'
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import moment from 'moment'

const MY_FORMAT = 'MMM D ddd HH:mm'

class ResultComponent extends Component {

  render() {
    const { side, openPrice, openDate, closePrice, closeDate, profit } = this.props;

    let color = 'success';
    if (profit < 0) {
      color = 'danger';
    }

    return (
      <ListGroupItem color={color}>
        <ListGroupItemHeading>
          {side}
        </ListGroupItemHeading>
        <ListGroupItemText>
          {moment(openDate).format(MY_FORMAT)}: <Badge pill>{openPrice}</Badge>
          <br />
          {moment(closeDate).format(MY_FORMAT)}: <Badge pill>{closePrice}</Badge>
          <br />
          Profit: <Badge pill>{profit.toFixed(2)}</Badge>
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}

export default translate(ResultComponent)