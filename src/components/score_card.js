import React from 'react';
import { floatsToTime } from '../helpers';

const ScoreCard = (props) => {

  const { review } = props

  return (
    <>
    <img id="location-card" src={review.img_url} />
    <img id="tape-top" src={require("../images/tape.png")} />
    <div id="comment-container">
      <p id="comment" className="score marker">{review.written_content}</p>
    </div>
    <p id="title-card" className="score marker">{review.title}</p>
    <p id="location-name-card" className="score marker">{review.location_name}</p>
    <p id="time-card" className="score marker">{floatsToTime(review.time_visited)}</p>
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

// SUMMARY: This card renders an image from ../images/score_card_800px and lays over
// several values on the card using absolute positioning of each <p> and relative positioning
// of the parent object in which this component is rendered. An additional function, floatsToTime
// is a conversion function that takes in 0-24hr values, like 6.5 or 9.0, and converts them
// to a a readable time
