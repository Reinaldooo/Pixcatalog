import styled, { keyframes } from 'styled-components';
import { white, red, green } from './colors';

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