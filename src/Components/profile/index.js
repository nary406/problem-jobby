import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../header'

class Profile extends Component {
  state = {profile: '', renderstatus: 'initial'}

  componentDidMount() {
    this.profileFetch()
  }

  profileFetch = async () => {
    this.setState({renderstatus: 'loading'})
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = 'https://apis.ccbp.in/profile'
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profile: updatedProfile, renderstatus: 'success'})
    } else {
      this.setState({renderstatus: 'failure'})
    }
  }

  profileFunction = () => {
    const {profile} = this.state

    return (
      <div>
        <div className="profile_div">
          <img src={profile.profileImageUrl} alt="profile" />
          <h1 style={{color: '#6366f1'}}>{profile.name}</h1>
          <p>{profile.shortBio}</p>
        </div>
      </div>
    )
  }

  retryView = () => {
    this.profileFetch()
  }

  renderLoadingView = () => {
    const {jobItemDetails, status} = this.state
    return (
      <div className="loaderSpin " data-testid="loader">
        <Loader type="ThreeDots" color="white" height="50" width="50" />
      </div>
    )
  }

  renderFailureView = () => {
    const jsf = 'sf'
    return (
      <div className="failure_container_3">
        <button
          onClick={this.retryView}
          type="button"
          style={{
            backgroundColor: 'blue',
            border: 'none',
            color: 'white',
            padding: '15px',
          }}
        >
          Retry
        </button>
      </div>
    )
  }

  renderCase = () => {
    const {profile, renderstatus} = this.state
    switch (renderstatus) {
      case 'success':
        return this.profileFunction()
      case 'loading':
        return this.renderLoadingView()
      case 'failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {profile, renderstatus} = this.state
    return this.renderCase()
  }
}

export default Profile
