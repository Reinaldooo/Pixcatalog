
import styled from 'styled-components';
import { Link } from 'react-router-dom'
//
import { blue, white, black } from '../../utils/colors';

export const Main = styled.div`
  text-align: center;
  padding-bottom: 2rem;
  margin-top: 2rem;

  p {
    color: ${white};
  }
`

export const CategoriesMain = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  padding: 5rem;
  padding-top: 2rem;
  @media (max-width: 500px) {
    padding: 0;
  }
`

export const StyledLink = styled(Link)`
  width: 15%;
  text-decoration: none;
  margin: 0 1rem;

  @media (max-width: 1100px) {
    width: 40%;
  }
  @media (max-width: 500px) {
    width: 40%;
  }
`

export const StyledButton = styled(Link)`
  text-decoration: none;
  color: ${black};
  display: block;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${white};
  margin: .2rem auto;
  width: 5rem;
  text-align: center;
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
  margin-top: 3rem;
  border-radius: .5rem;
  background-color: ${blue};
  cursor: pointer;
  h3 {
    margin: 0;
    font-size: 1.6rem;
    @media(max-width: 500px) {
    font-size: 1.3rem;

    }
  }
  p{
    margin: 0;
    font-size: .9rem;
  }
`