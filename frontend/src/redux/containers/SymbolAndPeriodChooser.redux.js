import { connect } from 'react-redux'
import { setSymbol, setPeriod } from '../actions/tester';
import SymbolAndPeriodChooserComponent from "../../components/SymbolAndPeriodChooser.component"

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
)(SymbolAndPeriodChooserComponent)