import { connect } from 'react-redux'
import { setIsTestFinished } from '../actions/testerResults';
import LeftSidebarLayoutpart from "../../layout-parts/LeftSidebar.layoutpart";

const mapStateToProps = state => {
  return {
    isTestFinished: state.testerResults.isTestFinished,
    dataSource: state.testerConfigs.dataSource,
    symbolsAndPeriods: state.testerConfigs.symbolsAndPeriods,
    strategy: state.testerConfigs.strategy,
    currencyPrice: state.dataSourceConfigs.currencyPrice,
    leverage: state.dataSourceConfigs.leverage,
    nominalValue: state.dataSourceConfigs.nominalValue,
    initBalance: state.testerConfigs.initBalance,
    marginToBalancePercent: state.testerConfigs.marginToBalancePercent,
    chartMainCandles: state.testerResults.chartMainCandles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetIsTestFinished: (isTestFinished) => {
      dispatch(setIsTestFinished(isTestFinished));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSidebarLayoutpart)