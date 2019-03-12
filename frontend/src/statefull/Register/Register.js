import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { GoogleLogin } from 'react-google-login';// Import React FilePond
import axios from 'axios';
import debounce from 'lodash.debounce'
// Local imports
import { blue } from '../../utils/colors';
import { MainWhiteBox, StyledButtonOne } from '../../basicStyles';
import { config } from '../../utils/helper';
import googleSVG from '../../images/google.svg';
import { ErrorFlash, SuccessFlash } from '../../utils/customStyledComponents';
import UserInfo from '../../stateless/UserInfo/UserInfo';
import Condition from '../../stateless/Condition/Condition';


class Login extends Component {

  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    fetching: false,
    serverToken: null,
    usernameUsed: "no",
    emailUsed: "no",
    emailValid: false,
    userValid: false,
    validPasswordCheck: false,
    registerInputError: false,
    registerInputErrorText: '',
    regSuccess: false,
  }

  debounceCheck = debounce((type, data) => {
    if (type === "user") {
      axios.post(`/api/check_username`, { username: data }, config)
        .then(({ status, data }) => {
          if (status === 200) {
            data === 'Used' ?
             this.setState({ usernameUsed: 'yes', userValid: false })
             :
             this.setState({ userValid: true })
          }
        })
    } else {
      axios.post(`/api/check_email`, { email: data }, config)
        .then(({ status, data }) => {
          if (status === 200) {
            data === 'Used' && this.setState({ emailUsed: 'yes', emailValid: false });
          }
        })
    }
  }, 1500);

  handleSave = () => {
    let redirectTo = this.props.location.state ? this.props.location.state.from : '/'
    if (redirectTo === '/login' || redirectTo === '/register') redirectTo = '/'

    if (!this.state.emailValid || !this.state.userValid) {
      this.setState({ registerInputError: true, registerInputErrorText: "Please fill all fields." })
      setTimeout(() => {
        this.setState({ registerInputError: false, registerInputErrorText: "" })
      }, 2000);

    } else if (!this.state.validPasswordCheck) {

      this.setState({ registerInputError: true, registerInputErrorText: "Passwords don't match" })
      setTimeout(() => {
        this.setState({ registerInputError: false, registerInputErrorText: "" })
      }, 2000);

    } else { //REGISTER USER  

      let newUser = {}
      newUser.username = this.state.username
      newUser.password = this.state.password
      newUser.email = this.state.email
      axios.post(`/api/create_user`, newUser, config)
        .then(({ status, data }) => {
          if (status === 201) {
            this.setState({ regSuccess: true })
            setTimeout(() => {
              this.setState({ regSuccess: false })
              this.props.history.push('/login')
            }, 2000)
          }
        })
    }

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

  checkUser = (e) => {
    let register = this.props.match.path === '/register'
    this.setState({ usernameUsed: 'no', username: e.target.value })
    if (register) {
      if (e.target.value.length > 1) {
        this.debounceCheck('user', e.target.value)
      }
    }
  }

  checkEmail = (e) => {
    this.setState({ email: e.target.value, emailUsed: 'no' })
    let valid = e.target.value.includes('@' && '.')
    if (valid) {
      this.setState({ emailValid: true })
      this.debounceCheck('email', e.target.value)
    } else {
      this.setState({ emailValid: false })
    }
  }

  requestGoogle = () => {
    this.setState({ fetching: true })
  }

  handleTextInput = (e) => {
    switch (e.target.name) {
      case 'password':
        this.setState({ password: e.target.value })
        if (this.state.passwordConfirm === e.target.value) {
          this.setState({ validPasswordCheck: true })
        } else {
          this.setState({ validPasswordCheck: false })
        }
        break
      case 'passwordConfirm':
        this.setState({ passwordConfirm: e.target.value })
        if (this.state.password === e.target.value) {
          this.setState({ validPasswordCheck: true })
        } else {
          this.setState({ validPasswordCheck: false })
        }
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
      usernameUsed,
      emailUsed,
      username,
      password,
      passwordConfirm,
      email,
      registerInputError,
      registerInputErrorText,
      regSuccess } = this.state

    return (
      <MainWhiteBox>
        {
          (this.state.fetching) ?
            <Spinner name="ball-grid-pulse" color={blue} fadeIn='half' />
            :
            <>
              <Condition test={registerInputError}>
                <ErrorFlash>{registerInputErrorText}</ErrorFlash>
              </Condition>
              <Condition test={regSuccess}>
                <SuccessFlash>User Created, please login</SuccessFlash>
              </Condition>
              <UserInfo
                usernameUsed={usernameUsed}
                emailUsed={emailUsed}
                username={username}
                password={password}
                passwordConfirm={passwordConfirm}
                email={email}
                handleTextInput={this.handleTextInput}
                checkUser={this.checkUser}
                checkEmail={this.checkEmail}
                register={true}
              />
              <div className="buttons">
                <StyledButtonOne to='/' onClick={this.handleSave}>Register</StyledButtonOne>
                <Condition test={this.state.serverToken}>
                <p>You can also register using Google.</p>
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