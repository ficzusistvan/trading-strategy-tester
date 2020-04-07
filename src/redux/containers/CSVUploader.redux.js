import { connect } from 'react-redux'
import { setCSV } from '../actions/testerConfigs';
import CSVUploaderComponent from "../../components/DataSource/CSVUploader.component"

const mapDispatchToProps = dispatch => {
  return {
    onSetCSV: (csv) => {
      dispatch(setCSV(csv));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CSVUploaderComponent)