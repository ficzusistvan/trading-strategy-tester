import { connect } from 'react-redux'
import { setStrategy } from '../actions/testerConfigs';
import SelectStrategyComponent from "../../components/SelectStrategy.component"

const mapStateToProps = state => {
  return {
    strategy: state.testerConfigs.strategy
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
)(SelectStrategyComponent)