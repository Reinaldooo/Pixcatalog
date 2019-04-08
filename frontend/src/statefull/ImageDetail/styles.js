import styled from 'styled-components';

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
    box-shadow: 10px 15px 30px rgba(0,0,0,.25);
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