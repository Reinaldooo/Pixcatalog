import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
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
`

const StyledButton = styled.button`
  text-decoration: none;
  color: ${white};
  display: block;
  font-weight: 600;
  border-radius: 5px;
  padding: 10px 14px;
  background-color: ${blue};
  margin: .5rem .2rem;
  text-align: center;
  border: none;
  font-size: .9em;
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
`

const UserIcon = styled.div`
  width: 40px;
  margin-bottom: 1rem;
`

class Login extends Component {

  state = {
    username: '',
    password: '',
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

  render() {
    return (
      <Main>
        {
          this.state.loading ?
          <Spinner name="cube-grid" color={blue} fadeIn='0'/>
          :
          <>
          <UserIcon>
            <UserSVG/>
          </UserIcon>
          <Input
          type="text"
          placeholder='Username'
          onChange={this.handleUser}
          value={this.state.username}
          />
          <Input
          type="password"
          placeholder='Password'
          onChange={this.handlePwd}
          value={this.state.password}
          />
          <StyledButton to='/' onClick={this.handleLogin}>Login</StyledButton>
          </>
        }
      </Main>
    );
  }
}

export default Login;