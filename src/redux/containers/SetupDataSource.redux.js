import { connect } from 'react-redux'
import SetupDataSourceComponent from "../../components/SetupDataSource.component"
import { setCurrencyPrice, setLeverage, setNominalValue } from '../actions/dataSourceConfigs';

const mapStateToProps = state => {
  return {
    currencyPrice: state.dataSourceConfigs.currencyPrice,
    leverage: state.dataSourceConfigs.leverage,
    nominalValue: state.dataSourceConfigs.nominalValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCurrencyPrice: (currencyPrice) => {
      dispatch(setCurrencyPrice(currencyPrice));
    },
    onSetLeverage: (leverage) => {
      dispatch(setLeverage(leverage));
    },
    onSetNominalValue: (nominalValue) => {
      dispatch(setNominalValue(nominalValue));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupDataSourceComponent)