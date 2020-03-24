import React, { Component } from 'react'
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import Chart from './Charts/Chart';
import socketIOClient from 'socket.io-client';
import './Charts.css';

class ChartsComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      candles: null
    }
  }

  componentDidMount() {

    if (process.env.REACT_APP_IS_SOCKET_IO_IN_DEVELOPMENT_MODE === '1') {
      this.socket = socketIOClient('localhost:' + process.env.REACT_APP_SOCKET_IO_PORT);
    } else {
      this.socket = socketIOClient(); // auto discovery
    }

    this.socket.on('respCandles', data => {
      console.log('respCandles from socket.io:', data);
      this.setState({ candles: data, loading: false });
    });

    this.socket.emit('getCandles', {});
  }

  render() {
    if (!this.state.candles) {
      return <img alt='' src='loading.gif' />;
    }

    const allParsedCandles = this.state.candles.map(candleObj => {
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