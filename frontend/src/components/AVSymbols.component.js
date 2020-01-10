import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Col, Row, Input } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import socketIOClient from 'socket.io-client';

class AVSymbolsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      data: [],
      loading: true
    }
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(symbol) {
    this.props.history.push("/avsymbol/" + symbol);
  }

  onHandleChange(e) {
    let targt = e.target;
    this.setState({ keyword: targt.value })
    this.socket.emit('searchSymbol', targt.value);
  }

  componentDidMount() {
    if (process.env.REACT_APP_IS_SOCKET_IO_IN_DEVELOPMENT_MODE === '1') {
      this.socket = socketIOClient('localhost:3005');
    } else {
      this.socket = socketIOClient(); // auto discovery
    }
    this.socket.on('searchSymbol', data => {
      this.setState({ data: data.bestMatches, loading: false });
    });
    //this.socket.emit('searchSymbol', 'DE');
  }

  render() {
    const { keyword, data, loading } = this.state
    return (
      <>
        <Row>
          <Col sm="2">
            <Input
              onChange={this.onHandleChange.bind(this)}
              id="keyword"
              type="text"
              value={keyword} />
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
                    this.handleClick(rowInfo.original['1. symbol']);
                  }
                }
              }}
              data={data}
              columns={[
                {
                  id: 'symbol',
                  Header: this.props.p.tc('symbols.symbol'),
                  accessor: d => d['1. symbol']
                },
                {
                  id: 'name',
                  Header: this.props.p.tc('symbols.name'),
                  accessor: d => d['2. name']
                },
                {
                  id: 'type',
                  Header: this.props.p.tc('symbols.type'),
                  accessor: d => d['3. type']
                },
                {
                  id: 'region',
                  Header: this.props.p.tc('symbols.region'),
                  accessor: d => d['4. region']
                },
                {
                  id: 'marketOpen',
                  Header: this.props.p.tc('symbols.market_open'),
                  accessor: d => d['5. marketOpen']
                },
                {
                  id: 'marketClose',
                  Header: this.props.p.tc('symbols.market_close'),
                  accessor: d => d['6. marketClose']
                },
                {
                  id: 'timezone',
                  Header: this.props.p.tc('symbols.timezone'),
                  accessor: d => d['7. timezone']
                },
                {
                  id: 'currency',
                  Header: this.props.p.tc('symbols.currency'),
                  accessor: d => d['8. currency']
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

export default translate(withRouter(AVSymbolsComponent))