import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history'

import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import './index.css';
import LoginSignupPage from './containers/login_signup_page'
import GenericContainer from './containers/generic_container';
import UserProfile from './containers/user_profile'
import NavBar from './components/navbar'
import * as serviceWorker from './serviceWorker';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

// routes library has been installed, but is not implement in this starter.


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={history} >
      <div id="app-container">
        <NavBar />
        <Switch>
          <Route exact path="/" component={GenericContainer} />
          <Route path="/user" component={UserProfile} />
          <Route path="/login" component={LoginSignupPage} />
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
