import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import './LeftSidebar.layoutpart.css';
import { Link } from 'react-router-dom';
import * as eventHandler from '../tester/event-handler';

class LeftSidebarLayoutPart extends React.Component {

  onRunTestClick(e) {
    this.props.onSetIsTestFinished(false);
    eventHandler.em.emit(eventHandler.START, { strategy: this.props.strategy, allCandles: this.props.symbolsAndPeriods });
  }

  render() {
    if (!this.props.isTestFinished) {
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
              <Button block color="success" tag={Link} to='symbol-period' disabled={this.props.dataSource === null}>Add symbol & period</Button>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Button block color="success" tag={Link} to='strategy'>Select strategy</Button>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Button block color="primary" onClick={this.onRunTestClick.bind(this)} disabled={this.props.strategy === null || this.props.symbolsAndPeriods.length === 0}>Run test</Button>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Button block color="warning" tag={Link} to='charts' disabled={this.props.symbolsAndPeriods.length === 0}>View charts</Button>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col>
              <Button block color="warning" tag={Link} to='results' disabled={this.props.isTestFinished === false}>View results</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default translate(LeftSidebarLayoutPart);