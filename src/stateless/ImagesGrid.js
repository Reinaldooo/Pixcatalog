import React from 'react';
import styled from 'styled-components'
import { blue } from '../utils/colors';

function importAllImages(r) {
  let images = {};
  r.keys().map((item) => images[item.replace('./', '')] = r(item));
  return images;
}
const images = importAllImages(require.context('../images', false, /\.(jpe?g)$/));
const helperArray = [ 1,1,1,1,1,1,1,1,1 ]

const Main = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GridContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;

  img {
    width: 30%;
    &:first-of-type, &:last-of-type {
      visibility: hidden;
    }
  }
`

const ImagesGrid = (props) => {
  return ( 
    <Main>
      {console.log(images)}
      <GridContainer>
        {
          helperArray.map((i, index) => (
            <img src={images[`${index+1}.jpg`]} alt=""/>
          ))
        }
      </GridContainer>
    </Main>
   );
}
 
export default ImagesGrid;