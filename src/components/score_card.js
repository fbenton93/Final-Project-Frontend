import React from 'react';

const ScoreCard = (props) => {
  // props should just be the bare review
  const { review } = props
  return (
    <>
    <img id="background-card" src="../images/score_card_800px.png" />
    <img id="location-card" src={review.img_url} />
    <p id="time-card">{review.time_visited}</p>
    <p id="busy-card">{review.score_busyness}</p>
    <p id="ambiance-card">{review.score_ambiance}</p>
    <p id="table-card">{review.score_table_space}</p>
    <p id="noise-card">{review.score_noise}</p>
    <p id="study-card">{review.score_studying}</p>
    <p id="friend-card">{review.score_friendliness}</p>
    <p id="value-card">{review.score_value}</p>
    <p id="quality-card">{review.score_coffee_quality}</p>
    <p id="roast-card">{review.score_roast}</p>
    <p id="sig-card">{props.username}</p>
    </>
  )
}

export default ScoreCard
