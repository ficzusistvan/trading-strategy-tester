import React, { Component } from 'react'
import { Input, Row, Col } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class SelectStrategyComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategies: ['test01', 'test02', 'test03_Zoli'],
      description: ''
    };
  }

  async onHandleStrategyChanged(e) {
    this.props.onSetStrategy(e.target.value);
    let strategyInst = await import('../tester/strategies/' + e.target.value);
    this.setState({ description: strategyInst.getDescription() });
  }

  render() {
    const { strategies } = this.state
    const options = [];
    for (let i = 0; i < strategies.length; i++) {
      options.push(<option value={strategies[i]} key={i}>{strategies[i]}</option>);
    }
    return (
      <>
        <Row>
          <Col>
            <h4>Select strategy</h4>
            <Input type="select" name="strategy" id="strategySelect" value={this.props.strategy} onChange={this.onHandleStrategyChanged.bind(this)}>
              {options}
            </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Strategy description:</h5>
            <p>{this.state.description}</p>
          </Col>
        </Row>
      </>
    )
  }
}

export default translate(SelectStrategyComponent)