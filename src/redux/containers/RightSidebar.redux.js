import { connect } from 'react-redux'
import RightSidebarLayoutpart from "../../layout-parts/RightSidebar.layoutpart";

const mapStateToProps = state => {
  return {
    dataSource: state.testerConfigs.dataSource,
    symbolsAndPeriods: state.testerConfigs.symbolsAndPeriods,
    strategy: state.testerConfigs.strategy
  };
};

export default connect(
  mapStateToProps
)(RightSidebarLayoutpart)