import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
// //
import { white, black, blue } from '../utils/colors';
import { UserSVG } from '../utils/helper';
import img from '../images/2.jpg'

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
    transition: transform .3s;
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
  background-image: linear-gradient(to right, ${blue}, transparent);
  padding: 5px 100px 5px 10px;
  border-top-left-radius: .9rem;
  color: ${white};
  font-weight: 600;
`

const ImageDetail = (props) => {
  return (
    <Main>
      <BackLink to='/categories/example'>Back to category</BackLink>
      <img src={img} alt=""/>
      <Details>
        {console.log(props.location)}
        <h1>Image Title</h1>
        <span className="creator"><UserSVG/> Reinaldooo</span>
        <span> #example</span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda rem quam voluptates rerum accusantium labore necessitatibus magnam delectus, atque fuga nam amet consequatur quos. Blanditiis laboriosam quam asperiores nemo iure.</p>
        <StyledButton to='/'>Home</StyledButton>
        <StyledButton to='/'>Edit</StyledButton>
        <StyledButton to='/'>Delete</StyledButton>
      </Details>
    </Main>
  );
}

export default ImageDetail;