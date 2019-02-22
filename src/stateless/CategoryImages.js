import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
//
import { blue, white, black } from '../utils/colors';

function importAllImages(r) {
  let images = {};
  r.keys().map((item) => images[item.replace('./', '')] = r(item));
  return images;
}
const images = importAllImages(require.context('../images', false, /\.(jpe?g)$/));
const helperArray = [1, 1, 1, 1, 1, 1, 1, 1, 1]

const Main = styled.div`
  width: 80%;
  min-height: 200px;
  margin: 0 auto 10rem;
  text-align: center;
  img {
    width: 18.9%;
    margin: .5rem;
    border-radius: .2rem;
    transition: transform .3s;
    &:hover {
      transform: scale(1.05)
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
          <Link
            to={{
              pathname: "/images/id",
              state: { fromCategories: true }
            }}>
            <img src={images[`${index + 1}.jpg`]} alt="" />
          </Link>
        ))
      }
      {
        helperArray.map((i, index) => (
          <Link key={index} to="/images/id"><img src={images[`${index + 1}.jpg`]} alt="" /></Link>
        ))
      }
    </Main>
  );
}

export default CategoryImages;