import React, { Component } from 'react'
import { Input } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import CSVUploaderRedux from '../redux/containers/CSVUploader.redux';

class SelectDataSourceComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSources: ['alphavantage', 'xAPI', 'finnhub', 'localcsv']
    };
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
        {this.props.dataSource === 'localcsv' &&
          <CSVUploaderRedux />
        }
      </>
    )
  }
}

export default translate(SelectDataSourceComponent)