import { combineReducers } from 'redux';
import auth from './authReducer';
import tester from './testerReducer';
import { polyglotReducer } from 'redux-polyglot';

export default combineReducers({
  auth,
  tester,
  polyglot: polyglotReducer
});