import { connect } from 'react-redux'
import RightSidebarLayoutpart from "../../layout-parts/RightSidebar.layoutpart";

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
)(RightSidebarLayoutpart)