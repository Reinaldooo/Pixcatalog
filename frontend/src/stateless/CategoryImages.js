import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
//
import { blue, white, black } from '../utils/colors';


const Main = styled.div`
  width: 80%;
  min-height: 200px;
  margin: 0 auto 10rem;
  text-align: center;
  img {
    width: 18.9%;
    margin: .5rem;
    border-radius: .2rem;
    transition: opacity .3s;    
    &:hover {
      transform: translate(1px, 2px);
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

class CategoryImages extends Component{

  state= { 
    images: null,
    categoryTitle: null,
    totalImages: null
  }

  componentDidMount() {
    fetch(`/api/get_category_details/${this.props.match.params.category}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        images: res.images,
        categoryTitle: res.category.title,
        totalImages: res.images.length
      })
      console.log(this.state)
    })
  }
  
  render() {

  return (
    <Main>
      <H2>All <span>{`#${this.state.categoryTitle}`}</span> images</H2>      
      <div>
        <StyledLink to='/categories'>Categories</StyledLink>
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

export default CategoryImages;