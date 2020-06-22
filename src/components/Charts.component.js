import React, { Component } from 'react'
import moment from 'moment';
import { Col, Row } from 'reactstrap';
import Chart from './Charts/Chart';
import './Charts.css';

class ChartsComponent extends Component {

  render() {
    const allParsedCandles = this.props.symbolsAndPeriods.map(obj => {
      let parsedCandles;
      if (!obj.isDefault) {
        parsedCandles = obj.candles.map(candle => {
          let obj = {};
          obj.date = moment(candle.date).toDate();
          obj.open = candle.open;
          obj.high = candle.high;
          obj.low = candle.low;
          obj.close = candle.close;
          obj.volume = candle.volume;
          return obj;
        });
      } else {
        parsedCandles = this.props.chartMainCandles.map(candle => {
          let obj = {};
          obj.date = moment(candle.date).toDate();
          obj.open = candle.open;
          obj.high = candle.high;
          obj.low = candle.low;
          obj.close = candle.close;
          obj.volume = candle.volume;
          obj.text = candle.text;
          return obj;
        });
      }
      parsedCandles.symbol = obj.symbol;
      parsedCandles.period = obj.period;
      return parsedCandles;
    });

    const charts = allParsedCandles.map(candles => {
      return (
        <Row className='mb-5' key={candles.symbol + '_' + candles.period}>
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

export default ChartsComponent