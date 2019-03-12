import styled from 'styled-components';
//
import { white, black } from '../../utils/colors';


export const Main = styled.div`
  position: relative;
  width: 80%;
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 45%;
    border-radius: .9rem;
    flex: 1;
    margin: 2rem 0;
    @media (max-width: 1100px) {
      width: 100%;
    }
  }
  img.thumb {
    width: 8rem;
    margin-right: .5rem;
    @media (max-width: 1500px) {
      width: 6rem;
    }
    @media (max-width: 600px) {
      width: 35%;
      margin: .25rem;
    }
  }
  @media (max-width: 1100px) {
      flex-direction: column;
  }
`

export const StyledButton = styled.button`
  text-decoration: none;
  color: ${black};
  display: inline-block;
  font-weight: 600;
  font-size: .9rem;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  background-color: ${white};
  margin: .5rem .2rem;
  text-align: center;
  cursor: pointer;
`