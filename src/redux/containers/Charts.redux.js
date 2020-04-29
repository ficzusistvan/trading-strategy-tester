import { connect } from 'react-redux'
import ChartsComponent from "../../components/Charts.component"

const mapStateToProps = state => {
  return {
    symbolsAndPeriods: state.testerConfigs.symbolsAndPeriods,
    chartMainCandles: state.testerResults.chartMainCandles
  };
};

export default connect(
  mapStateToProps
)(ChartsComponent)