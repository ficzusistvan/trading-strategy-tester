import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Col, Button, Row, Input } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import axios from 'axios'

class StrategyComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategies: [],
      strategy: null
    };
  }

  async componentDidMount() {
    const resp = await axios.get('/api/strategy/list');
    console.log(resp);
    this.setState({ strategies: resp.data.strategies })
  }

  onHandleChange(e) {
    this.setState({ strategy: e.target.value });
    this.props.onSetStrategy(e.target.value);
  }

  render() {
    const { strategies, strategy } = this.state
    const options = [];
    for (let i = 0; i < strategies.length; i++) {
      options.push(<option value={strategies[i]} key={i}>{strategies[i]}</option>);
    }
    return (
      <>
        <Input type="select" name="strategy" id="strategySelect" value={strategy} onChange={this.onHandleChange.bind(this)}>
          {options}
        </Input>
      </>
    )
  }
}

export default translate(withRouter(StrategyComponent))