import React, { Component } from 'react';
import { Input } from 'reactstrap';

class MyRestApiUrlComponent extends Component {

  onHandleUrlChanged(e) {
    this.props.onSetMyRestApiUrl(e.target.value);
  }

  render() {
    return (
      <Input type="input" name="my-rest-api-url" id="my-rest-api-url" value={this.props.myRestApiUrl} onChange={this.onHandleUrlChanged.bind(this)} />
    );
  }
}

export default MyRestApiUrlComponent;