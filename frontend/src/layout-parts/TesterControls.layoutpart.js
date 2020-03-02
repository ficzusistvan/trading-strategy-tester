import socketIOClient from 'socket.io-client';
import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class TesterControlsComponent extends Component {

  componentDidMount() {
    if (process.env.REACT_APP_IS_SOCKET_IO_IN_DEVELOPMENT_MODE === '1') {
      this.socket = socketIOClient('localhost:3005');
    } else {
      this.socket = socketIOClient(); // auto discovery
    }

    this.socket.on('returnedCandles', data => {
      console.log('returnedCandles from socket.io:', data);
      this.props.onSetCandles(data);
    });

    this.socket.on('finishedTest', data => {
      console.log('finishedTest from socket.io:', data);
      this.props.onSetTestResults(data.trades);
    });
  }

  handleGetCandlesClick() {
    this.socket.emit('getCandles', { dataSource: this.props.dataSource, symbolsAndPeriods: this.props.symbolsAndPeriods });
  }

  handleRunTestClick() {
    this.socket.emit('runTest', { strategy: this.props.strategy });
  }

  render() {

    return (
      <>
        <Row>
          <Col sm="6">
            <Button block color="primary" onClick={this.handleGetCandlesClick.bind(this)}>Get Candles</Button>
          </Col>
          <Col sm="6">
            <Button block color="primary" onClick={this.handleRunTestClick.bind(this)}>Run Test</Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default translate(TesterControlsComponent)