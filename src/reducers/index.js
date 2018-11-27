import { combineReducers } from 'redux';
import CurrentUserReducer from './reducer_current_user';
import LocationsReducer from './reducer_locations';
import NearbyLocationsReducer from './reducer_nearby_locations';
import SelectedLocationReducer from './reducer_selected_location';
import ProvisionalLocationReducer from './reducer_provisional_location';
import LocationWasAddedReducer from './reducer_location_was_added';
import UserCoords from './reducer_user_coords';
import ValidCredentialsReducer from './reducer_valid_credentials';



const rootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  locations: LocationsReducer,
  nearbyLocations: NearbyLocationsReducer,
  selectedLocation: SelectedLocationReducer,
  provisionalLocation: ProvisionalLocationReducer,
  locationWasAdded: LocationWasAddedReducer,
  validCredentials: ValidCredentialsReducer,
  userCoords: UserCoords
});

export default rootReducer;
