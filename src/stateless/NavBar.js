import React from 'react';
import styled from 'styled-components'
import logo from '../images/logo.svg';
// import user from '../images/user.svg';
import { white, blue, black } from '../utils/colors';


const Logo = styled.img`
  height: 80%;
`

const Nav = styled.div`
  height: 100px;
  padding: 1.5rem 5rem;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  h3 {
    color: ${white};
    font-weight: 400;
  }

  svg {
    height: 30%;
    margin-left: .3rem;
  }
`

const Li = styled.li`
  color: ${black};
  list-style: none;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${white};
  margin-left: 1rem;
  cursor: pointer;
`

const UserSVG = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="user"
      className="svg-inline--fa fa-user fa-w-14"
      role="img" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512">
      <path
        fill={blue}
        d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
      </path>
    </svg>
  )
};

const NavBar = (props) => {
  return ( 
    <Nav>
      <Logo src={logo} alt="logo"/>
      <UserLinks>
        <h3 className="welcome">Reinaldooo</h3>
        <UserSVG/>
        <Li>My Photos</Li>
        <Li>Login</Li>
        <Li>Logout</Li>
      </UserLinks>
    </Nav>
   );
}
 
export default NavBar;