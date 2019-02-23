import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
//
import { blue, white, black } from '../utils/colors';

const helperArray = [1, 1, 1, 1, 1, 1, 1, 1, 1]
//TODO Transform this into a recursive function

const Main = styled.div`
  width: 80%;
  min-height: 200px;
  margin: 0 auto 10rem;
  text-align: center;
  img {
    width: 18.9%;
    margin: .5rem;
    border-radius: .2rem;
    transition: opacity .3s;
    &:hover {
      opacity: .7;
    }
  }
  div {
    width: 50%;
    margin: 1rem auto;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${black};
  display: inline;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${white};
  margin: .2rem .3rem;
`

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: ${white};
  span {
    color: ${blue}
  }
`

const CategoryImages = (props) => {
  const category = props.match.params.category

  return (
    <Main>
      <H2>All <span>{`#${category}`}</span> images</H2>
      <div>
        <StyledLink to='/categories'>Categories</StyledLink>
        <StyledLink to='/'>Home</StyledLink>
      </div>
      {
        helperArray.map((i, index) => (
          <Link key={index} to={`/images/${index + 1}`}><img src={`/get_image/${index + 1}`} alt={`category-${index + 1}`} /></Link>
        ))
      }
      {
        helperArray.map((i, index) => (
          <Link key={index} to={`/images/${index + 1}`}><img src={`/get_image/${index + 1}`} alt={`category-${index + 1}`} /></Link>
        ))
      }
    </Main>
  );
}

export default CategoryImages;