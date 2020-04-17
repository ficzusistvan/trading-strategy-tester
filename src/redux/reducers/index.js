import { combineReducers } from 'redux';
import dataSourceConfigs from './dataSourceConfigsReducer';
import testerConfigs from './testerConfigsReducer';
import testerResults from './testerResultsReducer';
import { polyglotReducer } from 'redux-polyglot';

export default combineReducers({
  dataSourceConfigs,
  testerConfigs,
  testerResults,
  polyglot: polyglotReducer
});