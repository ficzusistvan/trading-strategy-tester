import { connect } from 'react-redux'
import { setSymbol, setPeriod, addSymbolAndPeriod, setIsDefault } from '../actions/testerConfigs';
import AddSymbolAndPeriodComponent from "../../components/AddSymbolAndPeriod.component"

const mapStateToProps = state => {
  return {
    dataSource: state.testerConfigs.dataSource,
    symbol: state.testerConfigs.symbol,
    period: state.testerConfigs.period,
    isDefault: state.testerConfigs.isDefault,
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
    },
    onSetIsDefault: (isDefault) => {
      dispatch(setIsDefault(isDefault));
    },
    onAddSymbolAndPeriod: (symbol, period, isDefault) => {
      dispatch(addSymbolAndPeriod(symbol, period, isDefault));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSymbolAndPeriodComponent)