import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
// //
import { white, black, blue } from '../utils/colors';
import { UserSVG } from '../utils/helper';

const Main = styled.div`
  position: relative;
  width: 80%;
  margin: 1rem auto 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 50%;
    border-radius: .9rem;
    flex: 1;
  }
`

const Details = styled.div`
  text-align: center;
  color: ${white};
  padding: 2rem;
  flex: 1;

  h1 {
    margin-bottom: 0;
  }

  span.creator {
    color: ${blue};
    display: block;
  }

  svg {
    height: .7rem;
  }
`

const StyledButton = styled(Link)`
  text-decoration: none;
  color: ${black};
  display: inline-block;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${white};
  margin: .5rem .2rem;
  text-align: center;
`

const BackLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  text-decoration: none;
  background-color: ${blue};
  padding: 5px 10px 10px;
  border-top-left-radius: .9rem;
  border-bottom-right-radius: .9rem;
  color: ${white};
  font-weight: 600;
`

class ImageDetail extends Component {

  state = {
    image: null
  }

  componentDidMount() {
    fetch(`/api/get_image_details/${this.props.match.params.image}`)
      .then(res => res.json())
      .then(res => { console.log(res.image); this.setState({ image: res.image }) })
  }

  render() {
    const image = this.state.image
    return (
      <Main>
        {
          image &&
          <>
            <BackLink to={`/categories/${image.category_id}`}>Back to category</BackLink>
            <img src={`/api/get_image/${image.address}`} alt={image.title}/>
            <Details>
              <h1>{image.title}</h1>
              <span className="creator"><UserSVG />{` ${image.username}`}</span>
              <span>{`#${image.category_name}`}</span>
              <p>{image.description}</p>
              <StyledButton to='/'>Home</StyledButton>
              <StyledButton to='/'>Edit</StyledButton>
              <StyledButton to='/'>Delete</StyledButton>
            </Details>
          </>
        }
      </Main>
    )
  }
}

export default ImageDetail;