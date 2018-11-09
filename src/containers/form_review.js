import React from 'react';
import {connect} from 'react-redux';
import {Segment,Grid,Button,Input,TextArea,Card} from 'semantic-ui-react';
import {Slider} from 'react-semantic-ui-range';
import { postNewLocation,fetchLocations, postNewReview } from '../actions';
import axios from 'axios'


class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      review: {
        "title": '',
        "written_content": '',
        "score_roast": '',
        "img_url": '',
        "time_visited": null,
        "score_busyness": 5,
        "score_ambiance": 5,
        "score_table_space": 5,
        "score_noise_level": 5,
        "score_studying": 5,
        "score_friendliness": 5,
        "score_value": 5,
        "score_coffee_quality": 5
      },
      errors: false,
      selectedFile: null
    }
  }

  handleFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  handleUpload = (e) => {
    const formData = new FormData()
    formData.append('file',this.state.selectedFile)
    formData.append('upload_preset', 'beanThere')
    if (this.state.selectedFile){
      axios.post('https://api.cloudinary.com/v1_1/fbenton93/image/upload', formData )
      .then(response => {
        this.setState({
          review: {
            ...this.state.review,
            "img_url": response.data.url
          }
        })
      })
    }
  }

  handleInput = (event) => {
    this.setState({
      review: {
        ...this.state.review,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.renderErrors().length > 0) {
      this.setState({
        errors: true
      })
    } else {
      if (this.props.provisionalLocation.id) {
        this.props.postNewReview(this.state.review,this.props.userId,this.props.provisionalLocation.id)
      } else {
        this.props.postNewLocation(this.state.review,this.props.userId,this.props.provisionalLocation)
      }

    }
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
          <Slider color={color} settings={settings} />
        </Segment>
      </Grid.Column>
    )
  }

  renderRoastDropdown = () => {
    return (
      <>
      <option key="under" value="Under Roasted">Under Roasted</option>
      <option key="right" value="Just Right">Just Right</option>
      <option key="over" value="Over Roasted">Over Roasted</option>
      <option key="burnt" value="Burnt">Burnt</option>
      <option key="bitter" value="Bitter">Too Bitter</option>
      <option key="acidic" value="Acidic">Too Acidic</option>
      <option key="weak" value="Weak">Weak</option>
      <option key="delicate" value="Delicate">Delicate</option>
      <option key="strong" value="Strong">Strong</option>
      <option key="tooStrong" value="Too Strong">Too Strong</option>
      </>
    )
  }

  handleRoastDropdown = (event) => {
    this.setState({
      review: {
        ...this.state.review,
        score_roast: event.target.value
      }

    })
  }

  renderTimeDropdown = () => {
    let timeItems = []
    let i = 6.0
    while (i <= 18.0) {
      timeItems.push(<option key={i} value={i}>{`${floatsToTime(i)}`}</option>)
      i += 0.5
    }
    return timeItems
  }

  handleTimeDropdown = (event) => {
    this.setState({
      review: {
        ...this.state.review,
        time_visited: event.target.value
      }
    })
  }



  renderErrors = () => {
    let errors = [];
    if (this.state.review.title.length < 4) {
      errors.push(<li>Enter a title with at least 4 characters</li>)
    }
    if (this.state.review.written_content.length < 15) {
      errors.push(<li>A review requires a written comment of at leat 15 characters</li>)
    }
    if (this.state.review.score_roast.length < 1) {
      errors.push(<li>A review requires a roast description</li>)
    }
    if (this.state.review.img_url.length < 1) {
      errors.push(<li>This review requires a completed image upload</li>)
    }
    if (!this.state.review.time_visited) {
      errors.push(<li>Enter the approximate time of your visit</li>)
    }
    return errors;
  }




  render() {
    const inputStyles= {width: "90%", height: "auto", margin: "5%"}
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid padded>
          <Grid.Column width={6}>
            <Card style={{height: "450px", width: "auto"}}>
              <Segment style={inputStyles}>
                <label>Review Title:</label>
                <br />
                <Input name="title" type="text" onChange={this.handleInput} value={this.state.review.title} />
              </Segment>
              <Segment style={inputStyles}>
                <label>Describe the Most Prominent Quality</label>
                <br />
                <select className="ui dropdown scrolling" onChange={this.handleRoastDropdown}>
                  {this.renderRoastDropdown()}
                </select>
              </Segment>
              <Segment style={inputStyles}>
                <label>Time Visited:</label>
                <br />
                <select className="ui dropdown scrolling" onChange={this.handleTimeDropdown}>
                    {this.renderTimeDropdown()}
                </select>
              </Segment>
            </Card>
          </Grid.Column>
          <Grid.Column width={6}>
            <Card style={{height: "450px", width: "auto"}}>
              <h1>{this.state.review.img_url == '' ? 'Upload an Image' : "Image Uploaded!" }</h1>
              {this.state.review.img_url !== '' ? <img src={this.state.review.img_url} /> : null}
              <Input style={inputStyles} type="file" name="review-pic" accept="image/*" onChange={this.handleFileChange} />
              <Button style={{width: "30%", margin: "5%"}} primary onClick={this.handleUpload}>Upload</Button>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <label>Comment:</label>
              <br />
              <TextArea style={{width: '100%', maxWidth: '100%'}}name="written_content" onChange={this.handleInput} value={this.state.review.written_content} />
            </Segment>
          </Grid.Column>
          {this.renderRange("score_busyness","How busy was this location?","red")}
          {this.renderRange("score_ambiance","Were you impressed by the ambiance?","orange")}
          {this.renderRange("score_table_space","Was there little or a lot of table space?","teal")}
          {this.renderRange("score_noise_level","How noisy was this location?","blue")}
          {this.renderRange("score_studying","Is this an appropriate place to study?","green")}
          {this.renderRange("score_friendliness","How friendly was the staff?","olive")}
          {this.renderRange("score_value","Rate the value of this cafe.","yellow")}
          {this.renderRange("score_coffee_quality","Rate the overall coffee quality.","red")}
        </Grid>
        <Button type="submit">Add New Location and Submit Review</Button>
        {this.state.errors ? <Segment inverted color="red" tertiary><ul>{this.renderErrors()}</ul></Segment> : null}
      </form>
    )
  }
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



function mapStateToProps(state) {
  return {
    userId: state.currentUser.user.id,
    provisionalLocation: state.provisionalLocation
  }
}




export default connect(mapStateToProps,{postNewLocation,postNewReview})(ReviewForm)
