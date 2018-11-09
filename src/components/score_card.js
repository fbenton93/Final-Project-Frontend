import React from 'react';

const ScoreCard = (props) => {
  // props should just be the bare review
  const { review } = props
  // time needs to be converted and changed to courier font
  return (
    <>
    <img id="location-card" src={review.img_url} />
    <div id="comment-container">
      <p id="comment" className="score marker">{review.written_content}</p>
    </div>
    <p id="time-card" className="score marker">{review.time_visited}</p>
    <p id="busy-card" className="score marker">{review.score_busyness}</p>
    <p id="ambiance-card" className="score marker">{review.score_ambiance}</p>
    <p id="table-card" className="score marker">{review.score_table_space}</p>
    <p id="noise-card" className="score marker">{review.score_noise_level}</p>
    <p id="study-card" className="score marker">{review.score_studying}</p>
    <p id="friend-card" className="score marker">{review.score_friendliness}</p>
    <p id="value-card" className="score marker">{review.score_value}</p>
    <p id="quality-card" className="score marker">{review.score_coffee_quality}</p>
    <p id="roast-card" className="score marker">{review.score_roast}</p>
    <p id="sig-card" className="score marker">{props.username}</p>
    </>
  )
}

export default ScoreCard
