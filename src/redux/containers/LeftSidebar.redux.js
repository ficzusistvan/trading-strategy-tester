import { connect } from 'react-redux'
import { setIsTestFinished } from '../actions/testerResults';
import LeftSidebarLayoutpart from "../../layout-parts/LeftSidebar.layoutpart";

const mapStateToProps = state => {
  return {
    isTestFinished: state.testerResults.isTestFinished,
    dataSource: state.testerConfigs.dataSource,
    symbolsAndPeriods: state.testerConfigs.symbolsAndPeriods,
    strategy: state.testerConfigs.strategy
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