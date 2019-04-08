import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
//
import logo from '../../images/logo.svg';
import { MenuSVG } from '../../utils/helper';
import { Logo, Nav, MobileMenu, UserLinks } from './styles';
import { StyledButtonBlue, StyledLinkBlue, } from '../../basicStyles/index';
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
      <StyledLinkBlue
      onClick={closeMenu}
      nomarginleft="yes"
      to={{ pathname: "/login", state: { from: window.location.pathname } }}
      >
        Login
      </StyledLinkBlue>
      <StyledLinkBlue onClick={closeMenu} to="/register">Register</StyledLinkBlue>
    </>
  )

  const UserButtons = (props) => (
    <>
      <Condition test={!props.mobile}>
        <p className="welcome">{username}</p>
        <img src={picture} alt="user-avatar"/>
      </Condition>
      <StyledLinkBlue nomarginleft={props.mobile} onClick={closeMenu} to="/myphotos">My Photos</StyledLinkBlue>
      <StyledLinkBlue onClick={closeMenu} to="/upload">Upload</StyledLinkBlue>
      <StyledButtonBlue onClick={handleLogOut}>{logOutText}</StyledButtonBlue>
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