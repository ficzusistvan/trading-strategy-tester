import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import './LeftSidebar.layoutpart.css';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

class LeftSidebarLayoutPart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  componentDidMount() {

    if (process.env.REACT_APP_IS_SOCKET_IO_IN_DEVELOPMENT_MODE === '1') {
      this.socket = socketIOClient('localhost:3005');
    } else {
      this.socket = socketIOClient(); // auto discovery
    }

    this.socket.on('finishedTest', data => {
      console.log('finishedTest from socket.io:', data);
      this.setState({ loading: false });
    });
  }

  onRunTestClick(e) {
    this.setState({ loading: true });
    this.socket.emit('runTest', { 
      dataSource: this.props.dataSource, 
      symbolsAndPeriods: this.props.symbolsAndPeriods,
      strategy: this.props.strategy 
    });
  }

  render() {
    if (this.state.loading) {
      return <img alt='' src='loading.gif' />;
    }
    return (
      <Row className='left-sidebar'>
        <Col>
          <Row>
            <Col className="text-center">
              <h3>Trading Strategy Tester</h3>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Button block color="success" tag={Link} to='data-source'>Select data source</Button>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Button block color="success" tag={Link} to='symbol-period'>Add symbol & period</Button>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Button block color="success" tag={Link} to='strategy'>Select strategy</Button>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Button block color="primary" onClick={this.onRunTestClick.bind(this)}>Run test</Button>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Button block color="warning" tag={Link} to='charts'>View charts</Button>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Button block color="warning" tag={Link} to='results'>View results</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default translate(LeftSidebarLayoutPart);