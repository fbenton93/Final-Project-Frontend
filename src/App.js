import React, { Component } from 'react';
import './App.css';
import GenericList from './containers/generic_list';
import GenericComponent from './containers/generic_container';

class App extends Component {
  render() {
    return (
      <>
      <GenericList />
      <GenericComponent />
      </>
    );
  }
}

export default App;
