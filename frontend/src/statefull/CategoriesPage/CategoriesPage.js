import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-spinkit';
//
import { blue } from '../../utils/colors';
import { Main, CategoriesMain, StyledLink, Category } from './styles'
import { StyledLinkBlue } from '../../basicStyles/index';

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
      <StyledLinkBlue to='/'>Home</StyledLinkBlue>
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