import { connect } from 'react-redux'
import { setLocalCsv } from '../actions/testerConfigs';
import CSVUploaderComponent from "../../components/DataSource/CSVUploader.component"

const mapDispatchToProps = dispatch => {
  return {
    onSetLocalCsv: (csv) => {
      dispatch(setLocalCsv(csv));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CSVUploaderComponent)