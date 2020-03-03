import { connect } from 'react-redux'
import StrategyResultsComponent from "../../components/StrategyResults.component"

const mapStateToProps = state => {
  return {
    testResults: state.testerResults.testResults
  };
};

export default connect(
  mapStateToProps
)(StrategyResultsComponent)