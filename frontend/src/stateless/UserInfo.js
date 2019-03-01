import React from 'react';
import { Input, InputWrapper, Label } from '../utils/customStyledComponents';


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