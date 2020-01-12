import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Col, Button, Row } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import axios from 'axios';
import moment from 'moment';
import Chart from './tester/Chart';
import StrategyResultsComponent from './tester/StrategyResults.component';

class TesterComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      candles: [],
      results: null,
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
    /*this.socket.on('finishedTest', data => {
      console.log('finishedTest from socket.io:', data);
      this.setState({ results: data.trades });
    });
    this.socket.emit('getTimeSeriesIntraday', { symbol: this.props.symbol, interval: DEFAULT_PERIOD + 'min' });*/
  }

  handleRunTestClick() {
    /*this.socket.emit('runTest', { strategy: this.state.strategy });*/
  }

  render() {
    const { candles, loading } = this.state
    if (loading) {
      return <div>Loading...</div>
    }
    return (
      <>
        <Row>
          <Col sm="9">
            <Row>
              <Col sm="4">
                <Button block onClick={this.handleRunTestClick.bind(this)}>Run Test</Button>
              </Col>
            </Row>
            <Chart type='hybrid' data={candles} />
          </Col>
          <Col sm="3">
            <h3>Results</h3>
            <StrategyResultsComponent results={this.state.results} />
          </Col>
        </Row>
      </>
    )
  }
}

export default translate(withRouter(TesterComponent))