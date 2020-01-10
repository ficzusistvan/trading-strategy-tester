import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Col, Button, Row } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import socketIOClient from 'socket.io-client';
import moment from 'moment';
import Chart from './Chart';
import StrategiesComponent from './Strategies.component';
import PeriodChooserComponent from './PeriodChooser.component';
import StrategyResultsComponent from './StrategyResults.component';

const DEFAULT_PERIOD = 5;

class AVSymbolComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      period: DEFAULT_PERIOD,
      strategy: null,
      data: [],
      results: null,
      loading: true
    };
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleStrategyChange = this.handleStrategyChange.bind(this);
  }

  componentDidMount() {
    if (process.env.REACT_APP_IS_SOCKET_IO_IN_DEVELOPMENT_MODE === '1') {
      this.socket = socketIOClient('localhost:3005');
    } else {
      this.socket = socketIOClient(); // auto discovery
    }
    this.socket.on('getTimeSeriesIntraday', data => {
      console.log('getTimeSeriesIntraday from socket.io:', data);
      const parsed = [];
      for (let [key1, value1] of Object.entries(data)) {
        if (key1.includes('Time Series')) {
          for (let [key2, value2] of Object.entries(value1)) {
            const newObj = {};
            newObj.date = moment(key2).toDate();
            newObj.open = value2['1. open'];
            newObj.high = value2['2. high'];
            newObj.low = value2['3. low'];
            newObj.close = value2['4. close'];
            newObj.volume = value2['5. volume'];
            parsed.unshift(newObj);
          }
        }
      }
      this.setState({ data: parsed, loading: false });
    });
    this.socket.on('finishedTest', data => {
      console.log('finishedTest from socket.io:', data);
      this.setState({ results: data.trades });
    });
    this.socket.emit('getTimeSeriesIntraday', { symbol: this.props.symbol, interval: DEFAULT_PERIOD + 'min' });
  }

  handleStrategyChange(strategy) {
    this.setState({ strategy: strategy });
  }

  handlePeriodChange(period) {
    this.socket.emit('getTimeSeriesIntraday', { symbol: this.props.symbol, period: period });
    this.setState({ period: period, loading: true });
  }

  handleRunTestClick() {
    this.socket.emit('runTest', { strategy: this.state.strategy });
  }

  render() {
    const { period, data, loading } = this.state
    if (loading) {
      return <div>Loading...</div>
    }
    return (
      <>
        <h3>Working with symbol: {this.props.symbol}</h3>
        <Row>
          <Col sm="9">
            <Row>
              <Col sm="4">
                <PeriodChooserComponent defaultPeriod={period} handlePeriodChange={this.handlePeriodChange} />
              </Col>
              <Col sm="4">
                <StrategiesComponent handleStrategyChange={this.handleStrategyChange} />
              </Col>
              <Col sm="4">
                <Button block onClick={this.handleRunTestClick.bind(this)}>Run Test</Button>
              </Col>
            </Row>
            <Chart type='hybrid' data={data} />
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

export default translate(withRouter(AVSymbolComponent))