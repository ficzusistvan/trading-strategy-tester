import { connect } from 'react-redux'
import ResultsComponent from "../../components/Results.component"

const mapStateToProps = state => {
  return {
    trades: state.testerResults.trades
  };
};

export default connect(
  mapStateToProps
)(ResultsComponent)