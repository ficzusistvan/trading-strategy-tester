import { connect } from 'react-redux'
import LeftSidebarLayoutpart from "../../layout-parts/LeftSidebar.layoutpart";

const mapStateToProps = state => {
  return {
    dataSource: state.testerConfigs.dataSource,
    symbol: state.testerConfigs.symbol,
    period: state.testerConfigs.period,
    symbolsAndPeriods: state.testerConfigs.symbolsAndPeriods,
    strategy: state.testerConfigs.strategy
  };
};

export default connect(
  mapStateToProps
)(LeftSidebarLayoutpart)