import { connect } from 'react-redux'
import { setTestResults } from '../actions/tester';
import TesterComponent from "../../components/Tester.component"

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
    onSetTestResults: (results) => {
      dispatch(setTestResults(results));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TesterComponent)