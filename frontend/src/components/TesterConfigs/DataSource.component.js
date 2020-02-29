import React, { Component } from 'react'
import { Input } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import axios from 'axios'

class DataSourceComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSources: []
    };
  }

  async componentDidMount() {
    const resp = await axios.get('/api/data-source/list');
    console.log(resp);
    this.setState({ dataSources: resp.data.dataSources })
    this.props.onSetDataSource(resp.data.dataSources[0]);
  }

  onHandleChange(e) {
    this.props.onSetDataSource(e.target.value);
  }

  render() {
    const { dataSources } = this.state
    const options = [];
    for (let i = 0; i < dataSources.length; i++) {
      options.push(<option value={dataSources[i]} key={i}>{dataSources[i]}</option>);
    }
    return (
      <Input type="select" name="data-source" id="dataSourceSelect" value={this.props.dataSource} onChange={this.onHandleChange.bind(this)}>
        {options}
      </Input>
    )
  }
}

export default translate(DataSourceComponent)