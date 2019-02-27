import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//
import { Main, H2, StyledLink } from './CategoryImages'

class MyPhotos extends Component {

  state = {
    images: null,
    user: null
  }
  async componentDidMount() {    
    let userId = await fetch('/api/check_credentials')
    .then(res => res.json())
    .then(({user_id}) => user_id)

    fetch(`/api/get_user_images/${userId}`)
      .then(res => res.json())
      .then(({ images, user }) => {
        this.setState({
          images,
          user
        })
      })
  }

  render() {
    return (
      <Main>
        {this.state.user && <H2>All images by: <span>{`#${this.state.user.name}`}</span></H2>}
        <div>
          <StyledLink to='/'>Home</StyledLink>
        </div>
        {
          this.state.images && this.state.images.map((image, index) => (
            <Link
              key={image.id}
              to={{
                pathname: `/images/${image.address}`,
                image: image
              }}
            >
              <img src={`/api/get_image/${image.address}`} alt={`category`} />
            </Link>
          ))
        }
      </Main>
    );
  }
}

export default MyPhotos;