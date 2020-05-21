import { connect } from 'react-redux'
import IndicatorsChartsComponent from "../../components/IndicatorsCharts.component"

const mapStateToProps = state => {
  return {
    indicators: state.testerResults.indicators
  };
};

export default connect(
  mapStateToProps
)(IndicatorsChartsComponent)