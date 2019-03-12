import styled from 'styled-components';
import { Link } from 'react-router-dom';
//
import { white, blue } from '../../utils/colors';


export const Main = styled.div`
  height: calc(100vh - 8rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 3rem;
  text-align: center;

  p {
    color: ${white};
    font-size: 1.2rem;
  }

  @media (max-width: 500px) {
      padding: 3rem 0;
      width: 85%;
      margin: 0 auto;
  }
  @media (max-width: 1100px) {
      margin: 4rem auto 0;
      padding: 0;
  }
`

export const Header = styled.h3`
  color: ${white};
  font-weight: 400;
  font-size: 2rem;
  margin: 0;

  @media (max-width: 1400px) {
    font-size: 1.6rem;
  }
  @media (max-width: 1000px) and (orientation: landscape) {
    font-size: 2.4rem;
  }
  @media (max-width: 900px) {
    font-size: 1.8rem;
  }
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }

  span {
    color: ${blue};
    font-weight: 600;
  }
`

export const Categories = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 1400px) {
    width: 100%;
  }
  @media (max-width: 1100px) {
    width: 85%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`

export const Category = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  width: 100%;
  border: none;
  color: ${white};
  height: 5rem;
  border-radius: .5rem;
  background-color: ${blue};
  box-shadow: 0 10px 15px rgba(0,0,0,0.2);
  cursor: pointer;
  h3 {
    margin: 0;
    /* font-size: 1.2rem; */
  }
  p {
    margin: 0;
    font-size: 1rem;
    color: ${white};
  }
  @media (max-width: 1400px) {
    height: 4rem;
  }
  @media (max-width: 1100px) {
    height: 6rem;
  }
`

export const StyledLink = styled(Link)`
  width: 25%;
  text-decoration: none;
  margin: 0 1rem;
  margin-top: 3rem;

  h3 {
    @media (max-width: 1100px) {
      font-size: 1.5rem;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  &:hover {
    opacity: .9;
  }
  @media (max-width: 1400px) {
    width: 20%;
  }
  @media (max-width: 1100px) {
    width: 25%;
  }
  @media (max-width: 500px) {
    margin: 0 .5rem;
    margin-top: 3rem;
    width: 40%;
  }
  
`

export const StyledButton = styled(Link)`
  width: 25%;
  text-transform: uppercase;
  text-decoration: none;
  color: ${blue};
  display: inline-block;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${white};
  margin: .5rem .2rem;
  margin-top: 3rem;
  text-align: center;
  @media (max-width: 500px) {
    width: 60%;
    margin-bottom: 2rem;
  }
`