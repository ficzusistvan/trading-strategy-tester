import { combineReducers } from 'redux';
import auth from './authReducer';
import testerConfigs from './testerConfigsReducer';
import testerResults from './testerResultsReducer';
import { polyglotReducer } from 'redux-polyglot';

export default combineReducers({
  auth,
  testerConfigs,
  testerResults,
  polyglot: polyglotReducer
});