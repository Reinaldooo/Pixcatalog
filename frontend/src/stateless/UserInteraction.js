import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
//
import { blue, white } from '../utils/colors';

const Main = styled.div`
  height: 100%;
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
`

const Header = styled.h3`
  color: ${white};
  font-weight: 400;
  font-size: 2.2rem;
  margin: 0;

  span {
    color: ${blue};
    font-weight: 600;
  }
`

const Categories = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const Category = styled.li`
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
  cursor: pointer;
  h3 {
    margin: 0;
    font-size: 1.6rem;
  }
  p{
    margin: 0;
    font-size: .9rem;
  }
`

const StyledLink = styled(Link)`
  width: 25%;
  text-decoration: none;
  margin: 0 1rem;
  margin-top: 3rem;
`


const UserInteraction = (props) => {
  return (
    <Main>
      <Header><span>PixCatalog</span> is a category based image upload website.</Header>
      <p>Choose from our top categories, or login and create one.</p>
      <Categories>
        <StyledLink to='/categories/example'>
          <Category>
            <h3>#example</h3>
            <p>5 images</p>
          </Category>
        </StyledLink>
        <StyledLink to='/categories/example2'>
          <Category>
            <h3>#example2</h3>
            <p>5 images</p>
          </Category>
        </StyledLink>
        <StyledLink to='/categories/example'>
          <Category>
            <h3>#example</h3>
            <p>5 images</p>
          </Category>
        </StyledLink>
        <StyledLink to='/categories/example'>
          <Category>
            <h3>#example</h3>
            <p>5 images</p>
          </Category>
        </StyledLink>
        <StyledLink to='/categories/example'>
          <Category>
            <h3>#example</h3>
            <p>5 images</p>
          </Category>
        </StyledLink>
        <StyledLink to='/categories'>
          <Category>
            <h3>#all</h3>
            <p>5 images</p>
          </Category>
        </StyledLink>
      </Categories>
    </Main>
  )
}

export default UserInteraction;