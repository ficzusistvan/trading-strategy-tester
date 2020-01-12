import { connect } from 'react-redux'
import { setDataSource } from '../actions/tester';
import DataSourceComponent from "../../components/DataSource.component"

const mapStateToProps = state => {
  return {
    dataSource: state.tester.dataSource,
    symbol: state.tester.symbol,
    period: state.tester.period,
    strategy: state.tester.strategy
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
)(DataSourceComponent)