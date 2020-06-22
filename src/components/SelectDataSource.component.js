import React, { Component } from 'react'
import { Input } from 'reactstrap';
import CSVUploaderRedux from '../redux/containers/CSVUploader.redux';
import MyRestApiUrlRedux from '../redux/containers/MyRestApiUrl.redux';

class SelectDataSourceComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSources: [...process.env.REACT_APP_PUBLIC_DATA_SOURCES.split(','), ...process.env.REACT_APP_PRIVATE_DATA_SOURCES.split(',')]
    };
  }

  componentDidMount() {
    if (this.props.dataSource === '') {
      this.props.onSetDataSource(this.state.dataSources[0]);
    }
  }

  onHandleDataSourceChanged(e) {
    this.props.onSetDataSource(e.target.value);
  }

  render() {
    const { dataSources } = this.state
    const options = [];
    for (let i = 0; i < dataSources.length; i++) {
      options.push(<option value={dataSources[i]} key={i}>{dataSources[i]}</option>);
    }
    return (
      <>
        <h4>Select data source</h4>
        <Input type="select" name="data-source" id="dataSourceSelect" value={this.props.dataSource} onChange={this.onHandleDataSourceChanged.bind(this)}>
          {options}
        </Input>
        {this.props.dataSource === 'local-csv' &&
          <CSVUploaderRedux />
        }
        {this.props.dataSource === 'my-rest-api' &&
          <MyRestApiUrlRedux />
        }
      </>
    )
  }
}

export default SelectDataSourceComponent