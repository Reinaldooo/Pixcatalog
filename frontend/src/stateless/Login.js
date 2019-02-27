import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { GoogleLogin } from 'react-google-login';// Import React FilePond
import axios from 'axios';
// //
import { white, blue, black } from '../utils/colors';
import { UserSVG } from '../utils/helper';

export const Main = styled.div`
  position: relative;
  /* show real white */
  background-color: ${props => props.white ? 'white' : white };
  box-shadow: 5px 10px 25px rgba(0,0,0,.3);
  width: 40vw;
  max-width: 500px;
  border-radius: 1rem;
  min-height: 50vh;
  /* height should be higher on upload page */
  max-height: ${props => props.upload ? '90%' : '700px' };
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
  color: ${blue};
  display: inline-block;
  font-weight: 600;
  border-radius: 5px;
  padding: 10px 14px;
  /* show real white */
  background-color: ${props => props.white ? 'white' : white };
  border: ${props => props.google ? 'none;' : '2px solid lightgray;'};
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
  background-color: ${props => props.white ? 'white' : white };
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
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
    fetchingGoogle: false,
    serverToken: null,
  }

  handleUser = (e) => {
    this.setState({ username: e.target.value })
  }
  handlePwd = (e) => {
    this.setState({ password: e.target.value })
  }
  handleLogin = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
      this.props.logInUser(this.state.username)
      this.props.history.push("/")
    }, 2000);
  }
  getServerToken = () => {
    axios('/api/get_token')
      .then(({data}) => this.setState({ serverToken: data }))
  }
  responseGoogle = (response) => {
    axios.post(`/gconnect`, {
      serverToken: this.state.serverToken,
      code: response.code
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.props.logInUser(res.data)
          this.props.history.push(this.props.location.state.from)
        }
      })
  }
  requestGoogle = () => {
    this.setState({ fetchingGoogle: true })
  }
  componentDidMount() {
    this.getServerToken()
  }

  render() {
    let register = this.props.match.path === '/register'
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
                type="text"
                name="username"
                placeholder='Username'
                onChange={this.handleUser}
                value={this.state.username}
              />
              <Input
                type="password"
                name="password"
                placeholder='Password'
                onChange={this.handlePwd}
                value={this.state.password}
              />
              {
                register &&
                <Input
                  type="password"
                  name="passwordConfirm"
                  placeholder='Confirm Password'
                  onChange={this.handlePwd}
                  value={this.state.passwordConfirm}
                />
              }
              <div>
                <StyledButton to='/' onClick={this.handleLogin}>{register ? 'Register' : 'Login'}</StyledButton>
                <p>{`You can also ${register ? 'register' : 'login'} using Google.`}</p>
                <GoogleLogin
                  clientId="498183963431-66mllp1fei6i56a90d6kcnqqrugesjui.apps.googleusercontent.com"
                  render={renderProps => (
                    <StyledButton google onClick={renderProps.onClick}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google-logo-button"/>
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