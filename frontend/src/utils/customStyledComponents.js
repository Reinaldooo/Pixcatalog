import styled, { keyframes } from 'styled-components';
import { white, red, green, blue, black } from './colors';

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
  z-index: 1;
`

export const SuccessFlash = styled.span`
  padding: 1rem 0;
  width: 50%;
  background-color: ${green};
  color: ${white};
  position: absolute;
  border-radius: 5px;
  font-size: 1.1rem;
  top: 5%;
  left: 25%;
  animation: ${buble} 1s linear infinite;
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
`

export const Label = styled.label`
  font-size: .8rem;
  margin-bottom: 1rem;
  color: ${props => props.danger === 'yes' ? red : black};
`