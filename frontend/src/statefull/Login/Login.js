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
import { MainWhiteBox, StyledButtonWhite } from '../../basicStyles';


class Login extends Component {

  state = {
    username: '',
    password: '',
    fetching: false,
    serverToken: null,
    invalidCredentials: false,
    googleLoginError: false
  }

  handleLogin = () => {
    let redirectTo = this.props.location.state ? this.props.location.state.from : '/'
    if (redirectTo === '/login' || redirectTo === '/register') { redirectTo = '/' }

    this.setState({ fetching: true })

    let user = {}
    user.username = this.state.username
    user.password = this.state.password

    axios.post(`/api/login`, user, config)
      .then(({ data }) => {
        if (data.username) {
          this.props.logInUser(data)
          this.props.history.push(redirectTo)
        } else {
          this.setState({ invalidCredentials: true, fetching: false })
          setTimeout(() => { this.setState({ invalidCredentials: false }) }, 2500)
        }
      })
  }

  getServerToken = () => {
    axios('/api/get_token')
    .then(({ data }) => { this.setState({ serverToken: data })})
  }

  responseGoogle = (response) => {
    let payload = {
      serverToken: this.state.serverToken,
      code: response.code
    }
    axios.post(`/gconnect`, payload, config)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.logInUser(data)
          this.props.history.push('/')
        }
      })
      .catch(() => {
        this.setState({ googleLoginError: true, fetching: false })
        setTimeout(() => {
          this.setState({ googleLoginError: false })
        }, 2000);
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
      invalidCredentials,
      googleLoginError
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
              <Condition test={googleLoginError}>
                <ErrorFlash>Ops, Google login failed. Please try again.</ErrorFlash>
              </Condition>
              <UserInfo
                username={username}
                password={password}
                handleTextInput={this.handleTextInput}
              />
              <div className="buttons">
                <StyledButtonWhite onClick={this.handleLogin}>Login</StyledButtonWhite>
                <Condition test={this.state.serverToken}>
                <p>You can also login using Google.</p>
                <GoogleLogin
                  clientId="498183963431-66mllp1fei6i56a90d6kcnqqrugesjui.apps.googleusercontent.com"
                  render={renderProps => (
                    <StyledButtonWhite google onClick={renderProps.onClick}>
                      <img src={googleSVG} alt="google-logo-button" />
                    </StyledButtonWhite>
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