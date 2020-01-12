import { connect } from 'react-redux'
import { setStrategy } from '../actions/tester';
import StrategyComponent from "../../components/Strategy.component"

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
    onSetStrategy: (strategy) => {
      dispatch(setStrategy(strategy));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StrategyComponent)