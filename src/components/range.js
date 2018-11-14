import React from 'react';

const Range = (name,label,color) => {

}










renderRange = (name,label,color,) => {
  const settings = {
    start: this.state.review[name],
    min: 0,
    max: 10,
    step: 1,
    onChange: (value) => {
      this.setState({
        review: {
          ...this.state.review,
          [name]: value
        }
      })
    }
  }
  return (
    <Grid.Column width={6}>
      <Segment>
        <label>{label}</label>
        <br />
        <p>(Current Val: {this.state.review[name]})</p>
        <Slider color={color} settings={settings} />
      </Segment>
    </Grid.Column>
  )
}
