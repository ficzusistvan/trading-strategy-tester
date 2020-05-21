import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import './LeftSidebar.layoutpart.css';
import { Link } from 'react-router-dom';
import * as eventHandler from '../tester/event-handler';
import SymbolAndPeriodItemComponent from '../components/SymbolAndPeriod/SymbolAndPeriodItem.component';
import * as numbers from '../utils/numbers';

class LeftSidebarLayoutPart extends React.Component {

  onRunTestClick(e) {
    this.props.onSetIsTestFinished(false);
    eventHandler.em.emit(eventHandler.START, { strategy: this.props.strategy, allCandles: this.props.symbolsAndPeriods });
  }

  render() {
    if (!this.props.isTestFinished) {
      return <img alt='' src='loading.gif' />;
    }
    let listItems = [];
    this.props.symbolsAndPeriods.forEach((res, idx, arr) => {
      listItems.push(<SymbolAndPeriodItemComponent key={res.symbol + res.period} symbol={res.symbol} period={res.period} isDefault={res.isDefault} nrOfCandles={res.candles.length} />);
    });
    return (
      <>
        <Row className='left-sidebar-1'>
          <Col>
            <Row>
              <Col className="text-center">
                <h4>Trading Strategy Tester</h4>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="success" tag={Link} to='data-source'>Select data source</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="success" tag={Link} to='setup-data-source'>Setup data source</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="success" tag={Link} to='symbol-period' disabled={this.props.dataSource === null}>Add symbol & period</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="success" tag={Link} to='strategy'>Select strategy</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="primary" onClick={this.onRunTestClick.bind(this)} disabled={this.props.strategy === '' || this.props.symbolsAndPeriods.length === 0}>Run test</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="warning" tag={Link} to='charts' disabled={this.props.isTestFinished === false || this.props.chartMainCandles.length === 0}>View charts</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="warning" tag={Link} to='results' disabled={this.props.isTestFinished === false}>View results</Button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                <Button className="btn-ls" block color="warning" tag={Link} to='results-charts' disabled={this.props.isTestFinished === false}>View results charts</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='left-sidebar-2'>
          <Col>
            <Row className='my-1'>
              <Col className="border-bottom border-top">
                <p className="font-weight-bold">Selected data source:</p>
                <p>{this.props.dataSource}</p>
                <p className="font-weight-bolder">Currency price:</p>
                <p>{numbers.formatRon(this.props.currencyPrice)}</p>
                <p className="font-weight-bolder">Leverage:</p>
                <p>{numbers.formatNumber(this.props.leverage)}</p>
                <p className="font-weight-bolder">Nominal value:</p>
                <p>{numbers.formatNumber(this.props.nominalValue)}</p>
              </Col>
            </Row>
            <Row className='my-1'>
              <Col className="border-bottom border-top">
                <p className="font-weight-bold">Added symbols and periods:</p>
                {listItems}
              </Col>
            </Row>
            <Row className='my-1'>
              <Col className="border-bottom border-top">
                <p className="font-weight-bold">Selected strategy:</p>
                <p>{this.props.strategy}</p>
                <p className="font-weight-bolder">Init balance:</p>
                <p>{numbers.formatRon(this.props.initBalance)}</p>
                <p className="font-weight-bolder">Margin to balance percent:</p>
                <p>{numbers.formatPercent(this.props.marginToBalancePercent)}</p>
                <p className="font-weight-bolder">Day and night spreads:</p>
                <p>{numbers.formatNumber(this.props.dayTimeSpread)} and {numbers.formatNumber(this.props.nightTimeSpread)}</p>
                <p className="font-weight-bolder">Lot size:</p>
                <p>{numbers.formatNumber(this.props.lotSize)}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

export default translate(LeftSidebarLayoutPart);