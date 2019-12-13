import React, { Component } from 'react'
import { Card, Form, FormGroup, Input, Jumbotron, Label } from 'reactstrap';
import translate from 'redux-polyglot/translate';

class PeriodChooserComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      period: this.props.defaultPeriod
    }
  }

  onHandleChange(e) {
    const newPeriod = e.target.value;
    this.setState({ period: newPeriod });
    this.props.handlePeriodChange(Number(newPeriod));
  }

  render() {
    return (
      <Card body>
        <Form>
          <FormGroup>
            <Label for="period">Select period:</Label>
            <Input type="select" name="period" id="periodSelect" value={this.state.period} onChange={this.onHandleChange.bind(this)}>
              <option value="1">PERIOD_M1</option>
              <option value="5">PERIOD_M5</option>
              <option value="15">PERIOD_M15</option>
              <option value="30">PERIOD_M30</option>
              <option value="60">PERIOD_H1</option>
              <option value="240">PERIOD_H4</option>
              <option value="1440">PERIOD_D1</option>
              <option value="10080">PERIOD_W1</option>
              <option value="43200">PERIOD_MN1</option>
            </Input>
          </FormGroup>
        </Form>
      </Card>
    )
  }
}

export default translate(PeriodChooserComponent)