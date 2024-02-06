import './index.css'

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  submitDetails = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userdetails = {username, password}

    const options = {method: 'POST', body: JSON.stringify(userdetails)}
    const apiUrl = 'https://apis.ccbp.in/login'

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        username: '',
        password: '',
        errorMsg: data.error_msg,
        showErrorMsg: true,
      })
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  usernameElement = () => {
    const {username, password, errorMsg, showErrorMsg} = this.state
    return (
      <div>
        <label htmlFor="username">USERNAME</label>
        <br />
        <input
          className="input_bar"
          type="text"
          value={username}
          id="username"
          placeholder="username"
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  passwordElement = () => {
    const {username, password, errorMsg, showErrorMsg} = this.state
    return (
      <div>
        <label htmlFor="password">PASSWORD</label>
        <br />
        <input
          className="input_bar"
          type="password"
          value={password}
          placeholder="password"
          id="password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main_container">
        <form className="login_card" onSubmit={this.submitDetails}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            style={{width: '150px', marginBottom: '30px'}}
            alt="website logo"
          />

          {this.usernameElement()}
          <br />
          {this.passwordElement()}
          <br />
          {showErrorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
          <button type="submit" className="login_btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
