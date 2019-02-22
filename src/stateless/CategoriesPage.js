import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
//
import { blue, white, black } from '../utils/colors';

const Main = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  padding: 5rem;
`

const StyledLink = styled(Link)`
  width: 15%;
  text-decoration: none;
  margin: 0 1rem;
`

const StyledButton = styled(Link)`
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
  margin: 0 1rem;
  margin-top: 3rem;
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

const CategoriesPage = (props) => {
  return (
    <>
      <StyledButton to='/'>Home</StyledButton>
    <Main>
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
    </Main>
    </>
  );
}

export default CategoriesPage;