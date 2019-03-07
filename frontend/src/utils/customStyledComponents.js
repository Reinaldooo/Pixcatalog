import styled, { keyframes } from 'styled-components';
import { white, red, green, blue, black } from './colors';
import { Link } from 'react-router-dom';

export const buble = keyframes`
0% {
  transform: scale(1);
}
50% {
  transform: scale(.95);
}
100% {
  transform: scale(1);
}
`;

export const UserIcon = styled.div`
  width: 40px;
  margin-bottom: 1rem;
`

export const ErrorFlash = styled.span`
  padding: 1rem 0;
  width: 50%;
  background-color: ${red};
  color: ${white};
  position: absolute;
  border-radius: 5px;
  font-size: 1.1rem;
  top: 5%;
  left: 25%;
  animation: ${buble} 1s linear infinite;
  z-index: 10;
  @media (max-width: 500px) {
    width: 80%;
    left: 10%;
  }
`

export const SuccessFlash = styled.span`
  padding: 1rem 0;
  width: 50%;
  background-color: ${green};
  color: ${white};
  position: absolute;
  border-radius: 5px;
  font-size: 1.1rem;
  top: ${props => props.upper ? '-10%' : '0%'};
  left: 25%;
  animation: ${buble} 1s linear infinite;
  z-index: 10;
  @media (max-width: 500px) {
    width: 80%;
    left: 10%;
    top: ${props => props.upper ? '-30%' : '0%'};
  }
`

export const Input = styled.input`
  display: block;
  height: 2.2rem;
  width: 100%;
  margin: .5rem auto 0;
  border: ${props => props.danger === 'yes' ? `2px solid ${red}` : `2px solid ${blue}`};
  /* show real white */
  background-color: ${props => props.white ? '#f1f0ef' : white};
  outline-color: ${props => props.danger === 'yes' ? red : blue};
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
`

export const InputWrapper = styled.div`
  width: 60%;
  position: relative;
  @media (max-width: 500px) {
    width: 100%;
  }
`

export const Label = styled.label`
  font-size: .8rem;
  margin-bottom: 1rem;
  color: ${props => {
    if (props.danger === 'yes') { return red }
    if (props.darkBackground) { return white }
    return black
  }};
`

export const BackLink = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 0;
  text-decoration: none;
  background-color: ${blue};
  padding: 5px 10px 10px;
  border-top-left-radius: .9rem;
  border-bottom-right-radius: .9rem;
  color: ${white};
  font-weight: 600;
`

export const Details = styled.div`
  text-align: center;
  position: relative;
  color: ${white};
  padding: 2rem;
  min-height: 40vh;
  flex: 1;
  max-width: 100vw;

  p {
    width: 80%;
    word-wrap: break-word;
    margin: 1rem auto;
  }

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

export const OtherImages = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  p {
    margin: 5rem auto 0;
    @media (max-width: 600px) {
      margin: 5rem auto 1rem;
    }
  }
  div {
    display: flex;
    align-items: center;
    margin: 0 auto;
    @media (max-width: 600px) {
      display: block;
    }
  }
  @media (max-width: 1100px) {
      width: 100%;
  }
  @media (max-width: 600px) {
      width: 80vw;
  }
`