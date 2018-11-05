import React from 'react';

const PreviewInfo = (props) => {
  const {selectedLocation} = props
  const latestReview = selectedLocation.reviews.slice(-1)[0]
  return (
    <div id="preview-content">
      <h2>{selectedLocation.name}</h2>
      <p>{selectedLocation.address_line_1} | {selectedLocation.address_line_2}</p>
      <h3>Latest Review:</h3>
      <h4>{latestReview.title}</h4>
      <p>{latestReview.written_content}</p><p>- <strong>{latestReview.user.username}</strong></p>
    </div>

  )
}

export default PreviewInfo
