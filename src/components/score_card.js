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

function floatsToTime(float) {
  let halfOfDay = ''
  if (float >= 12) {
    halfOfDay = "PM"
  } else {
    halfOfDay = "AM"
  }

  let hours = Math.floor(float)
  let minutes = ((float % 1) * 60)

  if (minutes == 0) {
    minutes = "00"
  }
  if (float >= 13) {
    hours -= 12
  }

  return `${hours}:${minutes} ${halfOfDay}`
}

export default ScoreCard
