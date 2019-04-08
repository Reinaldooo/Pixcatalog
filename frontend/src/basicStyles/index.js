import styled from 'styled-components'
import { white, black, red, blue } from '../utils/colors'
import { Link } from 'react-router-dom';

export const MainWhiteBox = styled.div`
  position: relative;
  /* show real white */
  background-color: ${props => props.white ? '#f1f0ef' : white};
  box-shadow: 5px 10px 25px rgba(0,0,0,.3);
  width: 40vw;
  max-width: 500px;
  border-radius: 1rem;
  min-height: 50vh;
  /* height should be higher on upload page */
  max-height: ${props => props.upload ? '90%' : '500px'};
  margin: 2rem auto;
  padding: 1rem 2rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 1100px) {
    width: 70%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }

  div.buttons {
    margin-top: 1rem;
  }

  p {
    color: ${black};
    font-size: .8rem;
    margin-bottom: 0;
    margin-top: 1.5rem;

    &.register-user {
      margin: 1rem auto 2rem;
    }
  }
`
export const StyledButtonWhite = styled.button`
  margin-top: 1.4rem;
  text-decoration: none;
  color: ${props => props.danger ? red : blue};
  display: inline-block;
  font-weight: 400;
  border-radius: 5px;
  padding: 5px 14px;
  /* show real white */
  background-color: ${props => props.white ? '#f1f0ef' : white};
  border: none;
  box-shadow: ${props => props.google ? 'none;' : '0 0 15px rgba(0,0,0,.2);'};
  margin: 1rem .2rem;
  text-align: center;
  font-size: .9em;
  cursor: pointer;

  img {
    height: 40px;
  }
`

export const StyledButtonBlue = styled.li`
color: ${white};
display: inline-block;
list-style: none;
font-weight: 600;
border-radius: 5px;
padding: 5px 10px;
background-color: ${props => props.danger ? red : blue};
margin-left: 1rem;
cursor: pointer;
`

export const StyledLinkBlue = styled(Link)`
color: ${white};
text-decoration: none;
font-weight: 600;
border-radius: 5px;
padding: 5px 10px;
background-color: ${blue};
margin-left: ${props => props.nomarginleft === 'yes' ? 0 : "1rem"};
cursor: pointer;
`