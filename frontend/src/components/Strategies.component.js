import React, { Component } from 'react'
import { Button, Card, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import socketIOClient from 'socket.io-client';

class StrategiesComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategies: [],
      strategy: '',
      loading: true
    }
  }

  componentDidMount() {
    this.socket = socketIOClient('localhost:3005');
    this.socket.on('getStrategies', data => {
      console.log('getStrategies from socket.io:', data);
      this.setState({ strategies: data, strategy: data[0], loading: false });
      this.props.handleStrategyChange(data[0]);
    });
    this.socket.emit('getStrategies', null);
  }

  onHandleChange(e) {
    const newStrategy = e.target.value;
    this.setState({ strategy: newStrategy });
    this.props.handleStrategyChange(newStrategy);
  }

  render() {
    const { strategies, strategy, loading } = this.state
    if (loading) {
      return <div>Loading strategies...</div>
    }
    const options = [];
    for (let i = 0; i < strategies.length; i++) {
      const strat = strategies[i];
      options.push(<option value={strat} key={i}>{strat}</option>);
    }
    return (
      <Card body>
        <Form>
          <FormGroup>
            <Label for="strategy">Select strategy:</Label>
            <Input type="select" name="strategy" id="strategySelect" value={strategy} onChange={this.onHandleChange.bind(this)}>
              {options}
            </Input>
          </FormGroup>
        </Form>
      </Card>
    )
  }
}

export default translate(StrategiesComponent)