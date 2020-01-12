import { connect } from 'react-redux'
import { setSymbol } from '../actions/tester';
import SymbolComponent from "../../components/Symbol.component"

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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SymbolComponent)