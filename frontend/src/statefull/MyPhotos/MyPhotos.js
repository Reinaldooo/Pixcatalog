import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-spinkit';
//
import { Main, StyledLink } from './styles';
import { white } from '../../utils/colors';
import Condition from '../../stateless/Condition/Condition';

const MyPhotos = (props) => {

  const [images, setImages] = useState(null)

  const getImages = async () => {
    let localUser = sessionStorage.getItem('user')
    let userId
    if (localUser) {
      userId = JSON.parse(localUser).user_id
    } else {
      userId = await axios('/api/check_credentials')
        .then(({ data }) => data.user_id)
    }
    axios(`/api/get_user_images/${userId}`)
      .then(({ data: { images, user } }) => {
        setImages(images)
      })
  }

  useEffect(() => {
      getImages()
  }, [])

  return (
    <Main>
      <div>
        <StyledLink to='/'>Home</StyledLink>
        <Condition test={images && images.length === 0}>
          <h3 style={{ color: `${white}` }}>You don't have any photos yet.</h3>
        </Condition>
      </div>
      {
        images ?
         images.map((image, index) => (
          <Link
            key={image.id}
            to={{
              pathname: `/images/${image.address}`,
              image: image
            }}
          >
            <img src={`/api/get_image_thumb/${image.address}`} alt={`category`} />
          </Link>
        ))
        :
        <Spinner name="cube-grid" color='#00aedf' fadeIn='half' />
      }
    </Main>
  );
}

export default MyPhotos;