import React, { Component } from 'react'
import { Input } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class SelectStrategyComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategies: ['test01','test02','test03_Zoli']
    };
  }

  onHandleStrategyChanged(e) {
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
        <Input type="select" name="strategy" id="strategySelect" value={this.props.strategy} onChange={this.onHandleStrategyChanged.bind(this)}>
          {options}
        </Input>
      </>
    )
  }
}

export default translate(SelectStrategyComponent)