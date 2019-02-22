import React from 'react';
import styled from 'styled-components'
// import { blue } from '../utils/colors';

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
  padding-left: 3rem;
`

const GridContainer = styled.div`
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 2rem;
  overflow: hidden;

  img {
    width: 31.3333%;
    margin: 1%;
    &:first-of-type, &:last-of-type {
      visibility: hidden;
    }
  }
`

const ImagesGrid = (props) => {
  return ( 
    <Main>
      <GridContainer>
        {
          helperArray.map((i, index) => (
            <img key={index} src={images[`${index+1}.jpg`]} alt=""/>
          ))
        }
      </GridContainer>
    </Main>
   );
}
 
export default ImagesGrid;