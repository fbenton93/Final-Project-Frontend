import React from 'react';

const PreviewInfo = (props) => {
  return (
    <div id="preview-content">
      <h2>{props.name}</h2>
      <h3>Latest Review:</h3>
      <h4>{props.review.title}</h4>
      <p>{props.review.written_content} -<strong>{props.review.user.username}</strong></p>
    </div>

  )
}

export default PreviewInfo
