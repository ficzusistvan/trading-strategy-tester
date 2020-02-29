import { connect } from 'react-redux'
import { addSymbolAndPeriod } from '../actions/tester';
import SelectSymbolAndPeriodModal from "../../components/TesterConfigs/SelectSymbolAndPeriod.modal"

const mapStateToProps = state => {
  return {
    dataSource: state.tester.dataSource,
    symbol: state.tester.symbol,
    period: state.tester.period,
    strategy: state.tester.strategy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddSymbolAndPeriod: (symbol, period) => {
      dispatch(addSymbolAndPeriod(symbol, period));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSymbolAndPeriodModal)