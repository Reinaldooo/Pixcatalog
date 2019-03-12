import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { GoogleLogin } from 'react-google-login';// Import React FilePond
import axios from 'axios';
// Local imports
import { blue } from '../../utils/colors';
import { config } from '../../utils/helper';
import googleSVG from '../../images/google.svg';
import { ErrorFlash } from '../../utils/customStyledComponents';
import UserInfo from '../../stateless/UserInfo/UserInfo';
import Condition from '../../stateless/Condition/Condition';
import { MainWhiteBox, StyledButtonOne } from '../../basicStyles';


class Login extends Component {

  state = {
    username: '',
    password: '',
    fetching: false,
    serverToken: null,
    invalidCredentials: false
  }

  handleSave = () => {
    let redirectTo = this.props.location.state ? this.props.location.state.from : '/'
    if (redirectTo === '/login' || redirectTo === '/register') { redirectTo = '/' }

    this.setState({ fetching: true })
    let user = {}
    user.username = this.state.username
    user.password = this.state.password
    this.setState({ fetching: true })
    axios.post(`/api/login`, user, config)
      .then(({ data }) => {
        if (!data.status) {
          this.setState({ invalidCredentials: true, fetching: false })
          setTimeout(() => { this.setState({ invalidCredentials: false }) }, 2500)
        } else {
          this.props.logInUser(data)
          this.props.history.push(redirectTo)
        }
      })
  }

  getServerToken = () => {
    axios('/api/get_token')
    .then(({ data }) => { this.setState({ serverToken: data })})
  }

  responseGoogle = (response) => {
    axios.post(`/gconnect`, {
      serverToken: this.state.serverToken,
      code: response.code
    }, config)
      .then(({ data, status }) => {
        if (status === 200) {
          this.props.logInUser(data)
          this.props.history.push('/')
        }
      })
  }

  requestGoogle = () => {
    this.setState({ fetching: true })
  }

  handleTextInput = (e) => {
    switch (e.target.name) {
      case 'username':
        this.setState({ username: e.target.value })
        break
      case 'password':
        this.setState({ password: e.target.value })
        break
      default:
        break
    }
  }


  componentDidMount() {
    let localUser = JSON.parse(sessionStorage.getItem('user'))
    if (localUser) {
      // Check if user is already on the session
      this.props.history.push('/')
    } else {
      // Check if user is already logged in the server
      axios('/api/check_credentials')
        .then(({ data }) => {
          if (!data.error) {
            sessionStorage.setItem('user', JSON.stringify(data))
            this.props.history.push('/')
          } else {
            // By getting here, the user is in fact not connected
            this.getServerToken()
          }
        });
    }
  }

  render() {
    let {
      username,
      password,
      invalidCredentials
    } = this.state

    return (
      <MainWhiteBox>
        {
          (this.state.fetching) ?
            <Spinner name="ball-grid-pulse" color={blue} fadeIn='half' />
            :
            <>
              <Condition test={invalidCredentials}>
                <ErrorFlash>Invalid user or password</ErrorFlash>
              </Condition>
              <UserInfo
                username={username}
                password={password}
                handleTextInput={this.handleTextInput}
              />
              <div className="buttons">
                <StyledButtonOne to='/' onClick={this.handleSave}>Login</StyledButtonOne>
                <Condition test={this.state.serverToken}>
                <p>You can also loginusing Google.</p>
                <GoogleLogin
                  clientId="498183963431-66mllp1fei6i56a90d6kcnqqrugesjui.apps.googleusercontent.com"
                  render={renderProps => (
                    <StyledButtonOne google onClick={renderProps.onClick}>
                      <img src={googleSVG} alt="google-logo-button" />
                    </StyledButtonOne>
                  )}
                  responseType="code"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  onRequest={this.requestGoogle}
                />
                </Condition>
              </div>
            </>
        }
      </MainWhiteBox>
    );
  }
}

export default Login;