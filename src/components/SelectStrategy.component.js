import React, { Component } from 'react'
import { Input, Row, Col } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class SelectStrategyComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategies: [...process.env.REACT_APP_PUBLIC_STRATEGIES.split(','), ...process.env.REACT_APP_PRIVATE_STRATEGIES.split(',')],
      description: ''
    };
  }

  async updateDescription(strategy) {
    const path = process.env.REACT_APP_PUBLIC_STRATEGIES.split(',').includes(strategy) ? 'public' : 'private';
    let strategyInst = await import('../tester/' + path + '/strategies/' + strategy);
    this.setState({ description: strategyInst.getDescription() });
  }

  componentDidMount() {
    if (this.props.strategy === '') {
      this.props.onSetStrategy(this.state.strategies[0]);
      this.updateDescription(this.state.strategies[0]);
    } else {
      this.updateDescription(this.props.strategy);
    }
  }

  onHandleStrategyChanged(e) {
    this.props.onSetStrategy(e.target.value);
    this.updateDescription(e.target.value);
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