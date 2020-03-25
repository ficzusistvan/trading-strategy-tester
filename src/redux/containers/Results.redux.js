import { connect } from 'react-redux'
import ResultsComponent from "../../components/Results.component"

const mapStateToProps = state => {
  return {
    testResults: state.testerResults.testResults
  };
};

export default connect(
  mapStateToProps
)(ResultsComponent)