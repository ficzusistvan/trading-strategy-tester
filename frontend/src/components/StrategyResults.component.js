import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import DataSourceComponent from './TesterConfigs/DataSource.component';
import SymbolAndPeriodChooserComponent from './TesterConfigs/SymbolAndPeriodChooser.component';

class StrategyResultsComponent extends Component {

  render() {

    let listItems = [];
    //this.props.symbolsAndPeriods.forEach((res, idx, arr) => {
    //  listItems.push(<SymbolAndPeriodComponent symbol={res.symbol} period={res.period} />);
    //});

    return (
      <Card body outline color='info'>
        <DataSourceComponent />
        <SymbolAndPeriodChooserComponent />
        <Card body outline color="primary">
          <CardTitle>Data source:</CardTitle>
          <CardText className='text-danger font-weight-bold'>{this.props.dataSource}</CardText>
        </Card>
        <Card body outline color="primary">
          <CardTitle>Symbols and periods:</CardTitle>
          <CardText>
            {listItems}
          </CardText>
        </Card>
        <Card body outline color="primary">
          <CardTitle>Strategy:</CardTitle>
          <CardText className='text-danger font-weight-bold'>{this.props.strategy}</CardText>
        </Card>
      </Card>
    );
  }
}

export default translate(StrategyResultsComponent)