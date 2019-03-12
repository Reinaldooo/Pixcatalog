import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
//
import logo from '../../images/logo.svg';
import { MenuSVG } from '../../utils/helper';
import { Logo, Nav, MobileMenu, StyledButton, StyledLink, UserLinks } from './styles';
import Condition from '../../stateless/Condition/Condition';


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