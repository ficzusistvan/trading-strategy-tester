import { connect } from 'react-redux'
import { setStrategy, setInitBalance, setMarginToBalancePercent } from '../actions/testerConfigs';
import SelectStrategyComponent from "../../components/SelectStrategy.component"

const mapStateToProps = state => {
  return {
    strategy: state.testerConfigs.strategy,
    initBalance: state.testerConfigs.initBalance,
    marginToBalancePercent: state.testerConfigs.marginToBalancePercent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetStrategy: (strategy) => {
      dispatch(setStrategy(strategy));
    },
    onSetInitBalance: (initBalance) => {
      dispatch(setInitBalance(initBalance));
    },
    onSetMarginToBalancePercent: (marginToBalancePercent) => {
      dispatch(setMarginToBalancePercent(marginToBalancePercent));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectStrategyComponent)