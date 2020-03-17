import { combineReducers } from 'redux';
// imp reducers
import headerReducer from './header/headerReducer';


const rootReducer = combineReducers({
  headerReducer,
});

export default rootReducer;
