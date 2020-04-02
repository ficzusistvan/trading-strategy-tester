import { connect } from 'react-redux'
import { setDataSource } from '../actions/testerConfigs';
import SelectDataSourceComponent from "../../components/SelectDataSource.component"

const mapStateToProps = state => {
  return {
    dataSource: state.testerConfigs.dataSource
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetDataSource: (dataSource) => {
      dispatch(setDataSource(dataSource));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDataSourceComponent)