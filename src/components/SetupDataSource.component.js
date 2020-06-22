import React, { Component } from 'react'
import { Input, FormGroup, Col, Label } from 'reactstrap';

class SetupDataSourceComponent extends Component {

  onHandleCurrencyPriceChanged(e) {
    this.props.onSetCurrencyPrice(e.target.value);
  }

  onHandleLeverageChanged(e) {
    this.props.onSetLeverage(e.target.value);
  }

  onHandleNominalValueChanged(e) {
    this.props.onSetNominalValue(e.target.value);
  }

  render() {
    return (
      <>
        <h4>Setup data source</h4>
        <FormGroup row>
          <Label for="currencyPrice" sm={2}>Currency price</Label>
          <Col sm={10}>
            <Input type="text" name="currencyPrice" id="currencyPrice" placeholder="Currency price" value={this.props.currencyPrice} onChange={this.onHandleCurrencyPriceChanged.bind(this)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="leverage" sm={2}>Leverage</Label>
          <Col sm={10}>
            <Input type="text" name="leverage" id="leverage" placeholder="Leverage" value={this.props.leverage} onChange={this.onHandleLeverageChanged.bind(this)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="nominalValue" sm={2}>Nominal value</Label>
          <Col sm={10}>
            <Input type="text" name="nominalValue" id="nominalValue" placeholder="Nominal value" value={this.props.nominalValue} onChange={this.onHandleNominalValueChanged.bind(this)} />
          </Col>
        </FormGroup>
      </>
    )
  }
}

export default SetupDataSourceComponent