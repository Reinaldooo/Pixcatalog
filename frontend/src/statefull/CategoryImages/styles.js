import styled from 'styled-components';
//
import { blue, white } from '../../utils/colors';

export const Main = styled.div`
  width: 80%;
  box-sizing: border-box;
  min-height: 200px;
  margin: 2rem auto 10rem;
  text-align: center;
  img {
    width: 18.9%;
    margin: .5rem;
    border-radius: .2rem;
    transition: opacity .3s;    
    &:hover {
      opacity: .7;
    }
    @media (max-width: 1100px) {
      width: 30%
    }
    @media (max-width: 500px) {
      width: 45%
    }
  }
  div {
    width: 50%;
    margin: 1rem auto;
  }
  @media (max-width: 1100px) {
      width: 90%
  }
`

export const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: ${white};
  span {
    color: ${blue}
  }
`

export const StyledImg = styled.img`
  border: ${props => props.user ? `3px solid ${blue};` : 'none'};
`