import styled from 'styled-components';
//
import { white, black } from '../../utils/colors';

export const Logo = styled.img`
height: 100%;
`

export const Nav = styled.div`
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

export const UserLinks = styled.div`
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
export const MobileMenu = styled.div`
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
