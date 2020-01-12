import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Col, Button, Row, Input } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import axios from 'axios'

class SymbolComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      symbols: [],
      symbol: null,
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
    this.setState({ symbol: symbol });
    this.props.onSetSymbol(symbol);
  }

  render() {
    const { keyword, symbols, symbol, loading } = this.state
    return (
      <>
        <Row>
          <Col sm="2">
            <Input
              type="text"
              name="keyword"
              id="keyword"
              value={keyword}
              onChange={this.onHandleChange.bind(this)}>
            </Input>
          </Col>
        </Row>
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
      </>
    )
  }
}

export default translate(withRouter(SymbolComponent))