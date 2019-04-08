import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit';
import axios from 'axios';
//
import { blue } from '../../utils/colors';
import { Main, H2, StyledImg } from './styles';
import { StyledLinkBlue } from '../../basicStyles/index';


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
              <StyledLinkBlue to='/categories'>Categories</StyledLinkBlue>
              <StyledLinkBlue to='/'>Home</StyledLinkBlue>
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