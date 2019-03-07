import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
//
import logo from '../images/logo.svg';
import { white, black, red } from '../utils/colors';
import { MenuSVG } from '../utils/helper';
import Condition from '../stateless/Condition';


const Logo = styled.img`
  height: 100%;
`

const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 6rem;
  padding: 1.5rem 5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  background-color: ${black};

  @media (max-width: 1400px) {
    margin-bottom: 0;
  }
  @media (max-width: 1000px) and (orientation: landscape) {
    margin-bottom: 15rem;
  }
  @media (max-width: 500px) {
    padding: 1.5rem 2rem;
  }

  svg {
    width: 23px;
    height: 23px;
  }

  svg.menu {
    width: 25px;
    height: 25px;
    @media (min-width: 500px) {
    display: none;
    }
    transition: transform .4s;
    transform: ${props => props.rotate === "true" ? 'rotate(90deg)' : 'none'}
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
    @media (max-width: 900px) {
      display: none;
    }
  }

  img {
    height: 65%;
    margin-left: .6rem;
    border-radius: 50%;
    @media (max-width: 900px) {
      display: none;
    }  
  }

  @media (max-width: 500px) {
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
  margin-left: ${props => props.nomarginleft === 'yes' ? 0 : "1rem"};
  cursor: pointer;
`
const MobileMenu = styled.div`
  position: absolute;
  top: 6rem;
  left: 0;
  z-index: 3;
  background-color: ${black};
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: 0 20px 35px rgba(0,0,0,.4);
`

const NavBar = (props) => {
  const [logOutText, setLogOutText] = useState('Logout')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [rotate, setRotate] = useState("false")

  const closeMenu = () => {
    setRotate("false")
    setMobileMenu(false)
  }
  
  const LoginRegisterButtons = () => (
    <>
      <StyledLink
      onClick={closeMenu}
      nomarginleft="yes"
      to={{ pathname: "/login", state: { from: window.location.pathname } }}
      >
        Login
      </StyledLink>
      <StyledLink onClick={closeMenu} to="/register">Register</StyledLink>
    </>
  )

  const UserButtons = (props) => (
    <>
      <Condition test={!props.mobile}>
        <p className="welcome">{username}</p>
        <img src={picture} alt="user-avatar"/>
      </Condition>
      <StyledLink nomarginleft={props.mobile} onClick={closeMenu} to="/myphotos">My Photos</StyledLink>
      <StyledLink onClick={closeMenu} to="/upload">Upload</StyledLink>
      <StyledButton onClick={handleLogOut}>{logOutText}</StyledButton>
    </>
  )

  const handleLogOut = () => {
    setLogOutText('...')
    setRotate("false")
    setMobileMenu(false)
    props.logOutUser()
  }

  const handleClick = () => {
    setMobileMenu(!mobileMenu)
    rotate === "false" ? setRotate("true") : setRotate("false")
  }

  useEffect(() => {
    setLogOutText('Logout')
  }, [props.user])

  let { username, picture } = props.user;

  return (
    <Nav rotate={rotate}>
      <Link className="logo-link" to="/"><Logo src={logo} alt="logo" /></Link>
      <MenuSVG handleClick={handleClick} />
      <Condition test={mobileMenu}>
      <MobileMenu>
        {
          username ?
            <UserButtons mobile="yes" />
            :
            <LoginRegisterButtons />
        }
      </MobileMenu>
      </Condition>
      <UserLinks>
        {
          username ?
            <UserButtons />
            :
            <LoginRegisterButtons />
        }
      </UserLinks>
    </Nav>
  );
}

export default NavBar;