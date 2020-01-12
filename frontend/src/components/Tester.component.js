import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Card, CardTitle } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import axios from 'axios';
import moment from 'moment';
import Chart from './tester/Chart';
import socketIOClient from 'socket.io-client';

class TesterComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      candles: [],
      loading: true
    };
  }

  async componentDidMount() {
    if (this.props.dataSource !== null && this.props.symbol !== null && this.props.period !== null) {
      const resp = await axios.get('/api/candles/' + this.props.dataSource + '/' + this.props.symbol + '/' + this.props.period);
      console.log(resp);

      const parsedCandles = resp.data.candles.map(candle => {
        let obj = {};
        obj.date = moment(candle.date).toDate();
        obj.open = candle.open;
        obj.high = candle.high;
        obj.low = candle.low;
        obj.close = candle.close;
        obj.volume = candle.volume;
        return obj;
      })

      this.setState({ candles: parsedCandles, loading: false })
    }

    if (process.env.REACT_APP_IS_SOCKET_IO_IN_DEVELOPMENT_MODE === '1') {
      this.socket = socketIOClient('localhost:3005');
    } else {
      this.socket = socketIOClient(); // auto discovery
    }

    this.socket.on('finishedTest', data => {
      console.log('finishedTest from socket.io:', data);
      this.props.onSetTestResults(data.trades);
    });
  }

  handleRunTestClick() {
    this.socket.emit('runTest', { strategy: this.props.strategy });
  }

  render() {
    const { candles, loading } = this.state
    if (this.props.dataSource === null || this.props.symbol === null || this.props.period === null) {
      return (
        <Card body outline color='primary'>
          <CardTitle>Waiting for all infos to be set!</CardTitle>
        </Card>
      )
    }
    if (loading) {
      return (
        <Card body outline color='primary'>
          <CardTitle>Loading...</CardTitle>
        </Card>
      )
    }
    return (
      <Card body outline color='primary'>
        <Button color="primary" block onClick={this.handleRunTestClick.bind(this)}>Run Test</Button>
        <Chart type='hybrid' data={candles} />
      </Card>
    )
  }
}

export default translate(withRouter(TesterComponent))