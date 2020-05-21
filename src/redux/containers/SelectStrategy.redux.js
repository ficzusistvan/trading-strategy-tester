import { connect } from 'react-redux'
import { setStrategy, setInitBalance, setMarginToBalancePercent, setDayTimeSpread, setNightTimeSpread, setLotSize } from '../actions/testerConfigs';
import SelectStrategyComponent from "../../components/SelectStrategy.component"

const mapStateToProps = state => {
  return {
    strategy: state.testerConfigs.strategy,
    initBalance: state.testerConfigs.initBalance,
    marginToBalancePercent: state.testerConfigs.marginToBalancePercent,
    dayTimeSpread: state.testerConfigs.dayTimeSpread,
    nightTimeSpread: state.testerConfigs.nightTimeSpread,
    lotSize: state.testerConfigs.lotSize
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
    },
    onSetDayTimeSpread: (spread) => {
      dispatch(setDayTimeSpread(spread));
    },
    onSetNightTimeSpread: (spread) => {
      dispatch(setNightTimeSpread(spread));
    },
    onSetLotSize: (lotSize) => {
      dispatch(setLotSize(lotSize));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectStrategyComponent)