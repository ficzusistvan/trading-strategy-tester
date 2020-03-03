import React, { Component } from 'react'
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import Chart from './Charts/Chart';

class ChartsComponent extends Component {

  render() {
    if (!this.props.candles) {
      return (<p>Waiting for candles...</p>);
    }

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
      return parsedCandles;
    });

    const charts = allParsedCandles.map(candles => {
      return <Chart type='hybrid' data={candles} />
    });

    return (
      <div>
        {charts}
      </div>
    )
  }
}

export default translate(ChartsComponent)