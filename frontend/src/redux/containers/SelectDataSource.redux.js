import { connect } from 'react-redux'
import { setDataSource } from '../actions/testerConfigs';
import SelectDataSourceComponent from "../../components/SelectDataSource.component"

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
)(SelectDataSourceComponent)