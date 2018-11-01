import { combineReducers } from 'redux';
import CurrentUserReducer from './reducer_current_user';
import LocationsReducer from './reducer_locations'
import SelectedLocationReducer from './reducer_selected_location'
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  locations: LocationsReducer,
  selectedLocation: SelectedLocationReducer,
  form: formReducer
});

export default rootReducer;
