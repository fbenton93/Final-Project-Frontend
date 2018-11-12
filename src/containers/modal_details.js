import React from 'react';
import {connect} from 'react-redux';
import ReviewForm from './form_review';
import _ from 'lodash';
import { Modal, Button, Card } from 'semantic-ui-react';
import {Radar, Polar} from 'react-chartjs-2';
import Review from '../components/review_component';

const DetailsModal = (props) => {
    const { radar1,radar2,reviews,atmospheres,roast} = props
    const radarData = {
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

    let roastLabels = []
    let roastValues = []
    for (let key in roast) {
      if (roast[key] > 0) {
        roastLabels.push(key)
        roastValues.push(roast[key])
      }
    }

    const polarData = {
      datasets: [{
        data: roastValues,
       backgroundColor: [
         'rgba(247,23,23,0.5)',
         'rgba(1,253,52,0.5)',
         'rgba(1,245,253,0.5)',
         'rgba(220,253,1,0.5)',
         'rgba(253,119,1,0.5)',
         'rgba(1,102,253,0.5)',
         'rgba(253,1,144,0.5)',
         'rgba(148,198,33,0.5)',
         'rgba(247,25,158,0.5)',
         'rgba(0,0,0,0.5)'
       ],
       label: 'Cup Qualities'
     }],
     labels: roastLabels
    }


    const locationImages = reviews.map((rev) => {
      return <Card><img src={rev.img_url} /><p className="marker">submitted by {rev.user.username}</p></Card>
    })

    const reviewsRows = reviews.map((review) => {
      return <Review key={review.id} data={review}></Review>
    })

    const percentageMatch = () => {
      let prefTotal = 0
      for (let key in props.currentUser) {
        if (key.toString().includes('pref') && !key.toString().includes('roast')) {
          prefTotal += props.currentUser[key]
        }
      }
      let attProportions = {}
      for (let key in props.currentUser) {
        if (key.toString().includes('pref') && !key.toString().includes('roast')) {
          attProportions[key] = (props.currentUser[key] / prefTotal) * 100
        }
      }
      let graded = 0
      for (let keyOne in attProportions) {
        const strippedKey = keyOne.toString().slice(5)
        for (let keyTwo in props.selectedLocation.averages) {
          if (keyTwo.includes(strippedKey)) {
            graded += attProportions[keyOne] * (props.selectedLocation.averages[keyTwo] / 10)
          }
        }
      }
      return <span style={{fontSize: '0.7em'}}><span id="percentage-match">{_.round(graded,2)}% Match</span> (Based On Your Preferences)</span>
    }


    return (

      <Modal trigger={<Button id="details-button">Analysis</Button>}>
        <Modal.Header>
          <h1>{props.name}</h1>
          <p>{percentageMatch()}</p>
          <p id="address-modal">{props.selectedLocation.address_line_1} | {props.selectedLocation.address_line_2}</p>
        </Modal.Header>
        <Modal.Content>
          <div id="scrolling-wrapper">
            <Card><img src="https://i.imgur.com/hG2dHwA.jpg" /><p className="marker">submitted by (username)</p></Card>
            {locationImages}
          </div>
        </Modal.Content>
        <Modal.Header>Summary</Modal.Header>
        <Modal.Content>
        <h3>Metrics Data</h3>
        <Radar data={radarData} options={{legend: {position: 'left'}}}/><br />
        <h3>What Reviewers Are Saying About The Coffee</h3>
        <Polar data={polarData} options={{legend: {position: 'left'}}}/>
        </Modal.Content>
        <Modal.Header>Reviews - Click for More Details</Modal.Header>
        <Modal.Content>{reviewsRows}</Modal.Content>
      </Modal>
    )
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    selectedLocation: state.selectedLocation
  }
}

export default connect(mapStateToProps)(DetailsModal)
