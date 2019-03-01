import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { GoogleLogin } from 'react-google-login';// Import React FilePond
import axios from 'axios';
import debounce from 'lodash.debounce'
// Local imports
import { white, blue, black, red } from '../utils/colors';
import { UserSVG } from '../utils/helper';
import { ErrorFlash, SuccessFlash, UserIcon } from '../utils/customStyledComponents';
import UserInfo from './UserInfo';

export const Main = styled.div`
  position: relative;
  /* show real white */
  background-color: ${props => props.white ? '#f1f0ef' : white};
  box-shadow: 5px 10px 25px rgba(0,0,0,.3);
  width: 40vw;
  max-width: 500px;
  border-radius: 1rem;
  min-height: 50vh;
  /* height should be higher on upload page */
  max-height: ${props => props.upload ? '90%' : '700px'};
  margin: 1rem auto 0;
  padding: 1rem 2rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div.buttons {
    margin-top: 1rem;
  }

  p {
    color: ${black};
    font-size: .8rem;
    margin-bottom: 0;
    margin-top: 1.5rem;

    &.register-user {
      margin: 1rem auto 2rem;
    }
  }
`

export const StyledButton = styled.button`
  margin-top: 1.4rem;
  text-decoration: none;
  color: ${props => props.danger ? red : blue};
  display: inline-block;
  font-weight: 400;
  border-radius: 5px;
  padding: 5px 14px;
  /* show real white */
  background-color: ${props => props.white ? '#f1f0ef' : white};
  border: none;
  box-shadow: ${props => props.google ? 'none;' : '0 0 15px rgba(0,0,0,.2);'};
  margin: 1rem .2rem;
  text-align: center;
  font-size: .9em;
  cursor: pointer;

  img {
    height: 40px;
  }
`

class Login extends Component {

  state = {
    regSuccess: false,
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
    invalidCredentials: false,
    validPasswordCheck: false,
    registerInputError: false,
    registerInputErrorText: ''
  }

  debounceCheck = debounce((type, data) => {
    if (type === "user") {
      axios.post(`/api/check_username/${data}`)
        .then(({ status, data }) => {
          console.log(data)
          if (status === 200) {
            data === 'Used' ?
             this.setState({ usernameUsed: 'yes', userValid: false })
             :
             this.setState({ userValid: true })
          }
        })
    } else {
      axios.post(`/api/check_email/${data}`)
        .then(({ status, data }) => {
          if (status === 200) {
            data === 'Used' && this.setState({ emailUsed: 'yes', emailValid: false }); console.log(data)
          }
        })
    }
  }, 1500);

  handleSave = () => {
    let register = this.props.match.path === '/register'
    let redirectTo = this.props.location.state ? this.props.location.state.from : '/'
    if (redirectTo === '/login' || redirectTo === '/register') redirectTo = '/'

    if (register) { //REGISTER VALIDATION

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
        axios.post(`/api/create_user`, newUser)
          .then(({status, data}) => {
            console.log(data)
            if (status === 201) {
              this.setState({ regSuccess: true })
              setTimeout(() => { this.setState({ regSuccess: false }) }, 2000)
              this.props.history.push('/login')
            }
          })
      }

    } else { // LOGIN
      this.setState({ fetching: true })
      let user = {}
      user.username = this.state.username
      user.password = this.state.password
      axios.post(`/api/login`, user)
        .then(({ data }) => {
          if (!data.status) {
            console.log(data)
            this.setState({ invalidCredentials: true, fetching: false })
            setTimeout(() => { this.setState({ invalidCredentials: false }) }, 3000)
          } else {
            console.log(data)
            this.props.logInUser(data)
            this.props.history.push(redirectTo)
          }
        })
    }
  }

  getServerToken = () => {
    axios('/api/get_token')
      .then(({ data }) => this.setState({ serverToken: data }))
    //In production, get the window.token
  }

  responseGoogle = (response) => {
    axios.post(`/gconnect`, {
      serverToken: this.state.serverToken,
      code: response.code
    })
      .then(({ data, status }) => {
        console.log(data)
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
    if (this.props.match.path === '/login') {
      this.getServerToken()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.path !== this.props.match.path) {
      this.setState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        fetching: false
      })
      if (this.props.match.path === '/login') {
        this.getServerToken()
      }
    }
  }

  render() {
    let register = this.props.match.path === '/register'
    let {
      usernameUsed,
      emailUsed,
      username,
      password,
      passwordConfirm,
      email,
      invalidCredentials,
      registerInputError,
      registerInputErrorText,
      regSuccess } = this.state

    return (
      <Main>
        {
          (this.state.loading || this.state.fetching) ?
            <Spinner name="ball-grid-pulse" color={blue} fadeIn='half' />
            :
            <>
              {
                invalidCredentials && <ErrorFlash>Invalid user or password</ErrorFlash>
              }
              {
                registerInputError && <ErrorFlash>{registerInputErrorText}</ErrorFlash>
              }
              {
                regSuccess && <SuccessFlash>User Created, please login</SuccessFlash>
              }
              <UserIcon>
                <UserSVG />
              </UserIcon>
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
                register={register}
              />
              <div className="buttons">
                <StyledButton to='/' onClick={this.handleSave}>{register ? 'Register' : 'Login'}</StyledButton>
                <p>{`You can also ${register ? 'register' : 'login'} using Google.`}</p>
                <GoogleLogin
                  clientId="498183963431-66mllp1fei6i56a90d6kcnqqrugesjui.apps.googleusercontent.com"
                  render={renderProps => (
                    <StyledButton google onClick={renderProps.onClick}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google-logo-button" />
                    </StyledButton>
                  )}
                  responseType="code"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  onRequest={this.requestGoogle}
                />
              </div>
            </>
        }
      </Main>
    );
  }
}

export default Login;