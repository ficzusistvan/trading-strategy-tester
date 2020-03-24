import React, { Component } from 'react'
import { Row, ListGroup, Col } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import ResultComponent from './Results/Result.component';
import socketIOClient from 'socket.io-client';
import './Results.css';

class StrategyResultsComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      trades: null
    }
  }

  componentDidMount() {

    if (process.env.REACT_APP_IS_SOCKET_IO_IN_DEVELOPMENT_MODE === '1') {
      this.socket = socketIOClient('localhost:3005');
    } else {
      this.socket = socketIOClient(); // auto discovery
    }

    this.socket.on('respTrades', data => {
      console.log('respTrades from socket.io:', data);
      this.setState({ trades: data, loading: false });
    });

    this.socket.emit('getTrades', {});
  }

  render() {
    if (!this.state.trades) {
      return <img alt='' src='loading.gif' />;
    }

    let profit = 0;
    let listItems = [];
    this.state.trades.forEach((res, idx, arr) => {
      if (res.side !== 'NONE') {
        const nextValue = idx < arr.length - 1 ? arr[idx + 1] : { date: '', price: res.price };
        listItems.push(<ResultComponent startPrice={res.price} endPrice={nextValue.price} side={res.side} startDate={res.date} endDate={nextValue.date} />);
        if (res.side === 'BUY') {
          profit += (nextValue.price - res.price);
        }
        if (res.side === 'SELL') {
          profit += (res.price - nextValue.price);
        }
      }
    });

    return (
      <Row>
        <Col>
          <h4>Profit: <span className="text-danger font-weight-bold">{profit.toFixed(2)}</span></h4>
          <h4>Strategy results:</h4>
          <ListGroup>
            {listItems}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default translate(StrategyResultsComponent)