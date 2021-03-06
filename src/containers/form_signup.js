import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router'
import {Segment,Grid,Button,Card} from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import { postNewUser } from '../actions'
import { updateUserPrefs } from '../actions/user'
import axios from 'axios'




class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.preferences) {
      const { user } = this.props.currentUser
      this.state = {
        user: {
          "pref_busyness": user.pref_busyness,
          "pref_noise_level": user.pref_noise_level,
          "pref_ambiance": user.pref_ambiance,
          "pref_coffee_quality": user.pref_coffee_quality,
          "pref_light_roast": user.pref_light_roast,
          "pref_medium_roast": user.pref_medium_roast,
          "pref_dark_roast": user.pref_dark_roast,
          "pref_table_space": user.pref_table_space,
          "pref_studying": user.pref_studying
        },
        userId: user.id,
        didSubmit: false,
        didUpdate: false
      }
    } else {
      this.state = {
        user: {
          "username": '',
          "password": '',
          "password_confirmation": '',
          "profile_img_url": null,
          "pref_busyness": 5,
          "pref_noise_level": 5,
          "pref_ambiance": 5,
          "pref_coffee_quality": 5,
          "pref_light_roast": 5,
          "pref_medium_roast": 5,
          "pref_dark_roast": 5,
          "pref_table_space": 5,
          "pref_studying": 5
        },
        errors: false,
        selectedFile: null,
        didSubmit: false
      }
    }
    // initialize for signup

  }

  handleUpload = (e) => {
    const formData = new FormData()
    formData.append('file',this.state.selectedFile)
    formData.append('upload_preset', 'beanThere')
    if (this.state.selectedFile){
      axios.post('https://api.cloudinary.com/v1_1/fbenton93/image/upload', formData )
      .then(response => {
        this.setState({
          user: {
            ...this.state.user,
            "profile_img_url": response.data.url
          }
        })
      })
    }
  }

  handleFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.preferences) {
      this.props.updateUserPrefs(this.state.user,this.state.userId)
      this.setState({
        didUpdate: true
      })
      setTimeout(() => this.setState({didUpdate: false}), 10000)
    } else {
      if (this.renderErrors().length > 0) {
        this.setState({
          errors: true
        })
      } else {
        this.props.postNewUser(this.state.user)
        this.setState({
          didSubmit: true
        })
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  renderRange = (name,label,color,) => {
    const settings = {
      start: this.state.user[name],
      min: 0,
      max: 10,
      step: 1,
      onChange: (value) => {
        this.setState({
          user: {
            ...this.state.user,
            [name]: value
          }
        })
      }
    }
    return (
      <Grid.Column width={6}>
        <Segment>
          <label>{label} (Val: {this.state.user[name]})</label>
          <Slider color={color} settings={settings} />
        </Segment>
      </Grid.Column>
    )
  }

  renderErrors = () => {
    let errors = []
    if (this.state.user.password != this.state.user.password_confirmation) {
      errors.push(<li>"Password and confirmation do not match."</li>)
    }
    if (this.state.user.password < 5) {
      errors.push(<li>"Password must be at least 6 characters long"</li>)
    }
    if (this.state.user.username < 5) {
      errors.push(<li>"Username must be at least 5 characters long"</li>)
    }
    if (!this.state.user.profile_img_url) {
      errors.push(<li>"Profile image upload is incomplete. Try again."</li>)
    }
    return errors
  }

  renderSignup = () => {
    return (
      <Grid id="signup-grid">
        <Grid.Column width={6}>
          <Card style={{height: "450px", width: "auto"}}>
            <Segment style={{width: "80%", margin: "15% 10% 5% 10%"}}>
              <label>Enter a new Username</label>
              <br />
              <input name="username" value={this.state.user.username} onChange={this.handleChange} />
            </Segment>
            <Segment style={{width: "80%", margin: "5% 10%"}}>
              <label>Enter a Password</label>
              <br />
              <input name="password" value={this.state.user.password} onChange={this.handleChange} />
            </Segment>
            <Segment style={{width: "80%", margin: "5% 10%"}}>
              <label>Password Confirmation</label>
              <br />
              <input name="password_confirmation" value={this.state.user.password_confirmation} onChange={this.handleChange} />
            </Segment>
          </Card>
        </Grid.Column>
        <Grid.Column width={6}>
          <Card id="img-upload-card" style={{height: "450px", width: "auto"}}>
              <h1>Upload a photo!</h1>
              {this.state.user.profile_img_url ? <img src={this.state.user.profile_img_url} style={{height:"60%", width: "60%",margin: "10% 20%"}} /> : null}
              <div>
                <input type="file" name="profile_pic" accept="image/*" onChange={this.handleFileChange} />
                <button onClick={this.handleUpload}>Upload</button>
              </div>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }

  render() {
    const ifUpdated = this.state.didUpdate ? 'Changes Submitted' : 'Save Changes'
    const submitMessage = this.props.preferences ? `${ifUpdated}` : "Submit and Begin!"
    return this.state.didSubmit ? <Redirect to="/user" /> : (
      <form id="signup-form" onSubmit={this.handleSubmit}>
        {this.props.preferences ? null : this.renderSignup()}
        <h2>Indicate Preferences on the Sliders Below</h2>
        <Grid padded>
          {this.renderRange("pref_busyness","Preferred Busyness","red")}
          {this.renderRange("pref_noise_level","Preferred Noisiness","teal")}
          {this.renderRange("pref_ambiance","How Important is Ambiance?","orange")}
          {this.renderRange("pref_coffee_quality","How important is Coffee Quality?","yellow")}
          {this.renderRange("pref_light_roast","Light Roast Preference","olive")}
          {this.renderRange("pref_medium_roast","Medium Roast Preference","green")}
          {this.renderRange("pref_dark_roast","Dark Roast Preference","teal")}
          {this.renderRange("pref_table_space","How much Table Space do You Need?","red")}
          {this.renderRange("pref_studying","How often are you looking to study at a shop?","orange")}
          <Grid.Column width={12}>
            <Segment id="grid-submit">
              <button type="submit">{submitMessage}</button>
            </Segment>
          </Grid.Column>
        </Grid>
        {this.state.errors ? <Segment inverted color="red" tertiary><ul>{this.renderErrors()}</ul></Segment> : null}
      </form>

    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps,{postNewUser, updateUserPrefs})(SignupForm)
