import React from 'react';
import { connect } from 'react-redux';

class GenericComponent extends React.Component {
  render() {
    return <div>You selected {this.props.genericProp.name}</div>
  }
}

function mapStateToProps(state) {
  return {
    genericProp: state.generic
  }
}

export default connect(mapStateToProps)(GenericComponent)
