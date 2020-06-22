import { combineReducers } from 'redux';
import dataSourceConfigs from './dataSourceConfigsReducer';
import testerConfigs from './testerConfigsReducer';
import testerResults from './testerResultsReducer';

export default combineReducers({
  dataSourceConfigs,
  testerConfigs,
  testerResults
});