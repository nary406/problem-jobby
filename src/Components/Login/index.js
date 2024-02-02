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

    Cookies.set('jwtToken', jwtToken, {expires: 30, path: '/'})
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
          type="text"
          value={username}
          id="username"
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
          type="password"
          value={password}
          id="password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwtToken')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <form
        onSubmit={this.submitDetails}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {this.usernameElement()}
        <br />
        {this.passwordElement()}
        <br />
        {showErrorMsg && <p>{errorMsg}</p>}
        <button type="Submit">login</button>
      </form>
    )
  }
}

export default Login
