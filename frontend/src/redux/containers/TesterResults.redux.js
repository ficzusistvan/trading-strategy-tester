import { connect } from 'react-redux'
import TesterResultsComponent from "../../components/tester/TesterResults.component"

const mapStateToProps = state => {
  return {
    testResults: state.tester.testResults
  };
};

export default connect(
  mapStateToProps
)(TesterResultsComponent)