import { connect } from 'react-redux'
import { setPeriod } from '../actions/tester';
import PeriodComponent from "../../components/Period.component"

const mapStateToProps = state => {
  return {
    dataSource: state.tester.dataSource,
    symbol: state.tester.symbol,
    period: state.tester.period,
    strategy: state.tester.strategy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetPeriod: (period) => {
      dispatch(setPeriod(period));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeriodComponent)