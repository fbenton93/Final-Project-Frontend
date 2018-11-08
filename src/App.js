import React from 'react';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import './index.css';
import SignupPage from './containers/page_signup'
import LoginPage from './containers/page_login'
import MapContainer from './containers/page_map';
import UserProfile from './containers/page_user'
import ErrorPage from './components/page_not_found'
import NavBar from './components/navbar'




const App = props => {
  return (
    <div id="app-container">
      <NavBar />
      <Switch>
        <Route exact path="/" component={MapContainer} />
        <Route path="/user" component={UserProfile} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  )
}


export default withRouter(App)
