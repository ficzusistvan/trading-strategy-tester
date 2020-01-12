import { connect } from 'react-redux'
import TesterComponent from "../../components/Tester.component"

const mapStateToProps = state => {
  return {
    dataSource: state.tester.dataSource,
    symbol: state.tester.symbol,
    period: state.tester.period,
    strategy: state.tester.strategy
  };
};

export default connect(
  mapStateToProps
)(TesterComponent)