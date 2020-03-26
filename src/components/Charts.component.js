import React, { Component } from 'react'
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import { Col, Row } from 'reactstrap';
import Chart from './Charts/Chart';
import './Charts.css';

class ChartsComponent extends Component {

  render() {
    const allParsedCandles = this.props.candles.map(candleObj => {
      let parsedCandles = candleObj.candles.map(candle => {
        let obj = {};
        obj.date = moment(candle.date).toDate();
        obj.open = candle.open;
        obj.high = candle.high;
        obj.low = candle.low;
        obj.close = candle.close;
        obj.volume = candle.volume;
        return obj;
      });
      parsedCandles.symbol = candleObj.symbol;
      parsedCandles.period = candleObj.period;
      return parsedCandles;
    });

    const charts = allParsedCandles.map(candles => {
      return (
        <Row className='mb-5'>
          <Col>
            <h4>Chart of symbol {candles.symbol} with {candles.period} period</h4>
            <Chart type='hybrid' data={candles} />
          </Col>
        </Row>
      )
    });

    return (
      <>
        {charts}
      </>
    )
  }
}

export default translate(ChartsComponent)