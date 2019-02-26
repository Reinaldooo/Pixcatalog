import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { GoogleLogin } from 'react-google-login';
// //
import { white, blue, black } from '../utils/colors';
import { UserSVG } from '../utils/helper';

const Main = styled.div`
  position: relative;
  background-color: ${white};
  box-shadow: 5px 10px 25px rgba(0,0,0,.3);
  width: 40vw;
  max-width: 500px;
  border-radius: 1rem;
  height: 50vh;
  max-height: 600px;
  margin: 1rem auto 0;
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
  }
`

const StyledButton = styled.button`
  text-decoration: none;
  color: ${blue};
  display: inline-block;
  font-weight: 600;
  border-radius: 5px;
  padding: 10px 14px;
  background-color: ${white};
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

const Input = styled.input`
  display: block;
  height: 2.2rem;
  width: 60%;
  margin-bottom: 1rem;
  border: 2px solid ${blue};
  background-color: ${white};
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
    serverToken: null
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
    fetch('/api/get_token')
      .then(res => res.text())
      .then(serverToken => this.setState({ serverToken }))
  }
  responseGoogle = (response) => {
    fetch(`/gconnect?serverToken=${this.state.serverToken}&code=${response.code}`, { method: 'post' })
      .then(res => res.json())
      .then(res => {
        if (res.email) {
          this.props.logInUser(res)
          setTimeout(() => {
            this.props.history.push(this.props.location.state.from)
          }, 500);
        }
      })
  }

  componentDidMount() {
    this.getServerToken()
  }

  render() {
    let register = this.props.match.path === '/register'
    return (
      <Main>
        {
          this.state.loading ?
            <Spinner name="cube-grid" color={blue} fadeIn='half' />
            :
            <>
              <UserIcon>
                { console.log(this.props) }
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
                />
              </div>
            </>
        }
      </Main>
    );
  }
}

export default Login;