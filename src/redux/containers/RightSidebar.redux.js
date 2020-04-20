import { connect } from 'react-redux'
import RightSidebarLayoutpart from "../../layout-parts/RightSidebar.layoutpart";

const mapStateToProps = state => {
  return {
    dataSource: state.testerConfigs.dataSource,
    currencyPrice: state.dataSourceConfigs.currencyPrice,
    leverage: state.dataSourceConfigs.leverage,
    nominalValue: state.dataSourceConfigs.nominalValue,
    symbolsAndPeriods: state.testerConfigs.symbolsAndPeriods,
    strategy: state.testerConfigs.strategy,
    initBalance: state.testerConfigs.initBalance,
    marginToBalancePercent: state.testerConfigs.marginToBalancePercent
  };
};

export default connect(
  mapStateToProps
)(RightSidebarLayoutpart)