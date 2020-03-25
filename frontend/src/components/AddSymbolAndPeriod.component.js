import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Col, Row, Input, Button, FormGroup, Label } from 'reactstrap';
import translate from 'redux-polyglot/translate';

const PERIODS = [
  { str: 'M1', val: 1 },
  { str: 'M5', val: 5 },
  { str: 'M15', val: 15 },
  { str: 'M30', val: 30 },
  { str: 'H1', val: 60 },
  { str: 'H4', val: 240 },
  { str: 'D1', val: 1440 },
  { str: 'W1', val: 10080 },
  { str: 'MN1', val: 43200 }
];

class AddSymbolAndPeriodComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      symbols: [],
      loading: true
    };
  }

  onHandleKeywordChange(e) {
    this.setState({keyword: e.target.value});
  }

  async onHandleSearchClick(e) {
    const dataSourceImpl = await import('../tester/data-sources/' + this.props.dataSource + '/api');
    const symbols = await dataSourceImpl.searchSymbol(this.state.keyword);
    console.log(symbols);
    this.setState({ symbols: symbols, loading: false })
  }

  onHandleSymbolClick(symbol) {
    this.props.onSetSymbol(symbol);
  }

  onHandlePeriodChange(e) {
    this.props.onSetPeriod(e.target.value);
  }

  onHandleDefaultChange(e) {
    this.props.onSetIsDefault(e.target.checked);
  }

  async onHandleAddClick(e) {
    const dataSourceImpl = await import('../tester/data-sources/' + this.props.dataSource + '/api');
    const candles = await dataSourceImpl.getCandles(this.props.symbol, this.props.period);
    this.props.onAddCandles(this.props.symbol, this.props.period, this.props.isDefault, candles);
    this.props.onSetIsDefault(false);
  }

  render() {
    const { symbols, loading } = this.state

    const options = [];
    for (let i = 0; i < PERIODS.length; i++) {
      options.push(<option value={PERIODS[i].val} key={i}>{PERIODS[i].str}</option>);
    }

    const isDisabled = this.props.symbolsAndPeriods.find(el => el.isDefault === true) === undefined;

    return (
      <>
        <h4>Add symbol and period</h4>
        <Row>
          <Col>
            <h5>Search symbol</h5>
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <Input type="text" name="keyword" id="keyword" value={this.state.keyword} onChange={this.onHandleKeywordChange.bind(this)} />
          </Col>
          <Col sm="6">
            <Button block onClick={this.onHandleSearchClick.bind(this)}>Search symbol</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Select symbol</h5>
            <ReactTable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    //console.log('A Td Element was clicked!')
                    //console.log('it produced this event:', e)
                    //console.log('It was in this column:', column)
                    //console.log('It was in this row:', rowInfo)
                    //console.log('It was in this table instance:', instance)

                    // IMPORTANT! React-Table uses onClick internally to trigger
                    // events like expanding SubComponents and pivots.
                    // By default a custom 'onClick' handler will override this functionality.
                    // If you want to fire the original onClick handler, call the
                    // 'handleOriginal' function.
                    /*if (handleOriginal) {
                      handleOriginal()
                    }*/
                    this.onHandleSymbolClick(rowInfo.original['symbol']);
                  }
                }
              }}
              data={symbols}
              columns={[
                {
                  id: 'symbol',
                  Header: this.props.p.tc('symbols.symbol'),
                  accessor: d => d['symbol']
                },
                {
                  id: 'name',
                  Header: this.props.p.tc('symbols.name'),
                  accessor: d => d['name']
                },
                {
                  id: 'type',
                  Header: this.props.p.tc('symbols.type'),
                  accessor: d => d['type']
                },
                {
                  id: 'currency',
                  Header: this.props.p.tc('symbols.currency'),
                  accessor: d => d['currency']
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
              loading={loading} // Display the loading overlay when we need it
              filterable
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Select period</h5>
            <Input type="select" name="period" id="periodSelect" value={this.props.period} onChange={this.onHandlePeriodChange.bind(this)}>
              {options}
            </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Select if default</h5>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" onChange={this.onHandleDefaultChange.bind(this)} disabled={!isDisabled} checked={this.props.isDefault}/>{' '}
          Check if default
        </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row className='my-3 justify-content-md-center'>
          <Col sm="6">
            <Button block onClick={this.onHandleAddClick.bind(this)}>Add symbol and period</Button>
          </Col>
        </Row>
      </>
    )
  }
}

export default translate(AddSymbolAndPeriodComponent)