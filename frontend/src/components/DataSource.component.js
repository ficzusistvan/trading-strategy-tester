import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Col, Button, Row, Input } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import axios from 'axios'

class DataSourceComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSources: [],
      dataSource: null
    };
  }

  async componentDidMount() {
    const resp = await axios.get('/api/data-source/list');
    console.log(resp);
    this.setState({ dataSources: resp.data.dataSources })
  }

  onHandleChange(e) {
    this.setState({ dataSource: e.target.value });
    this.props.onSetDataSource(e.target.value);
  }

  render() {
    const { dataSources, dataSource } = this.state
    const options = [];
    for (let i = 0; i < dataSources.length; i++) {
      options.push(<option value={dataSources[i]} key={i}>{dataSources[i]}</option>);
    }
    return (
      <>
        <Input type="select" name="data-source" id="dataSourceSelect" value={dataSource} onChange={this.onHandleChange.bind(this)}>
          {options}
        </Input>
      </>
    )
  }
}

export default translate(withRouter(DataSourceComponent))