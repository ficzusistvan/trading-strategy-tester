import { connect } from 'react-redux'
import ResultsComponent from "../../components/Results.component"

const mapStateToProps = state => {
  return {
    trades: state.testerResults.trades,
    initBalance: state.testerConfigs.initBalance,
    endBalance: state.testerResults.endBalance,
    reason: state.testerResults.reason
  };
};

export default connect(
  mapStateToProps
)(ResultsComponent)