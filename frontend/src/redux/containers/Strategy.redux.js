import { connect } from 'react-redux'
import { setStrategy } from '../actions/testerConfigs';
import StrategyComponent from "../../components/TesterConfigs/Strategy.component"

const mapDispatchToProps = dispatch => {
  return {
    onSetStrategy: (strategy) => {
      dispatch(setStrategy(strategy));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(StrategyComponent)