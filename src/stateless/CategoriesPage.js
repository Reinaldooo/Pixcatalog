import React from 'react';
import styled from 'styled-components';
import { blue, white } from '../utils/colors';

const Main = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`

const Category = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  width: 20%;
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

const CategoriesPage = (props) => {
  return (
    <Main>
      <Category>
        <h3>#Category</h3>
        <p>5 images</p>
      </Category>
      <Category>
        <h3>#Category</h3>
        <p>5 images</p>
      </Category>
      <Category>
        <h3>#Category</h3>
        <p>5 images</p>
      </Category>
      <Category>
        <h3>#Category</h3>
        <p>5 images</p>
      </Category>
      <Category>
        <h3>#Category</h3>
        <p>5 images</p>
      </Category>
      <Category>
        <h3>#Category</h3>
        <p>5 images</p>
      </Category>
      <Category>
        <h3>#Category</h3>
        <p>5 images</p>
      </Category>
      <Category>
        <h3>#Category</h3>
        <p>5 images</p>
      </Category>
      <Category>
        <h3>#Category</h3>
        <p>5 images</p>
      </Category>
      <Category>
        <h3>#Category</h3>
        <p>5 images</p>
      </Category>
    </Main>
  );
}

export default CategoriesPage;