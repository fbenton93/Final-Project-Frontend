import { combineReducers } from 'redux';
import CurrentUserReducer from './reducer_current_user';
import staticData from './reducer_static';
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  static: staticData,
  form: formReducer
});

export default rootReducer;
