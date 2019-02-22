import React from 'react';
import styled from 'styled-components';
import { blue, white } from '../utils/colors';

const Main = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 3rem;

  p {
    color: ${white};
    font-size: 1.2rem;
  }
`

const Header = styled.h3`
  color: ${white};
  font-weight: 400;
  font-size: 2.2rem;
  margin: 0;

  span {
    color: ${blue};
  }
`

const Categories = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  button {
    width: 25%;
    border: none;
    color: ${white};
    height: 5rem;
    margin: 0 1rem;
    margin-top: 3rem;
    border-radius: .5rem;
    background-color: ${blue};
    font-size: 1.6rem;
  }
`

const UserInteraction = (props) => {
  return ( 
    <Main>
      <Header><span>PixCatalog</span> is a category based image upload site.</Header>
      <p>You can choose one of the top categories, or all images.</p>
      <Categories>
        <button>#category</button>
        <button>#category</button>
        <button>#category</button>
        <button>#category</button>
        <button>#category</button>
        <button>#category</button>
      </Categories>
    </Main>
   )
}
 
export default UserInteraction;