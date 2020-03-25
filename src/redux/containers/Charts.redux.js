import { connect } from 'react-redux'
import ChartsComponent from "../../components/Charts.component"

const mapStateToProps = state => {
  return {
    candles: state.testerConfigs.symbolsAndPeriods
  };
};

export default connect(
  mapStateToProps
)(ChartsComponent)