import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history'
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import './index.css';
import SignupPage from './containers/signup_page'
import LoginPage from './containers/login_page'
import MapContainer from './containers/map_container';
import UserProfile from './containers/user_profile'
import NavBar from './components/navbar'
import * as serviceWorker from './serviceWorker';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);




ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={history} >
      <div id="app-container">
        <NavBar />
        <Switch>
          <Route exact path="/" component={MapContainer} />
          <Route path="/user" component={UserProfile} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
