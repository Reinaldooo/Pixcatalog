import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
//
import logo from '../images/logo.svg';
import { white, black, red } from '../utils/colors';
import { UserSVG, MenuSVG } from '../utils/helper';


const Logo = styled.img`
  height: 100%;
`

const Nav = styled.div`
  height: 100px;
  padding: 1.5rem 5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 764px) {
    padding: 1.5rem 2rem;
  }

  svg {
    width: 25px;
    height: 25px;
  }
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

  @media (max-width: 764px) {
      display: none;
  }
`

const StyledButton = styled.li`
  color: ${props => props.danger ? white : black};
  list-style: none;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${props => props.danger ? red : white};
  margin-left: 1rem;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  color: ${black};
  text-decoration: none;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${white};
  margin-left: 1rem;
  cursor: pointer;
`

const NavBar = (props) => {

  const [logOutText, setLogOutText] = useState('Logout')

  const handleLogOut = () => {
      setLogOutText('...')
      props.logOutUser()   
  }

  useEffect(() => {
    setLogOutText('Logout')
  }, [props.user])

  let { username } = props.user;

  return (
    <Nav>
      <Link className="logo-link" to="/"><Logo src={logo} alt="logo" /></Link>
      <MenuSVG/>
      <UserLinks>
        {
          username ?
            <>
              <p className="welcome">{username}</p>
              <UserSVG />
              <StyledLink to="/myphotos">My Photos</StyledLink>
              <StyledLink to="/upload">Upload</StyledLink>
              <StyledButton onClick={handleLogOut}>{logOutText}</StyledButton>
            </>
            :
            <>
              <StyledLink to={{ pathname: "/login", state: { from: window.location.pathname } }}>Login</StyledLink>
              <StyledLink to="/register">Register</StyledLink>
            </>
        }
      </UserLinks>
    </Nav>
  );
}

export default NavBar;