import { combineReducers } from 'redux';
import CurrentUserReducer from './reducer_current_user';
import LocationsReducer from './reducer_locations'
import SelectedLocationReducer from './reducer_selected_location'
import ProvisionalLocationReducer from './reducer_provisional_location'
import LocationWasAddedReducer from './reducer_location_was_added'
import AuthenticatingUserReducer from './reducer_authenticating_user'
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  locations: LocationsReducer,
  selectedLocation: SelectedLocationReducer,
  provisionalLocation: ProvisionalLocationReducer,
  locationWasAdded: LocationWasAddedReducer,
  authenticatingUser: AuthenticatingUserReducer,
  form: formReducer
});

export default rootReducer;
