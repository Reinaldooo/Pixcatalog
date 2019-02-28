import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
//
import { Main, H2, StyledLink } from './CategoryImages'

const MyPhotos = (props) => {

  const [images, setImages] = useState(null)
  const [user, setUser] = useState(null)

  const getImages = async () => {
    let userId = await axios('/api/check_credentials')
      .then(({ data }) => data.user_id)

    axios(`/api/get_user_images/${userId}`)
      .then(({ data: { images, user } }) => {
        setImages(images)
        setUser(user)
      })
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <Main>
      {user && <H2>All images by: <span>{`#${user.name}`}</span></H2>}
      <div>
        <StyledLink to='/'>Home</StyledLink>
      </div>
      {
        images && images.map((image, index) => (
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
      }
    </Main>
  );
}

export default MyPhotos;