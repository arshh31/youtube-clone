import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    showErrorMsg: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitData = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className="password-input-filed"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  renderShowPassword = () => {
    const {showPassword} = this.state
    return (
      <div className="passwordField">
        <input
          type="checkbox"
          id="show Password"
          value={showPassword}
          onChange={this.onShowPassword}
        />
        <label htmlFor="show Password">show Password</label>
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg, showPassword} = this.state
    console.log(showPassword)
    return (
      <div className="loginForm-Container">
        <form className="formContainer" onSubmit={this.onSubmitData}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="nxtWatch-logo"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">
            {this.renderPasswordField()}
            {this.renderShowPassword()}
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p>{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}
export default LoginForm
