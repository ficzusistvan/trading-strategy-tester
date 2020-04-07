import { connect } from 'react-redux'
import { setMyRestApiUrl } from '../actions/testerConfigs';
import MyRestApiUrlComponent from "../../components/DataSource/MyRestApiUrl.component"

const mapStateToProps = state => {
  return {
    myRestApiUrl: state.testerConfigs.myRestApiUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetMyRestApiUrl: (url) => {
      dispatch(setMyRestApiUrl(url));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRestApiUrlComponent)