import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Spinner from 'react-spinkit';
//
import { blue, white, black } from '../utils/colors';

const Main = styled.div`
  text-align: center;

  p {
    color: ${white};
  }
`

const CategoriesMain = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  padding: 5rem;
  padding-top: 2rem;
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

const CategoriesPage = () => {

  const [categories, setCategories] = useState(null)

  useEffect(() => {
    axios(`/api/categories`)
      .then(({ data }) => {
        data.categories.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        setCategories(data.categories)
      })
  }, [])

  return (
    <Main>
      <StyledButton to='/'>Home</StyledButton>
      <p>You can create a new category while uploading an image.</p>
      <CategoriesMain>
        {
          categories ?
          categories.map(cat => (
            <StyledLink key={cat.id} to={`/categories/${cat.title}`}>
              <Category>
                <h3>{`#${cat.title.substring(0,10)}`}</h3>
                <p>{`#${cat.images_total} images`}</p>
              </Category>
            </StyledLink>
          ))
          :
          <Spinner name="ball-grid-pulse" color={blue} fadeIn='half' />
        }

      </CategoriesMain>
    </Main>
  );
}

export default CategoriesPage;