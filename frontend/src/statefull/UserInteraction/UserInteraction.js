import React, { useState, useEffect } from 'react';
import Spinner from 'react-spinkit';
import axios from 'axios';
//
import { blue } from '../../utils/colors';
import { Main, Header, Category, Categories, StyledButton, StyledLink } from './styles';



const UserInteraction = (props) => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios('/api/top_categories')
      .then(({ data }) => { setCategories(data) })
  }, [])

    return (
      <Main>
        <Header><span>PixCatalog</span> is a category-based photos site.</Header>
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