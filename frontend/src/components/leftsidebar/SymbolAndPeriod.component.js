import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import "react-table/react-table.css";
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

class SymbolAndPeriodComponent extends Component {

  render() {
    return (
      <>
        <div>
          <p>Symbol: {this.props.symbol}</p>
        </div>
        <div>
          <p>Period: {PERIODS.get(Number(this.props.period))}</p>
        </div>
      </>
    )
  }
}

export default translate(withRouter(SymbolAndPeriodComponent))