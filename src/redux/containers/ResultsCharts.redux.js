import { connect } from 'react-redux'
import ResultsChartsComponent from "../../components/ResultsCharts.component"

const mapStateToProps = state => {
  return {
    trades: state.testerResults.trades
  };
};

export default connect(
  mapStateToProps
)(ResultsChartsComponent)