import { connect } from 'react-redux'
import StrategyResultsComponent from "../../components/StrategyResults/TesterResults.component"

const mapStateToProps = state => {
  return {
    testResults: state.tester.testResults
  };
};

export default connect(
  mapStateToProps
)(StrategyResultsComponent)