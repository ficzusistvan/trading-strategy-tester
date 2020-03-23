import React, { Component } from 'react'
import "react-table/react-table.css";
import { Row, Col } from 'reactstrap';
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

class SymbolAndPeriodItemComponent extends Component {

  render() {
    const per = PERIODS.filter(el => {
      return el.val === Number(this.props.period)
    });
    return (
      <Row>
        <Col>
          <p>Symbol: {this.props.symbol} Period: {per[0].str} {this.props.isDefault ? 'default' : ''}</p>
        </Col>
      </Row>
    )
  }
}

export default translate(SymbolAndPeriodItemComponent)