import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'reactstrap';
import translate from 'redux-polyglot/translate';

const PERIODS = new Map();
PERIODS.set(1, 'M1');
PERIODS.set(5, 'M5');
PERIODS.set(15, 'M15');
PERIODS.set(30, 'M30');
PERIODS.set(60, 'H1');
PERIODS.set(240, 'H4');
PERIODS.set(1440, 'D1');
PERIODS.set(10080, 'W1');
PERIODS.set(43200, 'MN1');

class TesterConfigComponent extends Component {

  render() {
    return (
      <Card body outline color='info'>
        <Card body outline color="primary">
          <CardTitle>Data source:</CardTitle>
          <CardText className='text-danger'>{this.props.dataSource}</CardText>
        </Card>
        <Card body outline color="primary">
          <CardTitle>Symbol:</CardTitle>
          <CardText className='text-danger'>{this.props.symbol}</CardText>
        </Card>
        <Card body outline color="primary">
          <CardTitle>Period:</CardTitle>
          <CardText className='text-danger'>{PERIODS.get(Number(this.props.period))}</CardText>
        </Card>
        <Card body outline color="primary">
          <CardTitle>Strategy:</CardTitle>
          <CardText className='text-danger'>{this.props.strategy}</CardText>
        </Card>
      </Card>
    );
  }
}

export default translate(TesterConfigComponent)