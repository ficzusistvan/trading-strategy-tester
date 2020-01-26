import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Col, Row, Input, Card, Form, FormGroup, Label } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import axios from 'axios'

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

class SymbolComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      symbols: [],
      loading: true
    };
  }

  async onHandleChange(e) {
    this.setState({ keyword: e.target.value });
    const resp = await axios.get('/api/symbol/search/' + this.props.dataSource + '/' + e.target.value);
    console.log(resp);
    this.setState({ symbols: resp.data.symbols, loading: false })
  }

  handleClick(symbol) {
    this.props.onSetSymbol(symbol);
  }

  onHandleChange(e) {
    this.props.onSetPeriod(e.target.value);
  }

  render() {
    const { keyword, symbols, loading } = this.state
    const options = [];
    for (let i = 0; i < PERIODS.length; i++) {
      options.push(<option value={PERIODS[i].val} key={i}>{PERIODS[i].str}</option>);
    }
    return (
      <Row>
        <Card body outline color='warning'>
          <Input type="select" name="period" id="periodSelect" value={this.props.period} onChange={this.onHandleChange.bind(this)}>
            {options}
          </Input>
        </Card>
        <Card body outline color='warning'>
          <Form>
            <FormGroup row>
              <Label for="keyword" sm={2}>Enter searchterm:</Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="keyword"
                  id="keyword"
                  value={keyword}
                  onChange={this.onHandleChange.bind(this)}>
                </Input>
              </Col>
            </FormGroup>
          </Form>
          <Row>
            <Col>
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
                      this.handleClick(rowInfo.original['symbol']);
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
        </Card>
      </Row>
    )
  }
}

export default translate(withRouter(SymbolComponent))