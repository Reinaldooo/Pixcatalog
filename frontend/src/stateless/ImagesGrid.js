import React from 'react';
import styled from 'styled-components'
// import { blue } from '../utils/colors';
const helperArray = [ 1,1,1,1,1,1,1,1,1 ]
//TODO Transform this into a recursive function

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
  border-radius: 3rem;
  overflow: hidden;

  img {
    width: 31.3333%;
    margin: 1%;
    &:first-of-type, &:last-of-type {
      visibility: hidden;
    }
  }
`

let last = null;
const randomImage = () => {
  let actual = Math.round(Math.random() * 47);

  while(actual === last) {
    actual = Math.round(Math.random() * 47);
  }
  last = actual
  return actual
}

const ImagesGrid = (props) => {
  return ( 
    <Main>
      <GridContainer>
        {
          helperArray.map((i, index) => (
            <img key={index} src={[`/api/get_image/img${randomImage()}`]} alt={`main-${index+1}`}/>
          ))
        }
      </GridContainer>
    </Main>
   );
}
 
export default ImagesGrid;