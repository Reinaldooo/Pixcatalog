import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
//
import { blue, white, black } from '../utils/colors';

const Main = styled.div`
  text-align: center;

  p {
    color: ${white};
  }
`

const CategoriesMain = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  padding: 5rem;
  padding-top: 2rem;
`

const StyledLink = styled(Link)`
  width: 15%;
  text-decoration: none;
  margin: 0 1rem;
`

const StyledButton = styled(Link)`
  text-decoration: none;
  color: ${black};
  display: block;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${white};
  margin: .2rem auto;
  width: 5rem;
  text-align: center;
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
  margin: 0 1rem;
  margin-top: 3rem;
  border-radius: .5rem;
  background-color: ${blue};
  cursor: pointer;
  h3 {
    margin: 0;
    font-size: 1.6rem;
  }
  p{
    margin: 0;
    font-size: .9rem;
  }
`

class CategoriesPage extends Component {

  state = {
    categories: null
  }

  componentDidMount() {
    fetch(`/api/categories`)
    .then(res => res.json())
    .then(res => { this.setState({ categories: res.categories }) })
  }

  render() {
    return (
      <Main>
        <StyledButton to='/'>Home</StyledButton>
        <p>You can create a new category while uploading an image.</p>
        <CategoriesMain>
          {
            this.state.categories &&
            this.state.categories.map(cat => (
              <StyledLink key={cat.id} to={`/categories/${cat.id}`}>
              <Category>
                <h3>{`#${cat.title}`}</h3>
                <p>5 images</p>
              </Category>
            </StyledLink>
            ))
          }

        </CategoriesMain>
      </Main>
    );
  }
}

export default CategoriesPage;