import { connect } from 'react-redux'
import { setDataSource } from '../actions/tester';
import DataSourceComponent from "../../components/TesterConfigs/DataSource.component"

const mapDispatchToProps = dispatch => {
  return {
    onSetDataSource: (dataSource) => {
      dispatch(setDataSource(dataSource));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DataSourceComponent)