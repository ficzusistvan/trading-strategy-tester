import { connect } from 'react-redux'
import TesterConfigsComponent from "../../components/TesterConfigs.component"

const mapStateToProps = state => {
  return {
    dataSource: state.tester.dataSource,
    symbol: state.tester.symbol,
    period: state.tester.period,
    symbolsAndPeriods: state.tester.symbolsAndPeriods,
    strategy: state.tester.strategy
  };
};

export default connect(
  mapStateToProps
)(TesterConfigsComponent)