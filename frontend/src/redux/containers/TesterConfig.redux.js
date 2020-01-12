import { connect } from 'react-redux'
import TesterConfigComponent from "../../components/leftsidebar/TesterConfig.component"

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
)(TesterConfigComponent)