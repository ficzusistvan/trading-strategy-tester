import { connect } from 'react-redux'
import { setCandles, setTestResults } from '../actions/testerResults';
import TesterControlsLayoutPart from "../../layout-parts/TesterControls.layoutpart"

const mapStateToProps = state => {
  return {
    dataSource: state.testerConfigs.dataSource,
    symbol: state.testerConfigs.symbol,
    period: state.testerConfigs.period,
    symbolsAndPeriods: state.testerConfigs.symbolsAndPeriods,
    strategy: state.testerConfigs.strategy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCandles: (candles) => {
      dispatch(setCandles(candles));
    },
    onSetTestResults: (results) => {
      dispatch(setTestResults(results));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TesterControlsLayoutPart)