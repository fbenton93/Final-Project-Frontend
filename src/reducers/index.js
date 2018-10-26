import { combineReducers } from 'redux';
import GenericReducer from './reducer_generic';
import staticData from './reducer_static';


const rootReducer = combineReducers({
  generic: GenericReducer,
  static: staticData
});

export default rootReducer;
