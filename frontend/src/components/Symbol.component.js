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
const since = new Map();
since.set(1, 1);
since.set(5, 1);
since.set(15, 1);
since.set(30, 7);
since.set(60, 7);
since.set(240, 13);
since.set(1440, 13);
since.set(10080, 60);
since.set(43200, 60);

class SymbolComponent extends Component {

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
    this.socket.on('getChartLastRequest', data => {
      console.log('getChartLastRequest from socket.io:', data);
      const SCALE = Math.pow(10, data.returnData.digits);
      const parsed = data.returnData.rateInfos.map(obj => {
        const newObj = {};
        newObj.date = moment(obj.ctm).toDate();
        newObj.open = obj.open / SCALE;
        newObj.high = newObj.open + obj.high / SCALE;
        newObj.low = newObj.open + obj.low / SCALE;
        newObj.close = newObj.open + obj.close / SCALE;
        newObj.volume = obj.vol;
        return newObj;
      });
      this.setState({ data: parsed, loading: false });
    });
    this.socket.on('finishedTest', data => {
      console.log('finishedTest from socket.io:', data);
      this.setState({ results: data.trades });
    });
    this.socket.emit('getChartLastRequest', { period: DEFAULT_PERIOD, start: moment().subtract(since.get(DEFAULT_PERIOD), 'month').valueOf(), symbol: this.props.symbol });
  }

  handleStrategyChange(strategy) {
    this.setState({ strategy: strategy });
  }

  handlePeriodChange(period) {
    this.socket.emit('getChartLastRequest', { period: period, start: moment().subtract(since.get(period), 'month').valueOf(), symbol: this.props.symbol });
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

export default translate(withRouter(SymbolComponent))