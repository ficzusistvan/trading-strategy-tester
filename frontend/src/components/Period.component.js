import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Input, Card } from 'reactstrap';
import translate from 'redux-polyglot/translate';

const PERIODS = [
  { str: 'M1', val: 1 },
  { str: 'M5', val: 5 },
  { str: 'M15', val: 15 },
  { str: 'M30', val: 30 },
  { str: 'H1', val: 60 },
  { str: 'H4', val: 240 },
  { str: 'D1', val: 1440 },
  { str: 'W1', val: 10080 },
  { str: 'MN1', val: 43200 }
];

class PeriodComponent extends Component {

  onHandleChange(e) {
    this.props.onSetPeriod(e.target.value);
  }

  render() {
    const options = [];
    for (let i = 0; i < PERIODS.length; i++) {
      options.push(<option value={PERIODS[i].val} key={i}>{PERIODS[i].str}</option>);
    }
    return (
      <Card body outline color='warning'>
        <Input type="select" name="period" id="periodSelect" value={this.props.period} onChange={this.onHandleChange.bind(this)}>
          {options}
        </Input>
      </Card>
    )
  }
}

export default translate(withRouter(PeriodComponent))