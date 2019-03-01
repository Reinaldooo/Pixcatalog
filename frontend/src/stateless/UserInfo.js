import React from 'react';
import styled from 'styled-components';
import { white, blue, red, black } from '../utils/colors';

export const Input = styled.input`
  display: block;
  height: 2.2rem;
  width: 100%;
  margin: .5rem auto 0;
  border: ${props => props.danger === 'yes' ? `2px solid ${red}` : `2px solid ${blue}`};
  /* show real white */
  background-color: ${props => props.white ? '#f1f0ef' : white};
  outline-color: ${props => props.danger === 'yes' ? red : blue};
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
`

const InputWrapper = styled.div`
  width: 60%;
  position: relative;
`

const Label = styled.label`
  font-size: .8rem;
  margin-bottom: 1rem;
  color: ${props => props.danger === 'yes' ? red : black};
`

const UserInfo = ({
  usernameUsed,
  emailUsed,
  username,
  password,
  passwordConfirm,
  email,
  checkEmail,
  checkUser,
  handleTextInput,
  register }) => {
  return (
    <>
      <InputWrapper>
        <Label danger={usernameUsed} htmlFor="username">{usernameUsed === 'yes' ? "Username already used!" : "Username"}</Label>
        <Input
          id="username"
          placeholder="Username"
          name="username"
          value={username}
          danger={usernameUsed}
          onChange={checkUser}
        />
      </InputWrapper>
      {
        register &&
        <InputWrapper>
          <Label danger={emailUsed} htmlFor="email">{emailUsed === 'yes' ? "Email already used!" : "Email"}</Label>
          <Input
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            danger={emailUsed}
            onChange={checkEmail}
          />
        </InputWrapper>
      }
      <InputWrapper>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder='Password'
          value={password}
          onChange={handleTextInput}
        />
      </InputWrapper>
      {
        register &&
        <InputWrapper>
          <Label htmlFor="passwordConfirm">Password Confirm</Label>
          <Input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            placeholder='Confirm Password'
            value={passwordConfirm}
            onChange={handleTextInput}
          />
        </InputWrapper>
      }
    </>
  );
}

export default UserInfo;