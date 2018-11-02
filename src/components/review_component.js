import React from 'react';
import {HorizontalBar} from 'react-chartjs-2'
import {Segment} from 'semantic-ui-react'

export default class Review extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false
    }
  }

  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    })
  }

  renderHorizontalbar = () => {
    const review = this.props.data
    const data = {
      labels: ['Busyness','Ambiance','Table Space','Noise','As a Study Spot','Friendliness','Value','Coffee Quality'],
      datasets: [
        {
          label: `${this.props.data.user.username}'s Review`,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWith: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [review.score_busyness,
                review.score_ambiance,
                review.score_table_space,
                review.score_noise_level,
                review.score_studying,
                review.score_friendliness,
                review.score_value,
                review.score_coffee_quality
              ]
        }
      ]
    }
    return <HorizontalBar data={data} />
  }

  render() {
    console.log(this.props)
    const {data} = this.props
    return (
      <Segment vertical onClick={this.handleClick}>
        <h4>{data.title}</h4>
        <p>{data.written_content}</p>
        {this.state.isClicked ? this.renderHorizontalbar() : null }
      </Segment>
    )
  }
}
