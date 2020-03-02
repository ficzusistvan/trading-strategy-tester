import { connect } from 'react-redux'
import { setSymbol, setPeriod } from '../actions/testerConfigs';
import SymbolAndPeriodComponent from "../../components/TesterConfigs/SymbolAndPeriod.component"

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
    onSetSymbol: (symbol) => {
      dispatch(setSymbol(symbol));
    },
    onSetPeriod: (period) => {
      dispatch(setPeriod(period));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SymbolAndPeriodComponent)