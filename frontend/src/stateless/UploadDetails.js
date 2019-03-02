import React from 'react';
import styled from 'styled-components';
//
import { StyledButton } from '../statefull/LoginAndRegister';
import { Textarea } from '../statefull/Upload';
import { Input, Label, InputWrapper } from '../utils/customStyledComponents';


const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const UploadDetails = ({
  handleSave,
  handleImageText,
  defaultTitle,
  defaultDescription,
  defaultCategory,
  handleDeleteConfirm,
  handleCancel,
  darkBackground }) => {

  return (
    <Form onSubmit={handleSave}>
      <InputWrapper>
        <Label darkBackground={darkBackground} htmlFor="title">Image Title</Label>
        <Input
          white
          id="title"
          type="text"
          name="title"
          placeholder='Title'
          defaultValue={defaultTitle}
          onChange={handleImageText}
        />
      </InputWrapper>
      <InputWrapper>
        <Label darkBackground={darkBackground} htmlFor="description">Image description</Label>
        <Textarea
          white
          id="description"
          name="description"
          placeholder='Description'
          defaultValue={defaultDescription}
          onChange={handleImageText}
        />
      </InputWrapper>
      <InputWrapper>
        <Label darkBackground={darkBackground} htmlFor="category">Category</Label>
        <Input
          white
          id="category"
          type="text"
          name="category"
          placeholder='Category'
          defaultValue={defaultCategory}
          onChange={handleImageText}
        />
      </InputWrapper>
      <div>
        <StyledButton white onClick={handleSave}>Save</StyledButton>
        {
          handleDeleteConfirm &&
          <>
            <StyledButton white onClick={handleCancel}>Cancel</StyledButton>
            <StyledButton white danger onClick={handleDeleteConfirm}>Delete</StyledButton>
          </>
        }
      </div>
    </Form>
  )
}

export default UploadDetails;