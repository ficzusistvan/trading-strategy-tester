import { connect } from 'react-redux'
import { addSymbolAndPeriod } from '../actions/testerConfigs';
import SelectSymbolAndPeriodModal from "../../components/TesterConfigs/SelectSymbolAndPeriod.modal"

const mapStateToProps = state => {
  return {
    dataSource: state.testerConfigs.dataSource,
    symbol: state.testerConfigs.symbol,
    period: state.testerConfigs.period,
    strategy: state.testerConfigs.strategy
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