import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'reactstrap';
import translate from 'redux-polyglot/translate';

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
          <CardText className='text-danger'>{this.props.period}</CardText>
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