import React, { Component } from 'react'
import { Input, Row, Col, FormGroup, Label } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class SelectStrategyComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategies: [...process.env.REACT_APP_PUBLIC_STRATEGIES.split(','), ...process.env.REACT_APP_PRIVATE_STRATEGIES.split(',')],
      description: '',
      configs: {}
    };
  }

  async updateDescription(strategy) {
    const path = process.env.REACT_APP_PUBLIC_STRATEGIES.split(',').includes(strategy) ? 'public' : 'private';
    let strategyInst = await import('../tester/' + path + '/strategies/' + strategy);
    this.setState({ description: strategyInst.getDescription(), configs: strategyInst.getConfigs() });
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

  onHandleInitBalanceChanged(e) {
    this.props.onSetInitBalance(e.target.value);
  }

  onHandleMarginToBalancePercentChanged(e) {
    this.props.onSetMarginToBalancePercent(e.target.value);
  }

  onHandleDayTimeSpreadChanged(e) {
    this.props.onSetDayTimeSpread(e.target.value);
  }

  onHandleNightTimeSpreadChanged(e) {
    this.props.onSetNightTimeSpread(e.target.value);
  }

  onHandleLotSizeChanged(e) {
    this.props.onSetLotSize(e.target.value);
  }

  render() {
    const { strategies } = this.state
    const options = [];
    for (let i = 0; i < strategies.length; i++) {
      options.push(<option value={strategies[i]} key={i}>{strategies[i]}</option>);
    }
    const configItems = [];
    for (let [key, value] of Object.entries(this.state.configs)) {
      configItems.push(<p key={key}>{key} : {value.toString()}</p>)
    };
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
        <Row>
          <Col>
            <h5>Strategy configs:</h5>
            {configItems}
          </Col>
        </Row>
        <FormGroup row>
          <Label for="initBalance" sm={4}>Initial balance</Label>
          <Col sm={8}>
            <Input type="text" name="initBalance" id="initBalance" placeholder="Initial balance" value={this.props.initBalance} onChange={this.onHandleInitBalanceChanged.bind(this)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="marginToBalancePercent" sm={4}>Margin to balance percent</Label>
          <Col sm={8}>
            <Input type="text" name="marginToBalancePercent" id="marginToBalancePercent" placeholder="Margin to balance percent" value={this.props.marginToBalancePercent} onChange={this.onHandleMarginToBalancePercentChanged.bind(this)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="dayTimeSpread" sm={4}>Typical daytime spread</Label>
          <Col sm={8}>
            <Input type="text" name="dayTimeSpread" id="dayTimeSpread" placeholder="Typical daytime spread" value={this.props.dayTimeSpread} onChange={this.onHandleDayTimeSpreadChanged.bind(this)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="nightTimeSpread" sm={4}>Typical nighttime spread</Label>
          <Col sm={8}>
            <Input type="text" name="nightTimeSpread" id="nightTimeSpread" placeholder="Typical nighttime spread" value={this.props.nightTimeSpread} onChange={this.onHandleNightTimeSpreadChanged.bind(this)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="lotSize" sm={4}>Lot size</Label>
          <Col sm={8}>
            <Input type="text" name="lotSize" id="lotSize" placeholder="Lot size" value={this.props.lotSize} onChange={this.onHandleLotSizeChanged.bind(this)} />
          </Col>
        </FormGroup>
      </>
    )
  }
}

export default translate(SelectStrategyComponent)