import React, { Component } from 'react';
import './App.css';
import GenericList from './containers/generic_list';
import GenericContainer from './containers/generic_container';
import GenericComponent from './components/generic_component';

class App extends Component {
  render() {
    return (
      <>
      <GenericList />
      <GenericContainer />
      <GenericComponent />
      </>
    );
  }
}

export default App;
