import React from 'react';
import styled from 'styled-components'
// import { blue } from '../utils/colors';
const helperArray = [ 1,1,1,1,1,1,1,1,1 ]
//TODO Transform this into a recursive function

const Main = styled.div`
  height: calc(100vh - 8rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 3rem;
  @media (max-width: 1000px) and (orientation: landscape) {
    padding: 3rem 0;
    margin-bottom: 15rem;
  }
  @media (max-width: 900px) {
    padding: 3rem 0;
  }
`

const GridContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;

  img {
    width: 31.3333%;
    margin: 1%;
    &:first-of-type, &:last-of-type {
      visibility: hidden;
    }
    &:nth-of-type(3) {
      border-top-right-radius: 2rem;
    }
    &:nth-of-type(7) {
      border-bottom-left-radius: 2rem;
    }
  }
  @media (max-width: 500px) {
    width: 75%;
    border-radius: 2rem;
  }
`

const ImagesGrid = (props) => {
  return ( 
    <Main>
      <GridContainer>
        {
          helperArray.map((i, index) => (
            <img key={index} src={[`/api/get_image_thumb/img${index}`]} alt={`main-${index+1}`}/>
          ))
        }
      </GridContainer>
    </Main>
   );
}
 
export default ImagesGrid;