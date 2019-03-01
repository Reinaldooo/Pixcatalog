import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { GoogleLogin } from 'react-google-login';// Import React FilePond
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
// //
import { white, blue, black, red } from '../utils/colors';
import { UserSVG } from '../utils/helper';

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

  p {
    color: ${black};
    font-size: .8rem;
    margin-bottom: 0;
    margin-top: 2rem;

    &.register-user {
      margin: 1rem auto 2rem;
    }
  }
`

export const StyledButton = styled.button`
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
  margin: .5rem .2rem;
  text-align: center;
  font-size: .9em;
  cursor: pointer;

  img {
    height: 40px;
  }
`

export const Input = styled.input`
  display: block;
  height: 2.2rem;
  width: 60%;
  margin-bottom: 1rem;
  border: 2px solid ${blue};
  /* show real white */
  background-color: ${props => props.white ? '#f1f0ef' : white};
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
`

export const InputDebounce = styled(DebounceInput)`
  display: block;
  height: 2.2rem;
  width: 60%;
  margin-bottom: 1rem;
  border: ${props => props.used === 'yes' ? `2px solid ${red}` : `2px solid ${blue}`};
  /* show real white */
  background-color: ${props => props.white ? '#f1f0ef' : white};
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);

  :focus {
    outline: none;
  }
`

const UserIcon = styled.div`
  width: 40px;
  margin-bottom: 1rem;
`

class Login extends Component {

  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    fetchingGoogle: false,
    serverToken: null,
    usernameUsed: "no",
    emailUsed: "no",
  }

  handleSave = () => {
    let register = this.props.match.path === '/register'
    if (register) {
      let newUser = {}
      newUser.username = this.state.username
      newUser.password = this.state.password
      newUser.email = this.state.email
      axios.post(`/api/create_user`, newUser)
      .then((res) => { console.log(res) })
    } else {
      this.setState({ fetchingGoogle: true })
      let user = {}
      user.username = this.state.username
      user.password = this.state.password
      axios.post(`/api/login`, user)
      .then(({ data }) => {
        console.log(data)
        this.props.logInUser(data)
        this.props.history.push('/')
       })      
    }
  }

  getServerToken = () => {
    axios('/api/get_token')
      .then(({ data }) => this.setState({ serverToken: data }))
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
    this.setState({ username: e.target.value })
    // axios.post(`/api/check_username/${this.state.username}`)
    //   .then(({ status, data }) => {
    //     if (status === 200) {
    //       data === 'Used' && this.setState({ usernameUsed: 'yes' })
    //     }
    //   })
  }

  checkEmail= (e) => {
    this.setState({ email: e.target.value })
    // axios.post(`/api/check_email/${e.target.value}`)
    //   .then(({ status, data }) => {
    //     if (status === 200) {
    //       data === 'Used' && this.setState({ emailUsed: 'yes' }); console.log(data)
    //     }
    //   })
  }

  requestGoogle = () => {
    this.setState({ fetchingGoogle: true })
  }

  handleTextInput = (e) => {
    switch (e.target.name) {
      case 'password':
        this.setState({ password: e.target.value })
        break
      case 'passwordConfirm':
        this.setState({ passwordConfirm: e.target.value })
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
        passwordConfirm: ''
      })
      if (this.props.match.path === '/login') {
        this.getServerToken()
      }
    }
  }

  render() {
    let register = this.props.match.path === '/register'
    let { usernameUsed, emailUsed } = this.state
    return (
      <Main>
        {
          (this.state.loading || this.state.fetchingGoogle) ?
            <Spinner name="ball-grid-pulse" color={blue} fadeIn='half' />
            :
            <>
              <UserIcon>
                <UserSVG />
              </UserIcon>
              <Input
                placeholder="Username"
                name="username"
                value={this.state.username}
                used={usernameUsed}
                onChange={this.checkUser}
              />
              {
                register &&
                <Input
                  placeholder="Email"
                  name="email"
                  value={this.state.email}                  
                  used={emailUsed}
                  onChange={this.checkEmail}
                />
              }
              <Input
                type="password"
                name="password"
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleTextInput}
              />
              {
                register &&
                <Input
                  type="password"
                  name="passwordConfirm"
                  placeholder='Confirm Password'
                  value={this.state.passwordConfirm}
                  onChange={this.handleTextInput}
                />
              }
              <div>
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