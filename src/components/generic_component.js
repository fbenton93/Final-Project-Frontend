import React from 'react';
import GenericList from '../containers/generic_list';
import GenericContainer from '../containers/generic_container';


export default class GenericComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
      <GenericList />
      <GenericContainer />
      </>
    );
  }
}
