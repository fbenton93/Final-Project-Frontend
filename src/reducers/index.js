import { combineReducers } from 'redux';
import GenericReducer from './reducer_generic';
import staticData from './reducer_static';
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
  generic: GenericReducer,
  static: staticData,
  form: formReducer
});

export default rootReducer;
