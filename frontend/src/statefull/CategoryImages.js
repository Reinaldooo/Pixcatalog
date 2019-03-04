import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit';
import axios from 'axios';
//
import { blue, white, black } from '../utils/colors';

export const Main = styled.div`
  width: 80%;
  box-sizing: border-box;
  min-height: 200px;
  margin: 2rem auto 10rem;
  text-align: center;
  img {
    width: 18.9%;
    margin: .5rem;
    border-radius: .2rem;
    transition: opacity .3s;    
    &:hover {
      opacity: .7;
    }
    @media (max-width: 1100px) {
      width: 30%
    }
    @media (max-width: 500px) {
      width: 45%
    }
  }
  div {
    width: 50%;
    margin: 1rem auto;
  }
  @media (max-width: 1100px) {
      width: 90%
  }
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${black};
  display: inline;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${white};
  margin: .2rem .3rem;
`

export const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: ${white};
  span {
    color: ${blue}
  }
`

const StyledImg = styled.img`
  border: ${props => props.user ? `3px solid ${blue};` : 'none'};
`

const CategoryImages = (props) => {

  const [state, setState] = useState({ images: null, categoryTitle: null })

  const isOwner = (img_owner) => (
    img_owner === props.user.user_id
  )

  useEffect(() => {
    axios(`/api/get_category_details/${props.match.params.category}`)
      .then(({ data }) => {
        setState({
          images: data.images,
          categoryTitle: data.category.title
        })
      })
  }, [])

  return (
    <Main>
      {
        state.images ?
          <>
            <H2>All <span>{`#${state.categoryTitle}`}</span> images</H2>
            <div>
              <StyledLink to='/categories'>Categories</StyledLink>
              <StyledLink to='/'>Home</StyledLink>
            </div>
            {
              state.images.map(image => (
                <Link
                  key={image.id}
                  to={{
                    pathname: `/images/${image.address}`,
                    image: image
                  }}
                >
                  <StyledImg user={isOwner(image.user_id)} src={`/api/get_image_thumb/${image.address}`} alt={`category`} />
                </Link>
              ))
            }
          </>
          :
          <Spinner name="cube-grid" color={blue} fadeIn='half' />
      }
    </Main>
  );
}

export default CategoryImages;