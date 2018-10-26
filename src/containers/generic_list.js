import React from 'react';
import { connect } from 'react-redux';
import { genericAction } from '../actions/index';
import { bindActionCreators } from 'redux';



class GenericList extends React.Component {
  renderStaticData = () => {
    return this.props.staticProp.map((data) => {
      return (
        <div key={data.name} onClick={() => {this.props.genericAction({data})}}>
        Name: {data.name}, Value: {data.value}
        </div>
      )
    })
  }
  render() {
    return (<div>{this.renderStaticData()}</div>)
  }
}

function mapStateToProps(state) {
  // makes this.props.genericProp accessible in this container
  // points to the state.generic value
  // more values can be added as key/value pairs
  return {
    genericProp: state.generic,
    staticProp: state.static
  };
}

function mapDispatchToProps(dispatch) {
  // makes this.props.genericAction accessible as a function in this container
  // more actions/functions can be added in the first arg as key/value pairs
  return bindActionCreators({genericAction: genericAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GenericList)
// 'connect' makes this component a container with access to the 'generic' property
// that is stored in state at the '../reducers/index.js' combinedReducer
