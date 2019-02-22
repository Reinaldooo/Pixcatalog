import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
//
import logo from '../images/logo.svg';
import { white, black } from '../utils/colors';
import { UserSVG } from '../utils/helper';


const Logo = styled.img`
  height: 100%;
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

  p {
    color: ${white};
    font-weight: 600;
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

const NavBar = (props) => {
  return ( 
    <Nav>
      <Link className="logo-link" to="/"><Logo src={logo} alt="logo"/></Link>
      <UserLinks>
        <p className="welcome">Reinaldooo</p>
        <UserSVG/>
        <Li>My Photos</Li>
        <Li>Register</Li>
        <Li>Login</Li>
        <Li>Logout</Li>
      </UserLinks>
    </Nav>
   );
}
 
export default NavBar;