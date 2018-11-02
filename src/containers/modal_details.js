import React from 'react';
import ReviewForm from './form_review';
import { Modal, Button, Card } from 'semantic-ui-react';
import {Radar} from 'react-chartjs-2';
import Review from '../components/review_component'

const DetailsModal = (props) => {
    const { radar1,radar2,reviews } = props
    const data = {
      labels: ['Busyness','Ambiance','Table Space','Noise','As a Study Spot','Friendliness','Value','Coffee Quality'],
      datasets: [
        {
          label: 'This Shop',
          backgroundColor: 'rgba(255,0,0,0.2)',
          borderColor: 'rgba(255,0,0,1)',
          pointBackgroundColor: 'rgba(255,0,0,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,0,0,1)',
          data: [radar1.score_busyness,
                radar1.score_ambiance,
                radar1.score_table_space,
                radar1.score_noise_level,
                radar1.score_studying,
                radar1.score_friendliness,
                radar1.score_value,
                radar1.score_coffee_quality
              ]
        },
        {
          label: 'City Average',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [radar2.score_busyness,
                radar2.score_ambiance,
                radar2.score_table_space,
                radar2.score_noise_level,
                radar2.score_studying,
                radar2.score_friendliness,
                radar2.score_value,
                radar2.score_coffee_quality
              ]
        }
      ]
    }

    const locationImages = reviews.map((rev) => {
      return <Card><img src={rev.img_url} /><p className="marker">submitted by {rev.user.username}</p></Card>
    })

    const reviewsRows = reviews.map((review) => {
      return <Review key={review.id} data={review}></Review>
    })


    return (
      <Modal trigger={<Button id="details-button">Analysis</Button>}>
        <Modal.Header>{props.name}</Modal.Header>
        <Modal.Content>
          <div id="scrolling-wrapper">
            <Card><img src="https://i.imgur.com/hG2dHwA.jpg" /><p className="marker">submitted by (username)</p></Card>
            {locationImages}
          </div>
        </Modal.Content>
        <Modal.Header>Summary</Modal.Header>
        <Modal.Content><Radar data={data}/></Modal.Content>
        <Modal.Header>Reviews - Click for More Details</Modal.Header>
        <Modal.Content>{reviewsRows}</Modal.Content>
      </Modal>
    )
}

export default DetailsModal
