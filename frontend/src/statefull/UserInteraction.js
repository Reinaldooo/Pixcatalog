import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit';
import axios from 'axios';
//
import { blue, white, black } from '../utils/colors';

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

  @media (max-width: 700px) {
      padding: 3rem 0;
      width: 85%;
      margin: 0 auto;
  }
`

const Header = styled.h3`
  color: ${white};
  font-weight: 400;
  font-size: 2rem;
  margin: 0;

  @media (max-width: 700px) {
    font-size: 1.7rem;
  }

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
  @media (max-width: 700px) {
    width: 100%;
  }
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
  p {
    margin: 0;
    font-size: 1rem;
  }
`

const StyledLink = styled(Link)`
  width: 25%;
  text-decoration: none;
  margin: 0 1rem;
  margin-top: 3rem;

  h3 {
  @media (max-width: 700px) {
    font-size: 1.2rem;
  }
  }

  &:hover {
    transform: translate(1px, 2px);
  }
  @media (max-width: 1400px) {
    width: 35%;
  }
  @media (max-width: 700px) {
    margin: 0 .5rem;
    margin-top: 3rem;
    width: 40%;
  }
  
`

const StyledButton = styled(Link)`
  width: 25%;
  text-transform: uppercase;
  text-decoration: none;
  color: ${black};
  display: inline-block;
  font-weight: 400;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${white};
  margin: .5rem .2rem;
  margin-top: 3rem;
  text-align: center;
  @media (max-width: 700px) {
    width: 60%;
    margin-bottom: 2rem;
  }
`


const UserInteraction = (props) => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios('/api/top_categories')
      .then(({ data }) => { setCategories(data) })
  }, [])

    return (
      <Main>
        <Header><span>PixCatalog</span> is a category based image upload website.</Header>
        <p>Choose from our top categories, or login and create one.</p>
        <Categories>
          { 
            categories.length > 0 ?
            <>
              {
                categories.map((c) => (
                  <StyledLink key={c[1]} to={`/categories/${c[1]}`}>
                    <Category>
                      <h3>{`#${c[1].substring(0,10)}`}</h3>
                      <p>{`${c[0]} images`}</p>
                    </Category>
                  </StyledLink>
                ))
              }
              <StyledButton key="#all" to="/categories/">
                All categories
              </StyledButton>
            </>
            :
            <Spinner name="ball-grid-pulse" color={blue} fadeIn='half' />
          }
        </Categories>
      </Main>
    )
}

export default UserInteraction;