import { combineReducers } from 'redux';
// imp reducers
import headerReducer from './header/headerReducer';
import messageReducer from './message/reducers';


const rootReducer = combineReducers({
  headerReducer,
  messageReducer
});

export default rootReducer;
