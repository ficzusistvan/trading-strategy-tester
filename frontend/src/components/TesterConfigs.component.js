import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import SymbolAndPeriodModalRedux from '../redux/containers/SymbolAndPeriodModal.redux';
import SelectDataSourceModal from './TesterConfigs/SelectDataSource.modal';
import SelectStrategyModal from './TesterConfigs/SelectStrategy.modal';
import SymbolAndPeriodItemComponent from './TesterConfigs/SymbolAndPeriodItem.component';

class TesterConfigsComponent extends Component {

  render() {

    let listItems = [];
    this.props.symbolsAndPeriods.forEach((res, idx, arr) => {
      listItems.push(<SymbolAndPeriodItemComponent key={res.symbol + res.period} symbol={res.symbol} period={res.period} />);
    });

    return (
      <>
        <Row>
          <Col sm="12">
            <SelectDataSourceModal buttonLabel="Select data source" />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <SymbolAndPeriodModalRedux buttonLabel="Add new symbol and period" isDataSourceSelected={this.props.dataSource} />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <SelectStrategyModal buttonLabel="Select strategy" />
          </Col>
        </Row>
        <Row>
          <Col sm="3">Data source:</Col>
          <Col sm="9">{this.props.dataSource}</Col>
        </Row>
        <Row>
          <Col sm="3">Symbols and periods:</Col>
          <Col sm="9">
            {listItems}
          </Col>
        </Row>
        <Row>
          <Col sm="3">Strategy:</Col>
          <Col sm="9">{this.props.strategy}</Col>
        </Row>
      </>
    );
  }
}

export default translate(TesterConfigsComponent)