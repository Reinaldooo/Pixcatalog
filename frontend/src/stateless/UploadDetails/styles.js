import styled from 'styled-components';
//
import { white, blue } from '../../utils/colors';

export const Textarea = styled.textarea`
display: block;
height: 6rem;
width: 100%;
margin-top: .5rem;
border: 2px solid ${blue};
/* show real white */
background-color: ${props => props.white ? '#f1f0ef' : white};
border-radius: 5px;
padding: 15px;
box-shadow: 0 0 10px rgba(0,0,0,.1);
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`