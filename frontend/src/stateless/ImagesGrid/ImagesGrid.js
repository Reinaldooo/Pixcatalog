import React from 'react';
import { Main, GridContainer } from './styles';
const helperArray = [ 1,1,1,1,1,1,1,1,1 ]

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