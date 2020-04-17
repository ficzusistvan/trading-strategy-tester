import { connect } from 'react-redux'
import ResultsComponent from "../../components/Results.component"

const mapStateToProps = state => {
  return {
    trades: state.testerResults.trades,
    initBalance: state.testerConfigs.initBalance,
    endBalance: state.testerResults.endBalance
  };
};

export default connect(
  mapStateToProps
)(ResultsComponent)