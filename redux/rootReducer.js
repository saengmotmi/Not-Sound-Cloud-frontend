import { combineReducers } from 'redux';
// imp reducers
import headerReducer from './header/headerReducer';
import messageReducer from './message/reducers';
import streamReducer from "./stream/reducers";

const rootReducer = combineReducers({
  headerReducer,
  messageReducer,
  streamReducer
});

export default rootReducer;
