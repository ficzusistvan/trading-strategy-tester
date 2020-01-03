import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Col, Row } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import socketIOClient from 'socket.io-client';

class SymbolsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    }
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(symbol) {
    this.props.history.push("/symbol/" + symbol);
  }

  componentDidMount() {
    if (process.env.REACT_APP_IS_SOCKET_IO_IN_DEVELOPMENT_MODE == 1) {
      this.socket = socketIOClient('localhost:3005');
    } else {
      this.socket = socketIOClient(); // auto discovery
    }
    this.socket.on('getAllSymbols', data => {
      console.log('getAllSymbols from socket.io:', data);
      this.setState( { data: data.returnData, loading: false } );
    });
    this.socket.emit('getAllSymbols');
  }

  render() {
    const { data, loading } = this.state
    return (
      <>
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
                    this.handleClick(rowInfo.original.symbol);
                  }
                }
              }}
              data={data}
              columns={[
                {
                  Header: this.props.p.tc('symbols.symbol'),
                  accessor: "symbol"
                },
                {
                  Header: this.props.p.tc('symbols.currency'),
                  accessor: "currency"
                },
                {
                  Header: this.props.p.tc('symbols.category_name'),
                  accessor: "categoryName"
                },
                {
                  Header: this.props.p.tc('symbols.description'),
                  accessor: "description"
                },
                {
                  Header: this.props.p.tc('symbols.bid'),
                  accessor: "bid"
                },
                {
                  Header: this.props.p.tc('symbols.ask'),
                  accessor: "ask"
                },
                {
                  Header: this.props.p.tc('symbols.high'),
                  accessor: "high"
                },
                {
                  Header: this.props.p.tc('symbols.low'),
                  accessor: "low"
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

export default translate(withRouter(SymbolsComponent))