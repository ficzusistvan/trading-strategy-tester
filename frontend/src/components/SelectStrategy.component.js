import React, { Component } from 'react'
import { Input } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import axios from 'axios'

class SelectStrategyComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategies: []
    };
  }

  async componentDidMount() {
    const resp = await axios.get('/api/strategy/list');
    console.log(resp);
    this.setState({ strategies: resp.data.strategies })
    this.props.onSetStrategy(resp.data.strategies[0]);
  }

  onHandleChange(e) {
    this.props.onSetStrategy(e.target.value);
  }

  render() {
    const { strategies } = this.state
    const options = [];
    for (let i = 0; i < strategies.length; i++) {
      options.push(<option value={strategies[i]} key={i}>{strategies[i]}</option>);
    }
    return (
      <>
        <h4>Select strategy</h4>
        <Input type="select" name="strategy" id="strategySelect" value={this.props.strategy} onChange={this.onHandleChange.bind(this)}>
          {options}
        </Input>
      </>
    )
  }
}

export default translate(SelectStrategyComponent)